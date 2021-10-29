import React from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './marker'

const Map = (props) => {
    const {lat, lng} = props
    return(
        <div style={{ height: '200px', width: '200px', display: "flex", justifyContent: "center", alignItems: "center"}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: `${process.env.REACT_APP_B_API_KEY}`}}
                center={[lat, lng]}
                zoom={13}>
                <Marker lat={lat} lng={lng}/>
            </GoogleMapReact>
        </div>
    )
}

export default Map