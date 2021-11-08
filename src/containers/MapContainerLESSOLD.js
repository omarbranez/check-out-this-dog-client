import React, {useState, useEffect} from 'react'
import { connect, useDispatch } from 'react-redux'
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { getReports, toggleReportWindow } from '../actions/reports'
import { setCenter } from '../actions/map'
// import Marker from '../components/map/marker'
import ReportButton from '../components/map/reportButton'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'

const MapContainer = (props) => {
    const navigate = useNavigate()
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(14)
    const dispatch = useDispatch()
    const mapRef = useRef()
    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])

    useEffect(() => {
        dispatch(setCenter())
    }, [dispatch])

    useEffect(() => {
        if (mapRef.current) {
            const { map, maps } = mapRef.current
        }
    }, [mapRef])
   
    const handleMarkerClick = (e) => {
        console.log(e)
        props.toggleReportWindow(e)
    }
    
    const handleReportButtonClick = () => {
        navigate('/reports/new')
    }

    return(
        <Map 
            google={props.google} 
            ref={mapRef}
            defaultZoom={14}
            defaultCenter={props.mapCoordinates.center}
            defaultOptions={{fullscreenControl: false}}>
            {props.reports.map((report) => <Marker 
                onClick={handleMarkerClick} 
                key={report.id} 
                lat={report.lat} 
                lng={report.lng} 
                text={report.name} 
                show={report.show} 
                breed={report.breed} 
                timeCreated={report.time_created} 
                name={report.name} />)}
            <InfoWindow onClose={onInfoWindowClose}>
                <div>
                    <h1>
                    {props.report.name}
                    </h1>
                </div>
            </InfoWindow>
        </Map>
    )
}

const mapStateToProps = (state) => ({
    reports: state.reports.reports,
    mapCoordinates: state.mapCoordinates,
    loading: state.reports.loading,
    mapLoading: state.mapCoordinates.loading,
})

export default GoogleApiWrapper({apiKey: `${process.env.REACT_APP_B_API_KEY}` })(connect(mapStateToProps, { getReports, toggleReportWindow, setCenter, })(MapContainer))
