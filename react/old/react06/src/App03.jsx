import { useEffect, useState } from "react"

import Avatar from "./comps/Avatar03"

const App03 = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/data")
            .then(data => data.json())
            .then(data => {
                setData(data)
            })
    }, [])

    return (
        <>
            {
                data.map((ele, idx) => (
                    <Avatar data={ele} key={idx} />
                ))
            }
        </>
    )
}

export default App03