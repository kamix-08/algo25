import { useEffect, useState } from "react"

const Zone = ({data, setModal, setToggled}) => {
    const [toggled_, setToggled_] = useState(false)
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
        <div style={{background: toggled_ ? 'pink' : 'white'}}>
            <h1>{data.value}</h1>
            <p>{text}</p>
            <button onClick={() => setModal(data.idx)}>show</button>
            <button onClick={() => {
                setToggled_(e => {
                    if (e) {
                        setToggled(t => t.filter(i => i != data.idx))
                    } else {
                        setToggled(t => [...t, data.idx])
                    }

                    return !e
                })
            }}>toggle</button>
        </div>
    )
}

export default Zone