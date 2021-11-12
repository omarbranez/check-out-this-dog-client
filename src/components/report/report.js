import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setSelectedReport, unsetSelectedReport } from '../../actions/reports'
import Map from '../map/map'
import AnalyzeImage from './analyzeImage'

//need to use nested routes
const Report = ({ setSelectedReport, unsetSelectedReport, id, user,
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
    created,}) => {
    
    const location = useLocation()
    const reportId = location.pathname[9]
    
    useEffect(()=> {
        id ? setSelectedReport(id) : setSelectedReport(reportId)
        return unsetSelectedReport
    }, [setSelectedReport, reportId, unsetSelectedReport])

    console.log(id ? id : null)
    console.log(breed ? breed : null)

    const [showModal, setShowModal] = useState(false)

    const loadedReport = () => 
        <div>
        <h2>{name}, the {breed}</h2>
        <p>on: {created}</p>
            {user.id === user_id ? <p>Reported by: You!</p> : <p>Reported by: {user.username}</p>}
            <p>Breed: {breed}</p>
            <p>Color: {color}</p>
            <p>Age: {age}</p>
            <p>Features: {features}</p>
            <p>Demeanor: {demeanor}</p>
            <img className="photo" src={photo.url}/>
            <p>Location:</p>
            <div>
                < Map lat={lat} lng={lng}/>
            </div>
            <>
                <AnalyzeImage imageUrl={photo.url}/>
            </>
    </div>
    
    return id ? loadedReport() : <h2>Loading...</h2>
}

const mapStateToProps = (state) => ({
    ...state.reports.selectedReport,
    user: state.user
})

export default connect(mapStateToProps, { setSelectedReport, unsetSelectedReport})(Report)