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
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'

const MapContainer = (props) => {

    const navigate = useNavigate()
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(15)

    const dispatch = useDispatch()
    const mapRef = useRef()

    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(setCenter())
    // }, [dispatch])
    

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

    const handleCurrentLocationClick = () => {
        props.setCenter()
    }

    const handleDefaultLocationClick = () => {
        props.resetCenter()
    }

    const handleOnLoad = ({ map, maps }) => {
        mapRef.current = { map, maps }
        const controlButtonDiv = document.createElement('div')
        controlButtonDiv.addEventListener('click', () => { handleReportButtonClick() })
        ReactDOM.render(<ReportButton />, controlButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(controlButtonDiv)
        const currentLocationButtonDiv = document.createElement('div')
        currentLocationButtonDiv.addEventListener('click', () => { handleCurrentLocationClick() })
        ReactDOM.render(<CurrentLocationButton />, currentLocationButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(currentLocationButtonDiv)

        const defaultLocationButtonDiv = document.createElement('div')
        defaultLocationButtonDiv.addEventListener('click', () => { handleDefaultLocationClick() })
        ReactDOM.render(<DefaultLocationButton />, defaultLocationButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(defaultLocationButtonDiv)
        // mapRef.current = { map, maps }
        const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const markers = props.reports && props.reports.map((report, i) => {
            const lat = report.lat
            const lng = report.lng
            const location = { lat, lng }
            // console.log(location)
            // console.log(maps.Marker)
            return new maps.Marker({position: location, label: labels[i % labels.length]})
        })
        // console.log(markers)
        new MarkerClusterer({map, markers})
        // const infoWindow = new google
        // console.log(mapRef.current.maps)
    }

    // const markers = props.reports && props.reports.map(report => {
    //     const location = { lat:report.lat, lng:report.lng, }

    // })
    // const markerCluster = new MarkerClusterer(map, markers, {
    //     imagePath: './img/m1',
    //     gridSize: 30,
    //     minimumClusterSize: 3 
    // })




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
                    onChildClick={handleMarkerClick}>
                        {/* // {filteredMarkers.map((report) => <Marker  */}
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
            : <h2> Loading ...</h2>
        }
        </div>
    )
}

const mapStateToProps = (state) => ({
    reports: state.reports.reports,
    userCenter: state.user.defaultCenter,
    currentCenter: state.user.currentCenter,
    loading: state.reports.loading,
})

export default connect(mapStateToProps, { getReports, toggleReportWindow, setCenter, resetCenter })(MapContainer)