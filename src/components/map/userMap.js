import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from '../../components/map/marker'

const UserMap = (props) => {
    const [ coordinates, setCoordinates ] = useState(null)

    const handleClick = (e) => {
        setCoordinates({lat: e.lat, lng: e.lng})
    }

    return(
        <div style={{ height: '200px', width: '200px' }}>
            {(props.mapLoading === false) ?
                <GoogleMapReact
                    bootstrapURLKeys={{ key: `${process.env.REACT_APP_B_API_KEY}` }}
                    center={props.mapCoordinates}
                    defaultZoom={14}
                    onClick={handleClick}
                    options={{fullscreenControl: false}}
                    >
                {coordinates && <Marker lat={coordinates.lat} lng={coordinates.lng} show={false}/>}
                </GoogleMapReact>
            : <h2>Loading</h2>}
        </div>
    )
}

export default UserMap