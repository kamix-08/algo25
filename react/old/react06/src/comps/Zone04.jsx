import { useEffect, useState } from "react"

const Zone = ({data, show, toggle, toggled}) => {
    const [time, setTime] = useState()

    const updateDate = () => {
        const d = new Date()
        d.setHours(d.getUTCHours() + data.offset)
        setTime(d.toLocaleTimeString('en-GB'))
    }

    useEffect(() => {
        updateDate()
        setInterval(updateDate, 500)
    }, [])

    return (
        <div style={{background: toggled ? 'pink' : 'white', width: "200px", height: "300px", display: "flex", flexDirection: "column"}}>
            <h1>{data.value}</h1>
            <p>{time}</p>

            <div style={{marginTop: "auto"}}>
                <button onClick={show}>show</button>
                <button onClick={toggle}>toggle</button>
            </div>
        </div>
    )
}

export default Zone