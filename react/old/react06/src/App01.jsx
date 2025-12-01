import { useEffect, useState, useRef } from "react"

const App01 = () => {
    const MAX = 6
    const INTERVAL = 67

    const [text, setText] = useState("")
    const [entries, setEntires] = useState(0)
    const [intervId, setIntervId] = useState()
    const [direction, setDirection] = useState(true)
    const dirRef = useRef(direction)

    const changeInterval = () => {
        if (intervId) {
            clearInterval(intervId)
            setIntervId(undefined)
            return
        }

        setIntervId(setInterval(() => {
            setEntires(v => {
                if (v == MAX) {
                    setDirection(false)
                    return MAX - 1
                }
                
                if (v == 0) {
                    setDirection(true)
                    return 1
                }

                return v + (dirRef.current ? 1 : -1)
            })
        }, INTERVAL))
    }

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts/3", {})
            .then(data => data.json())
            .then(data => {
                setText(data.title)
            })

        changeInterval()
    }, [])

    useEffect(() => {
        dirRef.current = direction
    }, [direction])

    return (
        <>
            <button onClick={changeInterval}>{intervId ? "stop" : "start"}</button>
            <br></br><i>state: {direction ? "true" : "false"}</i>

            {
                Array(entries).fill(0).map((_, idx) => (
                    <p key={idx}>{text}</p>
                ))
            }
        </>
    )
}

export default App01