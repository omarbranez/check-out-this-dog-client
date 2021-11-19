import React from 'react'

const CommentIndex = (props) => {
    return(
    <div>
        {props.comment ? <p>{props.comment.content}</p> : <p>Be the first to comment!</p>}
    </div>)
}

export default CommentIndex