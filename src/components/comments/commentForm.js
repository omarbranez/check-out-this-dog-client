import React, { useState } from 'react'

const CommentForm = () => {

    const [ content, setContent ] = useState('')

    const handleSubmit = () => {
        console.log("hello")
    }
    return(
        <div>
        <h2>Submit a Comment</h2>
        <form onSubmit={handleSubmit}> 
            <input type="textarea" name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
            <input type="submit" value="Post Comment"/>
        </form>
        </div>
    )
}

export default CommentForm