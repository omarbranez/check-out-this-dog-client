import React from 'react'
import Map from '../map/map'


const Report = (props) => {
    return(
        <div>
            <h2>{props.name}</h2>
            <div>
                <p>Breed: {props.breed}</p>
                <p>Color: {props.color}</p>
                <p>Age: {props.age}</p>
                <p>Features: {props.features}</p>
                <p>Demeanor: {props.demeanor}</p>
                <img className="photo" src={props.photo.url}/>
                <p>Location:</p>
                <div style={{display: "flex",justifyContent: "center", alignItems: "center"}}>
                    < Map lat={props.lat} lng={props.lng}/>
                </div>
            </div>
        </div>
    )
}

export default Report