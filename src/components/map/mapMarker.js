import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setMarkerCenter } from '../../actions/mapActions'
import MapInfoWindow from './mapInfoWindow'

import '../../marker.css'

const MapMarker = (props) => {
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

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleMarkerClick}>
      {props.show === true ? <MapInfoWindow key={props.id} report={props} clickable={true}/> : null}
    </div>

  )
}
export default MapMarker
