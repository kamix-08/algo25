import { useState } from "react"

import Item04 from "./comps/Item04"

const App = () => {
    const [list, setList] = useState([])

    const getRandomId = () => Math.floor(Math.random() * 1000)

    return (
        <>
            <button className="btn" onClick={() => setList([...list, getRandomId()])}>dodaj na koniec</button>
            <button className="btn" onClick={() => setList([getRandomId(), ...list])}>dodaj na początek</button>
            <button className="btn" onClick={() => setList([...list, 5])}>dodaj 5</button>

            {/* <button className="btn" onClick={() => setList(list.filter((_, idx) => idx != 0))}>usun pierwszy</button> */}
            <button className="btn" onClick={() => setList(list.slice(1))}>usun pierwszy</button>

            <button className="btn" onClick={() => setList(list.filter((_, idx) => idx != list.length - 1))}>usun ostatni</button>
            {/* <button className="btn" onClick={() => setList(list.slice(0, -1))}>usun ostatni</button> */}

            <button className="btn" onClick={() => setList([])}>usun wszystkie</button>

            {
                list.map((element, idx) => (
                    <Item04 key={idx} val={element} />
                ))
            }
        </>
    )
}

export default App