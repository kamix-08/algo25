import { useState } from "react"

import Item05 from "./comps/Item05"

const App = () => {
    const [list, setList] = useState([])

    const getRandomId = () => Math.floor(Math.random() * 1000)

    const deleteSelected = (id) => {
        setList(list.filter((_, idx) => idx != id))
    }

    return (
        <>
            <button className="btn" onClick={() => setList([...list, getRandomId()])}>dodaj na koniec</button>
            <button className="btn" onClick={() => setList([getRandomId(), ...list])}>dodaj na początek</button>
            <button className="btn" onClick={() => setList([])}>usun wszystkie</button>

            {
                list.map((element, idx) => (
                    <Item05 key={idx} idx={idx} delete={deleteSelected} val={element} />
                ))
            }
        </>
    )
}

export default App