const Item = (props) => {
    return (
        <>
            <h3>{props.val}</h3>
            <button onClick={() => props.delete(props.idx)}>usun</button>
        </>
    )
}

export default Item