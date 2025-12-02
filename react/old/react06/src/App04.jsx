import { useEffect, useState } from "react"
import Zone from "./comps/Zone04"
import SelectedZone from "./comps/SelectedZone04"

const App04 = () => {
    const [zones, setZones] = useState([])
    const [modal, setModal] = useState({})
    const [toggled, setToggled] = useState([])
    const [isToggled, setIsToggled] = useState(false)

    useEffect(() => {
        toggleData()
    }, [])

    const show = (val) => {
        setModal(zones.find(e => e.value == val))
    }

    const toggle = (val) => {
        setToggled(t => {
            let nt = [...t]

            if (nt.findIndex(e => e.value == val) == -1) 
                nt.push(zones.find(e => e.value == val))
            else 
                nt = nt.filter(e => e.value != val)

            return nt
        })
    }

    const toggleData = () => {
        setIsToggled(t => {
            fetch(`http://localhost:3000/${t ? "toggled" : "zones"}`)
                .then(data => data.json())
                .then(data => {
                    setZones(t ? JSON.parse(data) : data)
                })

            return !t
        })
    }

    const sendZones = () => {
        fetch("http://localhost:3000/zones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                zones: JSON.stringify(toggled)
            })
        })

        setIsToggled(t => !t)
        toggleData()

        alert(`wysłano: ${toggled.length}`)
    }

    return (
        <div style={{position: "relative"}}>
            <button onClick={sendZones}>{isToggled ? "wyślij na serwer" : "pozostaw zaznaczone"}</button>
            <button onClick={toggleData}>{isToggled ? "wyświetl zapisane" : "powrót do wszystkich"}</button>

            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {
                    zones.toSorted((a,b) => a.offset - b.offset).map(ele => (
                        <Zone data={ele} show={() => show(ele.value)} toggle={() => toggle(ele.value)} toggled={toggled.findIndex(e => e.value == ele.value) != -1} key={ele.value} />
                    ))
                }
            </div>

            <SelectedZone data={modal} closeModal={() => setModal({})} />
        </div>
    )
}

export default App04