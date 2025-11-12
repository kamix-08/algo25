<script>
    import { onMount } from "svelte";

    let count = $state()
    let pokemon = $state()
    let names = $state()

    let cur = $state(1)
    let cor = $state(0)

    let selected = $state()
    let correct = $state()

    onMount(() => {
        fetch('https://pokeapi.co/api/v2/pokemon-species')
            .then(data => data.json())
            .then(data => {
                console.log(data)
                count = data.count
            })
            .then(() => {
                getRandomNames()
            })
    })

    function getRandom(max) {
        console.log(`get random ${max}`)
        return Math.floor(Math.random() * (max + 1))
    }

    function getPokemon(name) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(data => data.json())
            .then(data => {
                pokemon = {
                    name: name,
                    sprite: data.sprites.other.dream_world.front_default ?? data.sprites.front_default
                }
            })
    }

    async function getRandomNames() {
        console.log('get random names')

        names = Array(4).fill(0).map(async () => {
            let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${getRandom(count)}`)
            let json = await res.json()
            let name = await json.name
            return name
        })

        getPokemon((await Promise.all(names))[getRandom(4)])
    }

    function submitAnswer(name) {
        selected = name
        correct = pokemon.name

        if (selected == correct)
            cor++

        setTimeout(() => {
            cur++
            selected = null
            correct = null
            getRandomNames()
        })
    }
</script>

<main class="flex flex-col items-center mt-16 font-sans text-gray-800">
    <h1 class="text-3xl font-bold">Jaki to Pokemon?</h1>
    
    {#if pokemon}
        {#if cur <= 10 }
            <div class="mb-4">
                <h3 class="text-lg">Pytanie <span class="font-bold">{ cur }</span>/10</h3>
            </div>

            <img src={pokemon.sprite} alt="pokemon">
            
            <ol class="w-full max-w-md px-4">
                {#each names as name, id }
                    <li class="mb-3">
                        <button 
                            class="w-full flex items-cente border border-gray-300 rounded-lg p-3 font-medium transition-colors duration-150 
                            {correct == name ? 'bg-green-500 text-white' : (selected == name ? 'bg-red-500 text-white' : 'hover:bg-gray-200')}" 
                            onclick={() => submitAnswer(name)} 
                            disabled={selected != null}>
                            <span class="bg-yellow-400 text-white font-bold rounded-md px-3 py-1 mr-4">{ id + 1 })</span>
                            <span class="flex-1">{ name }</span>
                        </button>
                    </li>
                {/each}
            </ol>
        {:else}
            <h1 class="text-2xl font-bold text-center">Twój wynik:</h1>
            <h3 class="text-lg font-medium text-center mt-2">{ cor }/10 punktów!</h3>
        {/if}
    {/if}
</main>