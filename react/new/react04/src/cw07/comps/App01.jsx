import { useState } from "react"
import data from "./../data.json"
import CommentForm from "./CommentForm"

const App = () => {
    const [data_, setData] = useState(data)

    const addComment = (idx, com) => {
        setData(d => {
            const da = [...d]
            const id = da.indexOf(e => e.id == idx)
            da[id].comments = [com, ...da[id].comments]
            return da
        })
    }
    
    return (
        <>
            {
                data_.map((ele, idx) => (
                    <CommentForm data={ele} addComment={(com) => addComment(idx, com)} key={idx} />
                ))
            }
        </>
    )
}

export default App