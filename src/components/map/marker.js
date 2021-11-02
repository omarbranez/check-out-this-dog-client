import React from 'react'
import InfoWindow from './infoWindow'

const Marker = (props) => {
  // console.log(props)
    return (
        <div className="pin" style={{
            border: '1px solid white',
            borderRadius: '50%',
            height: 10,
            width: 10,
            backgroundColor: props.show ? 'red' : 'blue',
            cursor: 'pointer',
            zIndex: 10,}}>
            { props.show === true ? <InfoWindow report={props}/> : null}
        </div>
    )
}
export default Marker
