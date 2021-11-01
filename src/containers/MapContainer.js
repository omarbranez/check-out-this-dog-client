import React, { useState, useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react'
import { connect, useDispatch } from 'react-redux'
import { getReports } from '../actions/reports'
// this needs to account for the user changing their location
const Marker = ({ text }) => <div className="pin">{text}</div>
// import Marker from '../components/map/marker'

// class MapContainer extends Component {
const MapContainer = (props) => {

    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(14);
    const dispatch = useDispatch()
    const mapRef = useRef()
    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])
    
    return (
        <div style={{ height: '100vh', width: '100%', zIndex: 0 }}>
            {(props.loading === false && props.mapLoading === false) ?
                <GoogleMapReact
                    bootstrapURLKeys={{ key: `${process.env.REACT_APP_B_API_KEY}` }}
                    center={props.mapCoordinates.center}
                    defaultZoom={14}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map }) => {
                        mapRef.current = map
                    }}
                    onChange={({ zoom, bounds }) => {
                        setZoom(zoom);
                        setBounds([
                            bounds.nw.lng,
                            bounds.se.lat,
                            bounds.se.lng,
                            bounds.nw.lat
                        ]);
                    }}
                >
                    {/* <Marker center={props.mapCoordinates.center} text="You are Here!"/> */}
                    {props.reports.map((report) => <Marker key={report.id} lat={report.lat} lng={report.lng} text={report.name} />)}
                </GoogleMapReact>
                : <h2> Loading ...</h2>
            }
        </div>
    )
}


const mapStateToProps = (state) => ({
    reports: state.reports.reports,
    mapCoordinates: state.mapCoordinates,
    loading: state.reports.loading,
    mapLoading: state.mapCoordinates.loading,
})

export default connect(mapStateToProps, { getReports })(MapContainer)