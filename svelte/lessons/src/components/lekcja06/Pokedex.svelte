<script>
    import { onMount } from "svelte";

    let count = $state()
    let pokemons = $state([])
    
    let query = $state("")
    let limit = $state(8)
    let page = $state(1)

    let pokemonsFiltered = $derived(pokemons.filter(poke => poke.name.includes(query)).slice(limit * (page - 1), limit * page))

    onMount(() => {
        fetch("https://pokeapi.co/api/v2/pokemon-species/")
            .then(data => data.json())
            .then(data => {
                count = data.count

                fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}`)
                    .then(data => data.json())
                    .then(data => {
                        pokemons = data.results

                        pokemons = pokemons.map((p, i) => { return {
                            ...p,
                            id: i+1
                        }})

                        console.log(pokemons)
                    })
            })
    })
</script>

<main class="max-w-3xl mx-auto mt-8 bg-white rounded-xl p-6 space-y-6">
    <div class="flex flex-col md:flex-row gap-4 mb-6">
        <input type="text" bind:value={query} placeholder="Wyszukaj..." 
            class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 flex-1">
        <input type="number" bind:value={limit} min="1"
            class="border border-gray-300 rounded px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-indigo-400">
        <input type="number" bind:value={page} min="1"
            class="border border-gray-300 rounded px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-indigo-400">
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each pokemonsFiltered as pokemon}
            <div class="flex flex-col items-center bg-gray-50 rounded-lg p-4 space-y-2">
                <img 
                    width="100" 
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/{pokemon.id}.svg" 
                    alt="{pokemon.name}" 
                    class="w-24 h-24 object-contain"
                >
                <h1 class="text-lg font-semibold capitalize text-gray-800">{pokemon.name} <span class="text-gray-500">[{pokemon.id}]</span></h1>
                <a 
                    href="/pokedex/{pokemon.id}" 
                    class="text-indigo-600 hover:underline text-sm"
                >Learn more &gt;&gt;</a>
            </div>
        {/each}
    </div>
</main>