<script>
    import { onMount } from "svelte";

    let count = $state()
    let pokemon = $state()
    let names = $state()

    let cur = $state(1)
    let cor = $state(0)

    let selected = $state()
    let correct = $state()

    let name = $state()
    let enterName = $state(true)

    let history = $state()

    onMount(() => {
        fetch('https://pokeapi.co/api/v2/pokemon-species')
            .then(data => data.json())
            .then(data => {
                count = data.count
            })
            .then(() => {
                if (!loadFromStorage())
                    getRandomNames()
            })
    })

    async function newGame() {
        cur = 1
        cor = 0
    }

    function getRandom(max, min=0) {
        console.log(`get random ${max}`)
        return Math.floor(Math.random() * (max + 1 - min)) + min
    }

    function getPokemon(name) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(data => data.json())
            .then(data => {
                pokemon = {
                    name: name,
                    sprite: data.sprites.other.dream_world.front_default ?? data.sprites.front_default
                }

                saveToStorage()
            })
            .catch(err => {
                console.warn(err)
                getRandomNames()
            })
    }

    async function getRandomNames() {
        console.log('get random names')

        Promise.all(Array(4).fill(0).map(async () => {
            let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${getRandom(count-1, 1)}`)
            let json = await res.json()
            return json.name
        }))
            .then(data => {
                names = data
                getPokemon(names[getRandom(4)])
            })
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

            if (cur > 10)
                endGame()
        }, 1000)
    }

    function saveToStorage() {
        const data = {
            cur: cur,
            cor: cor,
            name: name,
            pokemon: pokemon,
            names: names,
        }

        localStorage.setItem('state', JSON.stringify(data))
    }

    function loadFromStorage() {
        const data = JSON.parse(localStorage.getItem('state'))

        if (!data)
            return false

        cur = data.cur
        cor = data.cor

        name      = data.name
        enterName = false

        pokemon = data.pokemon
        names   = data.names

        history = JSON.parse(localStorage.getItem('hist')) || []
        
        return true
    }

    function endGame() {
        const record = {
            name: name,
            score: cor*10,
            date: new Date().toLocaleDateString('en-GB').replaceAll('/','.')
        }

        history.push(record)
        localStorage.setItem('hist', JSON.stringify(history))
    }
</script>

<main class="flex flex-col items-center mt-16 font-sans text-gray-800">
    <h1 class="text-3xl font-bold">Jaki to Pokemon?</h1>

    {#if enterName}
        <div class="w-full max-w-xs mx-auto mt-8 bg-white rounded-lg shadow p-6">
            <div>
                <h2 class="text-lg font-bold mb-4">Wprowadź nazwę gracza</h2>
                <input type="text" bind:value={name} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4">
                <button onclick={() => enterName = false} class="w-full px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded-lg shadow transition-colors duration-150">Start</button>
            </div>
        </div>
    {:else}
        
        {#if pokemon}
            {#if cur <= 10 }
                <div class="mb-4">
                    <h3 class="text-lg">Pytanie <span class="font-bold">{ cur }</span>/10</h3>
                </div>

                <img src={pokemon.sprite} alt="pokemon" class="h-100 my-10 {selected ? '' : 'brightness-0'}">
                
                <ol class="w-full max-w-md px-4">
                    {#each names as name, id }
                        <li class="mb-3">
                            <button 
                                class="w-full flex items-center border border-gray-300 rounded-lg p-3 font-medium transition-colors duration-150
                                {selected ? (name === correct ? ' bg-green-500 text-white' : name === selected ? ' bg-red-500 text-white' : '')
                                    : ' hover:bg-gray-200'}"
                                onclick={() => submitAnswer(name)} 
                                disabled={selected != null}>
                                <span class="bg-yellow-400 text-white font-bold rounded-md px-3 py-1 mr-4">{ id + 1 })</span>
                                <span class="flex-1 capitalize">{ name.replace('-', ' ') }</span>
                            </button>
                        </li>
                    {/each}
                </ol>
            {:else}

                <h2 class="text-2xl font-bold mb-2 text-blue-500">{name}</h2>
                <p class="text-lg font-semibold">{cor*10}%</p>
                <p class="mb-6">{cor}/10 poprawnych</p>

                <div class="w-full max-w-lg mx-auto mb-8">
                    <h3 class="text-lg font-bold mb-2">Najlepsze wyniki</h3>
                    <table class="w-full border border-gray-300 rounded-lg overflow-hidden shadow">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="py-2 px-3 text-left font-semibold text-gray-700">#</th>
                                <th class="py-2 px-3 text-left font-semibold text-gray-700">Gracz</th>
                                <th class="py-2 px-3 text-left font-semibold text-gray-700">%</th>
                                <th class="py-2 px-3 text-left font-semibold text-gray-700">Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each history.toSorted((a,b) => b.score - a.score) as record, idx}
                                <tr>
                                    <td class="py-2 px-3 font-bold">{idx+1}</td>
                                    <td class="py-2 px-3">{record.name}</td>
                                    <td class="py-2 px-3 text-blue-500">{record.score}</td>
                                    <td class="py-2 px-3">{record.date}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <button onclick={newGame} class="mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow transition-colors duration-150">
                    Nowa gra
                </button>

            {/if}
        {/if}

    {/if}

    <!-- <button onclick={() => {localStorage.clear()}}>Wyczyść</button> -->
</main>