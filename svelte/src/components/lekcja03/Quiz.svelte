<script>
    import questions from "./quiz.json"

    const shuffle = (arr) => arr.toSorted((a, b) => Math.random() > 0.5)

    async function loadFromFile(e) {
        const file = await e.target.files[0]
        const text = file.text
        // todo: parse json
    }

    let selected  = $state(null)
    let isCorrect = $state(null)
    let correct   = $state(null)

    const submitAnswer = (id) => {
        if (answers[id] == question.correct) {
            cor++
            isCorrect = true
        } else {
            isCorrect = false
            correct   = answers.findIndex(a => a == question.correct)
        }

        selected = id

        setTimeout(() => {
            cur++
            selected  = null
            isCorrect = null
            correct   = null
        }, 1000)
    }

    let cur = $state(0)
    let cor = $state(0)

    const question = $derived(questions[cur % questions.length])
    const answers  = $derived(shuffle(question.answers))
</script>

<main class="flex flex-col items-center mt-16 font-sans text-gray-800">
    <h1 class="text-3xl font-bold mb-6">Quiz</h1>
    
    <ol class="w-full max-w-md px-4">
        {#if cur < questions.length }
            <div class="mb-4">
                <h3 class="text-lg font-semibold">{ question.question }</h3>
            </div>

            {#each answers as _, id }
                <li class="mb-3">
                    <button 
                        class="w-full flex items-cente border border-gray-300 rounded-lg p-3 font-medium transition-colors duration-150 
                        {selected == id ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : (correct == id ? 'bg-green-500 text-white' : 'hover:bg-gray-200')}" 
                        onclick={() => submitAnswer(id)} 
                        disabled={selected != null}>
                        <span class="bg-yellow-400 text-white font-bold rounded-md px-3 py-1 mr-4">{ id + 1 })</span>
                        <span class="flex-1">{ answers[id] }</span>
                    </button>
                </li>
            {/each}
        {:else}
            <h1 class="text-2xl font-bold text-center">Twój wynik:</h1>
            <h3 class="text-lg font-medium text-center mt-2">{ cor }/{questions.length} punktów!</h3>
        {/if}
    </ol>
</main>