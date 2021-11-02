import React, { useState, useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react'
import { connect, useDispatch } from 'react-redux'
import { getReports, toggleReportWindow } from '../actions/reports'
// this needs to account for the user changing their location
import Marker from '../components/map/marker'
import ReportButton from '../components/map/reportButton'
import ReactDOM from 'react-dom'
import { withRouter, useHistory } from 'react-router-dom'

const MapContainer = (props) => {
    const history = useHistory()
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(14)
    const dispatch = useDispatch()
    const mapRef = useRef()
   
    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])
    
    const handleMarkerClick = (e) => {
        props.toggleReportWindow(e)
    }

    const handleReportButtonClick = () => {
        history.push('/reports/new')
    }
    const handleOnLoad = (map,maps) => {
        const controlButtonDiv = document.createElement('div')
        controlButtonDiv.addEventListener('click', () => { handleReportButtonClick() })
        ReactDOM.render(<ReportButton />, controlButtonDiv)
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

export default connect(mapStateToProps, { getReports, toggleReportWindow })(withRouter(MapContainer))