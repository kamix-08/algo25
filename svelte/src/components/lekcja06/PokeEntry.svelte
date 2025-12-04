<script>
    import { onMount } from "svelte";

    let {id} = $props()

    let name = $state()
    let weight = $state()
    let experience = $state()
    let abilities = $state([])
    let types = $state([])
    let desc = $state()

    onMount(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(data => data.json())
            .then(data => {
                name = data.name
                weight = data.weight
                experience = data.base_experience

                abilities = data.abilities.map(a => a.ability.name)
                types = data.types.map(t => t.type.name)

                fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                    .then(data => data.json())
                    .then(data => {
                        desc = data.flavor_text_entries[0].flavor_text.replace('\u000c', '<br>')
                    })
            })
    })
</script>

<main class="max-w-md mx-auto mt-8 bg-white p-6 space-y-6">
    <h1 class="text-3xl font-bold text-center capitalize text-gray-800">{name}</h1>
    <p class="text-gray-600 text-center text-base leading-relaxed mb-4">{@html desc}</p>

    <div class="flex justify-center">
        <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/{id}.svg" 
            alt="{name}" 
            class="w-40 h-40 object-contain"
        >
    </div>

    <table class="w-full text-left border-collapse mt-4">
        <tbody>
            <tr class="border-b">
                <td class="py-2 font-semibold text-gray-700">Gatunek</td>
                <td class="py-2 text-gray-600">{types.join(', ')}</td>
            </tr>
            <tr class="border-b">
                <td class="py-2 font-semibold text-gray-700">Umiejętności</td>
                <td class="py-2 text-gray-600">{abilities.join(', ')}</td>
            </tr>
            <tr>
                <td class="py-2 font-semibold text-gray-700">Waga</td>
                <td class="py-2 text-gray-600">{weight}</td>
            </tr>
        </tbody>
    </table>

    <p class="text-center text-lg font-medium text-indigo-700">Doświadczenie: {experience}</p>
</main>