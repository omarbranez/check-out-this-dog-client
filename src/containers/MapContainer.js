import React, { Component} from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>;


class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            center: {
                lat: '',
                lng: '',
            }
        }
    }
  
    defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11,
        isMarkerShown: true,
      };

   componentDidMount(){
        navigator.geolocation.getCurrentPosition(position =>  {
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
            // return position
            // return {lat: position.coords.latitude, lng: position.coords.longitude }
            this.setState({
                center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                }
            })
        })
        // debugger
    }
    
    
    // componentDidMount(){
    //    this.getCurrentLocation()
    // }

    
    render(){
        // debugger
        return(
            <div style={{ height: '100vh', width: '100%', zIndex:8}}>
                <GoogleMapReact 
                bootstrapURLKeys={{ key: ''}}
                defaultCenter={this.defaultProps.center}
                center={this.state.center}
                defaultZoom={15}
                >
                <AnyReactComponent
          lat={this.state.center.lat}
          lng={this.state.center.lng}
          text="My Marker"
          
        />
                </GoogleMapReact>
            </div>
        )
    }
}

export default React.memo(MapContainer)