const Item = (props) => {
    return (
        <div style={{"background": props.color, "display": props.display}}>
            <h3>{props.text}</h3>
        </div>
    )
}

export default Item