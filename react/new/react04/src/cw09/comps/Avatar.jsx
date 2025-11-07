const Avatar = (props) => {
    return (
        <div style={{border: "1px solid black", width: "200px"}}>
            <img src={props.data.icon} alt={props.data.name} height="50" />
            <h3>{props.data.name}</h3>
            <p style={{display: props.view & (1 << 0) ? 'block' : 'none'}}>{props.data.title}</p>

            <div style={{display: props.view & (1 << 1) ? 'block' : 'none'}}>
                {
                    props.data.tags.map((ele, idx) => (
                        <span key={idx}>{ele}</span>
                    ))
                }
            </div>

            <p style={{display: props.view & (1 << 2) ? 'block' : 'none'}}>HP: {props.data.stats.hp}</p>
            <p style={{display: props.view & (1 << 3) ? 'block' : 'none'}}>Prędkość: {props.data.stats.movespeed}</p>
        </div>
    )
}

export default Avatar