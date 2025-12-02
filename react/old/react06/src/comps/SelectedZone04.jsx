const SelectedZone = ({data, closeModal}) => {
    return (
        <div style={{display: (data.value ? 'flex' : 'none'), position: "absolute", top: 0, width: "100%", height: "100%", justifyContent: "center", alignItems: "center", background: "rgba(255, 192, 203, 0.67)"}}>
            <div style={{background: "white", padding: "10px"}}>
                <h1>{data.value}</h1>
                <button onClick={closeModal}>x</button>

                {
                    data.utc?.map((ele, idx) => (
                        <p key={idx}>{ele}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default SelectedZone