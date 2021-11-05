import React, { useState, useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react'
import { connect, useDispatch } from 'react-redux'
import { getReports, toggleReportWindow } from '../actions/reports'
import { setCenter } from '../actions/map'
// this needs to account for the user changing their location
import Marker from '../components/map/marker'
import ReportButton from '../components/map/reportButton'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'

const MapContainer = (props) => {

    const navigate = useNavigate()
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(14)
    const dispatch = useDispatch()

    const mapRef = useRef()
   
    const handleMarkerClick = (e) => {
        console.log(e)
        props.toggleReportWindow(e)
    }
    
    const handleReportButtonClick = () => {
        navigate('/reports/new')
    }

    const handleOnLoad = (map,maps) => {
        const controlButtonDiv = document.createElement('div')
        controlButtonDiv.addEventListener('click', () => { handleReportButtonClick() })
        ReactDOM.render(<ReportButton />, controlButtonDiv)
        map.controls[maps.ControlPosition.RIGHT_BOTTOM].push(controlButtonDiv)
    }

    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])

    useEffect(() => {
        dispatch(setCenter())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getFilteredReports())
    // }, [dispatch])
    

    // const filterMarkersByBounds = () => {
    //     if (props.reports) {
    //         const filteredMarkers = props.reports.filter( report => {
    //             if ( report.lat > bounds.se.lat && bounds.sw.lat && 
    //                 (report.lat < bounds.ne.lat && bounds.nw.lat) && 
    //                 (report.lng > bounds.nw.lng && bounds.sw.lng) && 
    //                 (report.lng < bounds.ne.lng && bounds.se.lng)
    //             ) { 
    //                 return report
    //             }
    //         })
    //     }
    // }

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
                    onChildMouseEnter={console.log("INSIDE A MARKER")}
                    onChildMouseLeave={console.log("LEAVING MARKER")}
                    onChildClick={handleMarkerClick}>
                    {props.reports.map((report) => <Marker 
                    // {/* {filteredMarkers.map((report) => <Marker  */}
                        key={report.id} 
                        lat={report.lat} 
                        lng={report.lng} 
                        text={report.name} 
                        show={report.show} 
                        breed={report.breed} 
                        timeCreated={report.time_created} 
                        name={report.name} />)}
                </GoogleMapReact>
            : <h2> Loading ...</h2>
        }
        </div>
    )
    {/* <Marker center={props.mapCoordinates.center} text="You are Here!"/> */}
}

const mapStateToProps = (state) => ({
    reports: state.reports.reports,
    mapCoordinates: state.mapCoordinates,
    loading: state.reports.loading,
    mapLoading: state.mapCoordinates.loading,
})

export default connect(mapStateToProps, { getReports, toggleReportWindow, setCenter })(MapContainer)