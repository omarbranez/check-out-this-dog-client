// import React, {useState, useEffect} from 'react'
// import { connect } from 'react-redux'
// import { useParams, useLocation, useMatch} from 'react-router-dom'
// import { setSelectedReport, unsetSelectedReport } from '../../actions/reports'
// import Map from '../map/map'
// import Modal from 'react-modal'
// //need to use nested routes
// const Report = ({ setSelectedReport, unsetSelectedReport, id, user,
//     user_id,
//     dog_id,
//     breed,
//     name,
//     color,
//     gender,
//     lat,
//     lng,
//     age,
//     features,
//     demeanor,
//     photo,
//     created,}) => {
    
    
//     const params = useParams()
//     // console.log(id ? id : null)
//     console.log(id ? "I CAME HERE FROM SOMEWHERE ELSE" : "NOPE")
//     const location = useLocation()
//     // console.log(location.pathname[9])
//     const reportId = location.pathname[9]
//     // const id = props.match.params.id
    
//     useEffect(()=> {
//         id ? setSelectedReport(id) : setSelectedReport(reportId)
//         return unsetSelectedReport
//     }, [setSelectedReport, reportId, unsetSelectedReport])

//     console.log(id ? id : null)
//     console.log(breed ? breed : null)

//     const [showModal, setShowModal] = useState(false)

//     const loadedReport = () => 
//         <div>
//         <h2>{name}, the {breed}</h2>
//         <p>on: {created}</p>
//         {/* <Modal
//             isOpen={showModal}>
//             {showModal ? <button onClick={()=>setShowModal(!showModal)}>Close Window</button> : null }
//             {showModal ? <h2>{name}</h2> : null } */}
//             {user.id === user_id ? <p>Reported by: You!</p> : <p>Reported by: {user.username}</p>}
//             <p>Breed: {breed}</p>
//             <p>Color: {color}</p>
//             <p>Age: {age}</p>
//             <p>Features: {features}</p>
//             <p>Demeanor: {demeanor}</p>
//             <img className="photo" src={photo.url}/>
//             <p>Location:</p>
//             <div>
//                 < Map lat={lat} lng={lng}/>
//             </div>
//         {/* </Modal> */}
//     </div>
    
//     return id ? loadedReport() : <h2>Loading...</h2>
//         // <div>
//         //     <h2 className='grow' style={{color:'blue'}} onClick={()=> setShowModal(!showModal)}>{props.name}, the {props.breed}</h2>
//         //     <p>on: {props.created}</p>
//         //     <Modal
//         //         isOpen={showModal}>
//         //         {showModal ? <button onClick={()=>setShowModal(!showModal)}>Close Window</button> : null }
//         //         {showModal ? <h2>{props.name}</h2> : null }
//         //         {props.user.id === props.user_id ? <p>Reported by: You!</p> : <p>Reported by: {props.username}</p>}
//         //         <p>Breed: {props.breed}</p>
//         //         <p>Color: {props.color}</p>
//         //         <p>Age: {props.age}</p>
//         //         <p>Features: {props.features}</p>
//         //         <p>Demeanor: {props.demeanor}</p>
//         //         <img className="photo" src={props.photo.url}/>
//         //         <p>Location:</p>
//         //         <div>
//         //             < Map lat={props.lat} lng={props.lng}/>
//         //         </div>
//         //     </Modal>
//         // </div>
//     // )
// }

// const mapStateToProps = (state) => ({
//     ...state.reports.selectedReport,
//     user: state.user
// })

// export default connect(mapStateToProps, { setSelectedReport, unsetSelectedReport})(Report)\

import React, {useState} from 'react'
import Map from '../map/map'
import Modal from 'react-modal'

const ReportModal = (props) => {

    const [showModal, setShowModal] = useState(false)

    return(
        <div>
            <h2 className='grow' style={{color:'blue'}} onClick={()=> setShowModal(!showModal)}>{props.name}, the {props.breed}</h2>
            <p>on: {props.created}</p>
            <Modal
                isOpen={showModal}>
                {showModal ? <button onClick={()=>setShowModal(!showModal)}>Close Window</button> : null }
                {showModal ? <h2>{props.name}</h2> : null }
                {props.user.id === props.user_id ? <p>Reported by: You!</p> : <p>Reported by: {props.username}</p>}
                <p>Breed: {props.breed}</p>
                <p>Color: {props.color}</p>
                <p>Age: {props.age}</p>
                <p>Features: {props.features}</p>
                <p>Demeanor: {props.demeanor}</p>
                <img className="photo" src={props.photo.url}/>
                <p>Location:</p>
                <div>
                    < Map lat={props.lat} lng={props.lng}/>
                </div>
            </Modal>
        </div>
    )
}

export default ReportModal