import { useState } from "react"

const App02 = () => {
    const categories = ["any", "programming", "misc", "dark", "pun", "spooky", "christmas"]
    const [cat, setCat] = useState("any")
    const [joke, setJoke] = useState()
    const [id, setId] = useState()

    const INTERVAL = 2500

    const submit = (e = null) => {
        if (e)
            e.preventDefault()

        fetch(`https://v2.jokeapi.dev/joke/${cat}`)
            .then(data => data.json())
            .then(data => {
                if(data.type == 'twopart') {
                    setJoke(data.setup + "\n" + data.delivery)
                } else {
                    setJoke(data.joke)
                }
            })
    } 

    const handleCb = (e) => {
        if (e.target.checked) {
            submit()
            setId(setInterval(submit, INTERVAL))
        } else {
            setId(i => clearInterval(i))
        }
    }

    return (
        <>
            <form onSubmit={submit}>
                <h2>Wybierz kategorię:</h2>

                <input id="cb" type="checkbox" onClick={handleCb} />
                <label htmlFor="cb">generuj</label>
                <br />

                <select onInput={(e) => {setCat(e.target.value)}}>
                    {
                        categories.map((ele, idx) => (
                            <option value={ele} key={idx}>{ele}</option>
                        ))
                    }
                </select>

                <button type="submit">generuj</button>
            </form>

            <pre>{joke}</pre>
        </>
    )
}

export default App02