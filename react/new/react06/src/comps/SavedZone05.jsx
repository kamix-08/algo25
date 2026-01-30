import { useEffect, useState } from "react"

const SavedZone = ({data}) => {
    const [intervalId, setIntervalId] = useState()
    const [text, setText] = useState()
        
    useEffect(() => {
        setIntervalId(setInterval(() => {
            const d = new Date()
            d.setUTCHours(d.getUTCHours() + data.offset)
            setText(d.toLocaleTimeString("pl-PL"))
        }, 500))

        return () => {
            setIntervalId(e => {
                clearInterval(e)
            })
        }
    }, [])

    return (
        <div>
            <h1>{data.value}</h1>
            <p>{text}</p>
        </div>
    )
}

export default SavedZone