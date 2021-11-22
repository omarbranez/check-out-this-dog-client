import React from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { toggleReportWindow } from '../../actions/reports'

const InfoWindow = (props) => {
    // console.log(props)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log(props)
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

    const handleClick = () => {
      console.log(props.report.id)
      // props.clickable && 
      navigate(`/reports/${props.report.id}`)
    }
    // console.log(props.report.id)
  
    return (
        <div style={infoWindowStyle} id={props.report.id}>
          <div>
            <button onClick={()=> dispatch(toggleReportWindow(props.report.id))}>X</button>
          </div>
          <div style={{ fontSize: 16 }}>
            {props.report.name}
          </div>
          <div style={{ fontSize: 14, color: 'grey' }}>
            {props.report.breed}
          </div>
          <div style={{ fontSize: 14, color: 'grey' }}>
            {props.report.timeCreated}
          </div>
          <button onClick={handleClick}>Click to see Report Details</button>
        </div>
      )
}

export default InfoWindow