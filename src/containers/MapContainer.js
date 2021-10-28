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
                {this.props.loading === false ? 
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_B_API_KEY}}
                    center={this.props.mapCoordinates.center}
                    defaultZoom={14}>
                    <Marker center={this.props.mapCoordinates.center} text="You are Here!"/>
                    {this.props.reports.map((report) => <Marker key={report.id} lat={report.lat} lng={report.lng} text={report.name} />)}
                    </GoogleMapReact>
                : <h2> Loading ...</h2>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    reports: state.reports.reports,
    mapCoordinates: state.mapCoordinates,
    loading: state.reports.loading,
})

export default connect(mapStateToProps, { getReports })(MapContainer)