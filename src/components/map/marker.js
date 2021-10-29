import React from 'react'

const Marker = (props) => {
    // debugger
    // const {name, lng, lat} = props
    console.log(props)
    return (
        <div className="pin" style={{zIndex: 2}}>
            <p>Here!</p>
        </div>
    )
}
export default Marker
