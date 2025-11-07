import { useState } from "react"
import CommentList from "./CommentList"

const CommentForm = (props) => {
    const [text, setText] = useState("")

    const sendComment = (e) => {
        e.preventDefault()
        props.addComment({
            id: props.data.comments.reduce((a, b) => Math.max(a, b.id), -1) + 1,
            text: text,
            date: new Date().toLocaleString()
        })
    }
    
    return (
        <>
            <p>title: {props.data.thread} <span>{props.data.id}</span></p>

            <CommentList data={props.data.comments} />

            <form>
                <textarea onInput={(e) => setText(e.target.value)}></textarea>
                <input type="submit" value="send comment" onClick={sendComment} />
            </form>
        </>
    )
}

export default CommentForm