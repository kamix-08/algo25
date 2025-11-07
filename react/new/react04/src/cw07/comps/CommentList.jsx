import Comment from "./Comment"

const CommentList = ({data}) => {
    return (
        <>
            {
                data.map(({id, text, date}, idx) => (
                    <Comment id={id} text={text} date={date} key={idx} />
                ))
            }
        </>
    )
}

export default CommentList