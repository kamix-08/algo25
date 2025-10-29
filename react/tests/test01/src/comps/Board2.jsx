import Tile from "./Tile"

const Board2 = (props) => {
    const tiles = Array(5).fill(0).map((_, y) => (
        Array(3).fill(0).map((_, x) => {
            const idx = y * 3 + x
            return <Tile id={idx} key={idx} 
                color={props.data.color} on={props.data.selected.includes(idx)} />
        })
    ))

    return (
        <div className="Board2">
            <h1>{props.data.title}</h1>
            <h3>{props.data.id}</h3>

            {
                tiles.map((ele, idx) => (
                    <div key={idx} className="board-row">
                        {
                            ele
                        }
                    </div>
                ))
            }

            <button onClick={props.delete}>usun</button>
        </div>
    )
}

export default Board2