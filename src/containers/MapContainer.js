import React, { useState, useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react'
import { connect, useDispatch } from 'react-redux'
import { getReports, toggleReportWindow } from '../actions/reports'
// this needs to account for the user changing their location
// const Marker = ({ text }) => <div className="pin">{text}</div>
import Marker from '../components/map/marker'
import ReportButton from '../components/report/reportButton'
import ReactDOM from 'react-dom'
const MapContainer = (props) => {

    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(14)
    const dispatch = useDispatch()
    const mapRef = useRef()
   
    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])
    
    const handleMarkerClick = (e) => {
        // debugger
        props.toggleReportWindow(e)
    }

    const handleOnLoad = (map,maps) => {
        const controlButtonDiv = document.createElement('div')
        // controlButtonDiv.className += 'reportButton'
        ReactDOM.render(<ReportButton onClick={() => console.log('hi')} />, controlButtonDiv)
        map.controls[maps.ControlPosition.RIGHT_BOTTOM].push(controlButtonDiv)
      }

    return (
        <div style={{ height: '100vh', width: '100%', zIndex: 0 }}>
            {(props.loading === false && props.mapLoading === false) ?
                <GoogleMapReact
                    bootstrapURLKeys={{ key: `${process.env.REACT_APP_B_API_KEY}` }}
                    center={props.mapCoordinates.center}
                    defaultZoom={14}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => {
                        mapRef.current = map
                        handleOnLoad(map, maps)
                    }}
                    onChange={({ zoom, bounds }) => {
                        setZoom(zoom)
                        setBounds([
                            bounds.nw.lng,
                            bounds.se.lat,
                            bounds.se.lng,
                            bounds.nw.lat
                        ])
                    }}
                    onChildClick={handleMarkerClick}
                >
                    {/* <Marker center={props.mapCoordinates.center} text="You are Here!"/> */}
                    {props.reports.map((report) => <Marker key={report.id} lat={report.lat} lng={report.lng} text={report.name} show={report.show} breed={report.breed} timeCreated={report.time_created} name={report.name} />)}
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

export default connect(mapStateToProps, { getReports, toggleReportWindow })(MapContainer)