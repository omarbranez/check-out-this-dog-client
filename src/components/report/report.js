import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setSelectedReport, unsetSelectedReport, addLiked, undoLiked } from '../../actions/reports'
import Map from '../map/map'
import ReactionButton from '../reactions/reactionButton'
import CommentForm from '../comments/commentForm'
import CommentIndex from '../comments/commentIndex'

//need to use nested routes
const Report = ({ addLiked, undoLiked, setSelectedReport, unsetSelectedReport, id, user,
    user_id,
    dog_id,
    breed,
    name,
    color,
    gender,
    lat,
    lng,
    age,
    features,
    demeanor,
    photo,
    created,
    reactions,
    comments,
    liked,
    like_id, commented, comment_id}) => {
    
    const location = useLocation()
    const reportId = location.pathname[9]
    console.log(user)

    useEffect(()=> {
        id ? setSelectedReport(id) : setSelectedReport(reportId)
        return unsetSelectedReport
    }, [setSelectedReport, reportId, unsetSelectedReport])

    const handleClick = () => {
        liked ? undoLiked(like_id, id) : addLiked(user.id, id) 
    }

    const loadedReport = () => 
        <div>
            <h2>{name}, the {breed}</h2>
            <p>on: {created}</p>
            <div onClick={handleClick}>
                <ReactionButton user={user} userId={user.id} reportId={id} liked={liked} reactions={reactions}/>
            </div>
            {user.id === user_id ? <p>Reported by: You!</p> : <p>Reported by: {user.username}</p>}
            <p>Breed: {breed}</p>
            <p>Color: {color}</p>
            <p>Age: {age}</p>
            <p>Features: {features}</p>
            <p>Demeanor: {demeanor}</p>
            <img className="photo" src={photo.url} style={{maxWidth: '30%', height:'auto'}}/>
            <p>Location:</p>
            <div>
                < Map lat={lat} lng={lng} />
            </div>
            <div>
            <CommentForm/>
            </div>
            <div>
            <CommentIndex/>
            </div>
        </div>


    return id ? loadedReport() : <h2>Loading...</h2>
}

const mapStateToProps = (state) => ({
    ...state.reports.selectedReport,
    user: state.user,
    reactionsCount: state.reports.reactionsCount,
})

export default connect(mapStateToProps, { setSelectedReport, unsetSelectedReport, addLiked, undoLiked})(Report)