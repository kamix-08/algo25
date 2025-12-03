const Avatar = ({data}) => {
    return (
        <>
            <h1>{data.name}</h1>
            <img src={data.icon} alt={data.id} />
        </>
    )
}

export default Avatar