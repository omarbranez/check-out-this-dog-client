import React, {useState, useEffect} from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import Tooltip from '@mui/material/Tooltip'
import { addReaction, setSelectedReport } from '../../actions/reports'

const ReactionButton = ({reactions, liked}) => {

    const [bgColor, setBgColor] = useState('white')

    // useEffect(()=> {
    //     likedByCurrentUser() && setBgColor('coral')
    // },[bgColor])
    // useEffect(()=> {
    //     liked && setBgColor('coral')
    // },[bgColor])
    
    // const liked = useSelector((state) => state.reports.selectedReport.liked, shallowEqual)
    // const likedByCurrentUser = () => {
    //     reactions.find(reaction=> reaction.userId == user.id)    
    // }

    // console.log(likedByCurrentUser())
    console.log(bgColor)
    console.log(liked)

    const usersWhoLiked = () => {
        return reactions.map(reaction => reaction.username)
    }

    return (
        <div>
            <Tooltip title={`People who have liked this: ${usersWhoLiked()}`}   placement='right-start'>
            <div style={{boxSizing: 'content-box', width: '25%', border: 'solid #5B6DCD 10px', margin: 'auto', background: `${liked ? 'coral' : 'white' }`}}>
                <img src='/reaction.png' height={'40rem'} />
                {reactions.length > 0 ? <p style={{display: 'inline-block'}}>{reactions.length} {reactions.length == 1 ? 'user liked this' : 'users liked this'} </p> : <p style={{display: 'inline-block'}}>Be the first user to like this!</p>}
                {liked ? <p>Click to Unlike</p> : <p>Click to Like</p>}
            </div>
            </Tooltip>
        </div>
    )
}

export default ReactionButton