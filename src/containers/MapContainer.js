import React, { useState, useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react/'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { connect, useDispatch } from 'react-redux'
import { getReports, toggleReportWindow } from '../actions/reports'
import { setCenter, resetCenter } from '../actions/map'
// this needs to account for the user changing their location
import Marker from '../components/map/marker'
import ReportButton from '../components/map/reportButton'
import CurrentLocationButton from '../components/map/currentLocationButton'
import DefaultLocationButton from '../components/map/defaultLocationButton'
import LoadingSpinner from '../components/map/loadingSpinner'
import Box from '@mui/material/Box';
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'

const MapContainer = (props) => {
    const center = useRef()
    const navigate = useNavigate()
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(15)
    const dispatch = useDispatch()
    const mapRef = useRef()

    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])

    useEffect(() => {
        resetCenter()
    })
    useEffect(() => {
        center.current = props.currentCenter
        return resetCenter
    }, [center,resetCenter, props.currentCenter])

    useEffect(() => {
        if (mapRef.current) {
            const { map, maps } = mapRef.current
        }
    }, [mapRef])

    const handleOnLoad = ({ map, maps }) => {
        mapRef.current = { map, maps }

        const controlButtonDiv = document.createElement('div')
        controlButtonDiv.addEventListener('click', () => { navigate('/reports/new') })
        ReactDOM.render(<ReportButton />, controlButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(controlButtonDiv)

        const currentLocationButtonDiv = document.createElement('div')
        currentLocationButtonDiv.addEventListener('click', () => { props.setCenter() })
        ReactDOM.render(<CurrentLocationButton />, currentLocationButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(currentLocationButtonDiv)

        const defaultLocationButtonDiv = document.createElement('div')
        defaultLocationButtonDiv.addEventListener('click', () => { props.resetCenter() })
        ReactDOM.render(<DefaultLocationButton />, defaultLocationButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(defaultLocationButtonDiv)

        const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const markers = props.reports && props.reports.map((report, i) => {
            const lat = report.lat
            const lng = report.lng
            const location = { lat, lng }
            return new maps.Marker({position: location, label: labels[i % labels.length]})
        })

        new MarkerClusterer({map, markers})
    }

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
    const handleOnChildMouseEnter = () => {

    }

    return (
        <div style={{ height: '100vh', width: '100%', zIndex: 0 }}>
            {(props.loading === false && props.currentCenter) ?
                <GoogleMapReact
                    bootstrapURLKeys={{ key: `${process.env.REACT_APP_B_API_KEY}` }}
                    center={props.currentCenter}
                    defaultZoom={15}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={handleOnLoad}
                    onChange={({ zoom, bounds }) => {
                        setZoom(zoom)
                        setBounds([
                            bounds.nw.lng,
                            bounds.se.lat,
                            bounds.se.lng,
                            bounds.nw.lat
                        ])
                    }}
                    options={{fullscreenControl:false}}
                    onChildClick={(e) => {props.toggleReportWindow(e)}}>
                        {/* // {filteredMarkers.map((report) => <Marker  */}
                    {props.geolocating ? <LoadingSpinner text={"Locating"}/>: null }
                    {props.reports.map((report) => <Marker 
                        id={report.id}
                        key={report.id} 
                        lat={report.lat} 
                        lng={report.lng} 
                        text={report.name} 
                        show={report.show} 
                        breed={report.breed} 
                        timeCreated={report.time_created} 
                        name={report.name} />)}
                </GoogleMapReact>
            : <LoadingSpinner text={"Loading"}/> 
        }
        </div>
    )
}

const mapStateToProps = (state) => ({
    reports: state.reports.reports,
    userCenter: state.user.defaultCenter,
    currentCenter: state.user.currentCenter,
    geolocating: state.user.geolocating,
    loading: state.reports.loading,
    
})

export default connect(mapStateToProps, { getReports, toggleReportWindow, setCenter, resetCenter })(MapContainer)