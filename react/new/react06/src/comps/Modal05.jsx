const Modal = ({data, setModal}) => {
    return (
        <div style={{background: 'rgba(255,192,203,0.6)', position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '0', left: '0'}}>
            <div style={{background: 'white'}}>
                <button onClick={() => setModal(false)}>x</button>
                <h1>strefa obowiązuje w:</h1>

                {
                    data.map((e,i) => (
                        <p key={i}>{e}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default Modal