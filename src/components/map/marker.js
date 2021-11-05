import React, {useState} from 'react'
import InfoWindow from './infoWindow'

import '../../marker.css'

const Marker = (props) => {
  // console.log(props)
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
         {/* style={{ 
          backgroundColor: props.show ? 'red' : 'blue',}}
          > */}
            {/* // className="pin bounce" 
            // style={{
            // border: '1px solid white',
            // borderRadius: '50%',
            // height: 10,
            // width: 10,
            // cursor: 'pointer',
            // zIndex: 10,}}> */}
            <img src={process.env.PUBLIC_URL + "/location-pin.png"}
              height= { hovered ? "80rem" : "60rem" }
              style={{position: 'absolute', transform: 'translate(-50%, -100%)'}}>
            </img> 
            { props.show === true ? <InfoWindow report={props}/> : null}
           {/* <img src="./location-pin.png"></img> */}
        </div>
        // <img src=
    )
}
export default Marker
