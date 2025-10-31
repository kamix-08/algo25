const Dialog = (props) => {
    return (
        <div style={{"display": props.visible ? "block" : "none"}}>
            <p>Usunąć?</p>

            <button onClick={() => props.setVisible(false)}>anuluj</button>
            <button onClick={props.fun.fun}>ok</button>
        </div>
    )
}

export default Dialog