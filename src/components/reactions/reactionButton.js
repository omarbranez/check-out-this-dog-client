import React, {useState} from 'react'
import Tooltip from '@mui/material/Tooltip'
import { addReaction } from '../../actions/reports'

const ReactionButton = ({userId, reportId, count}) => {
    console.log(count)
    const [hovered, setHovered] = useState(false)
    const [liked, setLiked] = useState()
    const handleClick = () => {
        console.log('clicked by ' + userId + ' ' + reportId)
    }

    return (
        // <div onMouseEnter={setHovered(true)} onMouseLeave={setHovered(false)}>
            // {/* <img src='/reaction.png'>hi</img> */}
        <div onClick={handleClick}>
            <div style={{boxSizing: 'content-box', width: '25%', border: 'solid #5B6DCD 10px', margin: 'auto'}}>

        <Tooltip title='People who have liked this:'  placement='right-start'>
            <img src='/reaction.png' height={'40rem'} />
        </Tooltip>

            {count > 0 ? <p style={{display: 'inline-block'}}>{count} {count == 1 ? 'user liked this' : 'users liked this'} </p> : <p style={{display: 'inline-block'}}>Be the first user to like this!</p>}
        </div>
        </div>
    )
}

export default ReactionButton

