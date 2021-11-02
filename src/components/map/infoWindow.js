import React from 'react'

const InfoWindow = (props) => {
    console.log(props)
    const infoWindowStyle = {
        position: 'relative',
        bottom: 150,
        left: '-45px',
        width: 220,
        backgroundColor: 'white',
        boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
        padding: 10,
        fontSize: 14,
        zIndex: 100,
    }
    
    return (
        <div style={infoWindowStyle}>
          <div style={{ fontSize: 16 }}>
            {props.report.name}
          </div>
          <div style={{ fontSize: 14, color: 'grey' }}>
            {props.report.breed}
          </div>
          <div style={{ fontSize: 14, color: 'grey' }}>
            {props.report.timeCreated}
          </div>
        </div>
      )
}

export default InfoWindow