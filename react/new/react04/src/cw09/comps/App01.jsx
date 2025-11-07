import { useEffect, useState } from 'react'
import data from './../data.json'
import Panel from './Panel'
import Avatar from './Avatar'

const App = () => {
    const [role, setRole] = useState('all')
    const [hp  , setHp  ] = useState(0)
    const [view, setView] = useState(0b1111)

    const updateView = (n) => {
        setView(v => {
            v ^= (1 << n)
            return v
        })
    }

    const [filtered, setFiltered] = useState(data)
    useEffect(() => {
        setFiltered(
            data
                .filter(e => role == "all" 
                    || e.tags.includes(role))
                .filter(e => {
                    switch (hp) {
                        case 0: return true
                        case 1: return e.stats.hp < 550
                        case 2: return e.stats.hp >= 550 && e.stats.hp <= 600
                        case 3: return e.stats.hp > 600
                    }
                }))
    }, [role, hp])

    useEffect(() => {
        console.log(view)
    }, [view])

    return (
        <>
            <Panel data={data} setRole={setRole} setHp={setHp} hp={hp} setView={updateView} view={view} filtered={filtered} />
        
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {
                    filtered.map((ele, idx) => (
                        <Avatar data={ele} view={view} key={idx} />
                    ))
                }
            </div>
        </>
    )
}

export default App