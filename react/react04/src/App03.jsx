import { useState } from 'react'

import Item03 from "./comps/Item03"

const App = () => {
    const [text01   , setText01   ] = useState("BBB")
    const [value02  , setValue02  ] = useState(16)
    const [color03  , setColor03  ] = useState("lightgreen")
    const [visible04, setVisible04] = useState(true)
    
    return (
        <>
            <button onClick={() => setText01("AAA")}>set to aaa</button>
            <button onClick={() => setText01("BBB")}>set to bbb</button>
            <Item03 text={text01} />
            <hr />
            
            <button onClick={() => setValue02(5)}>set to 5</button>
            <button onClick={() => setValue02(10)}>set to 10</button>
            <button onClick={() => setValue02(v => v+1)}>add 1</button>
            <button onClick={() => setValue02(v => v-1)}>sub 1</button>
            <button onClick={() => setValue02(v => v**2)}>power</button>
            <Item03 text={value02} />
            <hr />
            
            <button onClick={() => setColor03("yellow")}>set to yellow</button>
            <button onClick={() => setColor03("lightgreen")}>set to lightgreen</button>
            <Item03 text={"TEST"} color={color03} />
            <hr />
            
            <button onClick={() => setVisible04(true)}>visible</button>
            <button onClick={() => setVisible04(false)}>invisible</button>
            <Item03 text={"ITEM"} display={visible04 ? "block" : "none"} />
            <hr />
        </>
    )
}

export default App