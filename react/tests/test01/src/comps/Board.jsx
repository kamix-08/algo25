import { useState } from "react"
import Tile from "./Tile"

const Board = (props) => {
    const [color, setColor] = useState(props.data.color)

    const handleColor = (e) => {
        setColor(e.target.value)
    }

    const tiles = Array(5).fill(0).map((_, y) => (
        Array(3).fill(0).map((_, x) => {
            const idx = y * 3 + x
            return <Tile id={idx} bId={props.data.id - 1} 
                setSelected={props.setSelected} key={idx} 
                color={color} on={props.selected[props.data.id - 1].includes(idx)} />
        })
    ))

    return (
        <div className="Board">
            <h1>{props.data.title}</h1>
            <h3>{props.data.id}</h3>

            <div className="radios">
                <label htmlFor={`rbr-${props.data.id}`}>czerwony</label>
                <input type="radio" value="red"    onChange={handleColor} name={`colors-${props.data.id}`} id={`rbr-${props.data.id}`} />

                <label htmlFor={`rbg-${props.data.id}`}>zielony</label>
                <input type="radio" value="green"  onChange={handleColor} name={`colors-${props.data.id}`} id={`rbg-${props.data.id}`} />

                <label htmlFor={`rbb-${props.data.id}`}>niebieski</label>
                <input type="radio" value="blue"   onChange={handleColor} name={`colors-${props.data.id}`} id={`rbb-${props.data.id}`} />

                <label htmlFor={`rby-${props.data.id}`}>zolty</label>
                <input type="radio" value="yellow" onChange={handleColor} name={`colors-${props.data.id}`} id={`rby-${props.data.id}`} />
            </div>

            {
                tiles.map((ele, idx) => (
                    <div key={idx} className="board-row">
                        {
                            ele
                        }
                    </div>
                ))
            }

            <button onClick={() => props.save(props.data.id - 1, color)}>zapisz</button>
        </div>
    )
}

export default Board