import { useState } from "react"

import Item08 from "./comps/Item08"

const App = () => {
    const [list   , setList   ] = useState([])
    const [visible, setVisible] = useState(false)
    const [lambda , setLambda ] = useState({})

    const getRandomId = () => Math.floor(Math.random() * 1000)

    const removeSelected = (id) => {
        setList(list.filter((_, idx) => idx != id))
    }

    const invokeDialog = (obj) => {
        obj.fun = () => {
            obj.a()
            setVisible(false)
        }

        setLambda(obj)
        setVisible(true)
    }

    return (
        <>
            <button onClick={() => setList([getRandomId(), ...list])}>dodaj na poczatek</button>
            <button onClick={() => setList([...list, getRandomId()])}>dodaj na koniec</button>
            <button onClick={() => invokeDialog({a: () => setList([])})}>usun wszystkie</button>

            {
                list.map((ele, idx) => (
                    <Item07 data={ele} ok={() => invokeDialog({a: () => removeSelected(idx)})} key={idx} />
                ))
            }

            <Dialog visible={visible} fun={lambda} setVisible={setVisible} />
        </>
    )
}

export default App