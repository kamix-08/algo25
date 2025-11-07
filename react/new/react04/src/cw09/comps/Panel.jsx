const Panel = (props) => {
    const roles = {}

    for (let ele of props.data) {
        for (let tag of ele.tags) {
            roles[tag] = roles[tag] ? roles[tag] + 1 : 1
        }
    }
    
    return (
        <>
            <h1>Opcje filtrowania</h1>

            <section>
                <h2>Filtruj po roli</h2>

                <select onChange={(e) => {props.setRole(e.target.value)}}>
                    <option value={'all'}>All ({props.data.length})</option>

                    {
                        Object.keys(roles).map((ele, idx) => (
                            <option key={idx} value={ele}>{ele} ({roles[ele]})</option>
                        ))
                    }
                </select>
            </section>

            <section>
                <h2>Filtruj po HP</h2>

                <><input type="radio" name="rb" id="rb-1" checked={props.hp == 0} onChange={() => props.setHp(0)} /><label htmlFor="rb-1">Wszystkie HP</label> </>
                <><input type="radio" name="rb" id="rb-2" checked={props.hp == 1} onChange={() => props.setHp(1)} /><label htmlFor="rb-2">Niskie HP (&lt; 550)</label> </>
                <><input type="radio" name="rb" id="rb-3" checked={props.hp == 2} onChange={() => props.setHp(2)} /><label htmlFor="rb-3">Średnie HP (550 - 600)</label> </>
                <><input type="radio" name="rb" id="rb-4" checked={props.hp == 3} onChange={() => props.setHp(3)} /><label htmlFor="rb-4">Wysokie HP (&gt; 600)</label> </>
            </section>
            
            <section>
                <h2>Konfiguracja widoku</h2>

                <><input type="checkbox" id="cb-1" onChange={() => props.setView(0)} checked={props.view & (1 << 0)} /><label htmlFor="cb-1">Pokaż Tytuł</label></>
                <><input type="checkbox" id="cb-2" onChange={() => props.setView(1)} checked={props.view & (1 << 1)} /><label htmlFor="cb-2">Pokaż Role</label></>
                <><input type="checkbox" id="cb-3" onChange={() => props.setView(2)} checked={props.view & (1 << 2)} /><label htmlFor="cb-3">Pokaż Statystykę HP</label></>
                <><input type="checkbox" id="cb-4" onChange={() => props.setView(3)} checked={props.view & (1 << 3)} /><label htmlFor="cb-4">Pokaż Prędkość</label></>
            </section>

            <p>Wyświetlono: {props.filtered.length}/{props.data.length}</p>
        </>
    )
}

export default Panel