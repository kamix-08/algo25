import Board from "./comps/Board"
import Board2 from "./comps/Board2"

import { useState } from "react"

import './App.css'

function App() {
  const data = {
    "boards": [
      {
        "id": 1,
        "title": "plansza A",
        "color": "yellow"
      },
      {
        "id": 2,
        "title": "plansza B",
        "color": "red"
      },
      {
        "id": 3,
        "title": "plansza C",
        "color": "green"
      },
      {
        "id": 4,
        "title": "plansza D",
        "color": "blue"
      }
    ]
  }

  const def = [
    [0,1,2,5,6,7,8,11,12,13,14],
    [0,1,2,3,5,6,7,8,9,12],
    [0,3,6,7,8,9,11,12,13,14],
    []
  ]

  const [selected, setSelected] = useState(def)
  const [boards, setBoards] = useState([])

  const save = (id, col) => {
    const sel = [...selected[id]]
    const maxId = boards.reduce((a, b) => Math.max(a, b.primaryId), -1) + 1

    const data_ = {
      primaryId: maxId,
      id: id + 1,
      title: data.boards[id].title,
      color: col,
      selected: sel
    }

    setBoards([...boards, data_])
  } 

  const del = (pId) => {
    setBoards(boards.filter(e => e.primaryId != pId))
  }

  return (
    <div className="App">
      <div>
        {
          data.boards.map((ele, idx) => (
            <Board data={ele} selected={selected}
              setSelected={setSelected} key={idx}
              save={save} />
          ))
        }
      </div>

      <hr />

      <div>
        <button onClick={() => setBoards([])}>usun wszystkie</button>

        {
          boards.map((ele, idx) => (
            <Board2 data={ele} delete={() => {del(ele.primaryId)}} key={idx} />
          ))
        }
      </div>
    </div>
  )
}

export default App