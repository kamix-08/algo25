<script>
    import questions from "./quiz.json"

    const getRandom = (m) => Math.floor(Math.random() * (m+1))
    const shuffle = (arr) => arr.toSorted((a, b) => Math.random() > 0.5)

    const submitAnswer = (ans) => {
        if (ans == question.correct) cor++
        cur++
    }

    let cur = 0
    let cor = 0

    $: question = questions[cur % questions.length]
</script>

<main class="flex flex-col items-center mt-20">
    <h1>Quiz</h1>

    <div class="flex flex-row">
        <h2 class="">{ cor }/{ cur }pkt</h2>
        <h3 class="">{ question.question }</h3>
    </div>
    
    <ol>
        {#each shuffle(question.answers) as ans, id }
            <li class="w-200 mt-4 border-b-2 border-r-1">
                <button class="w-200 flex items-center hover:bg-gray-400 transition-colors duration-150" onclick={() => submitAnswer(ans)}>
                    <span class="bg-yellow-400 text-white p-2 w-1/6 self-start">{ id + 1 })</span>
                    <span class="w-5/6 text-center">{ ans }</span>
                </button>
            </li>
        {/each}
    </ol>
</main>