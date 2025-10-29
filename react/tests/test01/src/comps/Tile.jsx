const Tile = (props) => {
    const handleChange = () => {
        if(!props.setSelected)
            return

        props.setSelected(s => {
            let sel = [...s]
            let row = [...sel[props.bId]]

            console.log(row)
            const idx = row.findIndex(e => e == props.id)
            if (idx == -1) {
                console.log('puhs', idx)
                row.push(props.id)
            }
            else {
                console.log('remove', idx)
                row = [...row.slice(0, idx), ...row.slice(idx + 1)]
            }

            sel[props.bId] = row
            return sel
        })
    }

    return (
        <button onClick={handleChange} className="Tile" style={{
            background: props.on ? props.color : 'white'
        }}></button>
    )
}

export default Tile