import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setMarkerCenter } from '../../actions/map'
import InfoWindow from './infoWindow'

import '../../marker.css'

const Marker = (props) => {
  // console.log(props)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  const handleMarkerClick = () => {
    console.log('marker clicked')
    dispatch(setMarkerCenter(props.lat, props.lng))
  }
  // const handleClick = (e) => {
  //   console.log("Currently Clicked Marker ID is " + e)
  //   navigate(`/reports/${e}`)
  // }
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleMarkerClick}>
      <img src={process.env.PUBLIC_URL + "/location-pin.png"}
        height={hovered ? "80rem" : "60rem"}
        style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}>
      </img>
      {props.show === true ? <InfoWindow key={props.id} report={props} clickable={true}/> : null}
      {/* <img src="./location-pin.png"></img> */}
    </div>
    // <img src=
  )
}
export default Marker
