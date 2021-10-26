import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { connect } from 'react-redux'
import { getReports } from '../actions/reports'
// this needs to account for the user changing their location
const Marker = ({ text }) => <div className="pin">{text}</div>

class MapContainer extends Component {

    componentDidMount(){
        this.props.getReports()
    }
    
    render(){

        return(
            <div style={{ height: '100vh', width: '100%', zIndex:0}}>
                {this.props.reports.loading === false ? 
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: '' }}
                    center={this.props.mapCoordinates.center}
                    defaultZoom={14}>
                    <Marker center={this.props.mapCoordinates.center} text="You are Here!"/>
                    {this.props.reports.reports.map((report) => <Marker key={report.attributes.id} lat={report.attributes.lat} lng={report.attributes.lng} text={report.attributes.name} />)}
                    </GoogleMapReact>
                : <h2> Loading ...</h2>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    reports: state.reports,
    mapCoordinates: state.mapCoordinates,
})

export default connect(mapStateToProps, { getReports })(MapContainer)