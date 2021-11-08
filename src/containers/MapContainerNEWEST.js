import React, {useState, useEffect, useRef, ReactElement} from 'react'
import { connect, useDispatch } from 'react-redux'
import { GoogleMap, LoadScript, Marker, useJsApiLoader} from '@react-google-maps/api'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { getReports, toggleReportWindow } from '../actions/reports'
import { setCenter } from '../actions/map'
import { useNavigate } from 'react-router-dom'
import ReportButton from '../components/map/reportButton'

const MapContainer = (props) => {
    const navigate = useNavigate()
    const [ selectedMarker, setSelectedMarker] = useState('')
    const dispatch = useDispatch()

    // const { isLoaded, loadError } = useJsApiLoader({
    //     googleMapsApiKey: `${process.env.REACT_APP_B_API_KEY}`})
    // // const mapRef = useRef()
    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])

    useEffect(() => {
        dispatch(setCenter())
    }, [dispatch])
    // useEffect(() => {
    //     if (mapRef.current) {
    //         const { map, maps } = mapRef.current
    //     }
    // }, [mapRef])

    // const ref = React.useRef<HTMLDivElement>(null);
    // const [map, setMap] = React.useState<google.maps.Map>();

// React.useEffect(() => {
//   if (ref.current && !map) {
//     setMap(new window.google.maps.Map(ref.current, {}));
//   }
// }, [ref, map]);
const {id} = props;
    // const handleMarkerClick = (e) => {
    //     console.log(e)
    //     props.toggleReportWindow(id)
    // }
    
    // const handleReportButtonClick = () => {
    //     navigate('/reports/new')
    // }

    return (
        <LoadScript googleMapsApiKey='AIzaSyCfyDDNsU3qmztoaukDjC-RnII_poJXACk'>
        {(props.loading === false && props.mapLoading === false) ? 
            <GoogleMap
            mapContainerStyle={{height: '100vh', width: '100%'}}
            center={props.mapCoordinates.center}
            zoom={14}>
            {props.reports.map((report) => <Marker 
                key={report.id}
                position={{lat:report.lat, lng:report.lng}}
                {...report}
                onClick={(e)=>console.log(e)}
                {...props} />)}
                </GoogleMap>
        : <h2> Loading ...</h2>}
        </LoadScript>
        )
}

const mapStateToProps = (state) => ({
    reports: state.reports.reports,
    mapCoordinates: state.mapCoordinates,
    loading: state.reports.loading,
    mapLoading: state.mapCoordinates.loading,
})

export default connect(mapStateToProps, { getReports, toggleReportWindow, setCenter })(MapContainer)