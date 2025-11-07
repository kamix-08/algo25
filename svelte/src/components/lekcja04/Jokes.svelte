<script>
    import { onMount } from "svelte";

    let category = $state()

    let categories = $state()
    onMount(async () => {
        // fetch('https://api.chucknorris.io/jokes/categories')
        //     .then(data => data.text())
        //     .then(data => {
        //         categories = JSON.parse(data)
        //     })
        //     .catch(err => {
        //         console.error(err)
        //     })

        try {
            const response = await fetch('https://api.chucknorris.io/jokes/categories')

            // const data = await response.text()
            // categories = JSON.parse(data)

            categories = await response.json()
        } catch (err) {
            console.log(err)
        }
    })

    let joke = $state()
    const getJoke = async () => {
        // fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
        //     .then(data => data.text())
        //     .then(data => {
        //         joke = JSON.parse(data)
        //         console.log(joke)
        //     })
        //     .catch(err => {
        //         console.error(err)
        //     })

        try {
            const respone = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
            joke = await respone.json()
        } catch (err) {
            console.error(err)
        }
    }
</script>

<main class="flex flex-row items-center justify-center mt-16 font-sans text-gray-800">
    <select bind:value={category} onchange={getJoke}>
        <option value="--" selected disabled>Choose a category</option>

        {#each categories as cat}
            <option value={cat}>{cat}</option>
        {/each}
    </select>

    {#if joke}
        <section class="flex flex-row items-center justify-center ml-20">
            <img src={joke.icon_url} alt="icon">
            <p>{joke.value}</p>
        </section>
    {/if}
</main>