const Item = ({data, ok}) => {
    return (
        <>
            <h2>ITEM</h2>
            <h3>{data}</h3>

            <button onClick={ok}>usun</button>
        </>
    )
}

export default Item