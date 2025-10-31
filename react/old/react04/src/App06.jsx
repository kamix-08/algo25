import { useState } from "react"

import Item06 from "./comps/Item06"

const App = () => {
    const INIT_OBJ = {
        value : 1000,
        array : [1, 2, 3],
        object: { a: 1, b: 2 }
    }

    const [state, updateState] = useState(INIT_OBJ)

    const update = (val) => {
        switch (val) {
            case 0:
                updateState({
                    ...state,
                    value: state.value + 1000
                })

                break

            case 1:
                updateState({
                    ...state,
                    array: [
                        ...state.array,
                        state.array[state.array.length - 1] + 1
                    ]
                })

                break

            case 2:
                updateState({
                    ...state,
                    object: {
                        ...state.object,
                        a: state.object.a + 1
                    }
                })

                break

            default:
                break
        }
    }

    return (
        <>
            <button onClick={() => update(0)}>change value</button>
            <button onClick={() => update(1)}>change array</button>
            <button onClick={() => update(2)}>change object</button>

            <Item06 data={state.value} />
            <Item06 data={state.array} />
            <Item06 data={state.object} />
        </>
    )
}

export default App