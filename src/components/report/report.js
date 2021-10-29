import React, {useState} from 'react'
import Map from '../map/map'
import Modal from 'react-modal'

const Report = (props) => {

    const [showModal, setShowModal] = useState(false)

    return(
        <div>
            <h2 className='grow' style={{color:'blue'}} onClick={()=> setShowModal(!showModal)}>{props.name}</h2>
            <Modal
                isOpen={showModal}>
                {showModal ? <button onClick={()=>setShowModal(!showModal)}>Close Window</button> : null }
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

export default Report