import React, { useState, useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react/'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { connect, useDispatch, useSelector } from 'react-redux'
import { getReports, toggleReportWindow } from '../actions/reports'
import { setGeolocatedCenter, resetCenter, setMarkerCenter } from '../actions/map'
// this needs to account for the user changing their location
import Marker from '../components/map/marker'
import ReportButton from '../components/map/reportButton'
import CurrentLocationButton from '../components/map/currentLocationButton'
import DefaultLocationButton from '../components/map/defaultLocationButton'
import LoadingSpinner from '../components/map/loadingSpinner'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'

import { styled, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(1),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      }),
    }),
  );
  
//   const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open',
//   })(({ theme, open }) => ({
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//       width: `calc(100% - ${drawerWidth}px)`,
//       transition: theme.transitions.create(['margin', 'width'], {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginRight: drawerWidth,
//     }),
//   }));
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

const MapContainer = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const center = useRef()
    const mapRef = useRef()
    const theme = useTheme();
    
    const [open, setOpen] = useState(false);
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(15)
    const [filteredReports, setFilteredReports] = useState(null)

    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])

    useEffect(() => {
        center.current = props.currentCenter
        return resetCenter
    }, [center,resetCenter, props.currentCenter])

    useEffect(() => {
        if (mapRef.current) {
            const { map, maps } = mapRef.current
        }
    }, [mapRef])

    const filterReports = (reports, bounds) => {
        setFilteredReports(reports.filter(report => inBoundingBox(bounds[0], bounds[1], report.lat, report.lng)))
    }

    useEffect(() => {
        filterReports(props.reports, bounds)
    }, [bounds])

    console.log(bounds)
    console.log(zoom)
    console.log(filteredReports)

    const handleOnLoad = ({ map, maps }) => { // this is the only way to add controls to google maps api
        mapRef.current = { map, maps }
        const controlButtonDiv = document.createElement('div')
        controlButtonDiv.addEventListener('click', () => { navigate('/reports/new') })
        ReactDOM.render(<ReportButton />, controlButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(controlButtonDiv)

        const currentLocationButtonDiv = document.createElement('div')
        currentLocationButtonDiv.addEventListener('click', () => { props.setGeolocatedCenter() })
        ReactDOM.render(<CurrentLocationButton />, currentLocationButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(currentLocationButtonDiv)

        const defaultLocationButtonDiv = document.createElement('div')
        defaultLocationButtonDiv.addEventListener('click', () => { props.resetCenter() })
        ReactDOM.render(<DefaultLocationButton />, defaultLocationButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(defaultLocationButtonDiv)

        const openListButtonDiv = document.createElement('div')
        openListButtonDiv.addEventListener('click', handleDrawerOpen)
        ReactDOM.render(<IconButton sx={{ ...(open && { display: 'none' }) }}  color="inherit"
        aria-label="open drawer"
        edge="end">   <MenuIcon /></IconButton>, openListButtonDiv)
        map.controls[maps.ControlPosition.TOP_RIGHT].push(openListButtonDiv)

        const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const markers = props.reports && props.reports.map((report, i) => {
            const lat = report.lat
            const lng = report.lng
            const location = { lat, lng }
            return new maps.Marker({position: location, label: labels[i % labels.length]})
        })
        
        new MarkerClusterer({map, markers})
        const boundsFilter = (lat, lng) => {
            const filter = new mapRef.current.maps.LatLngBounds(bounds[5], bounds[4])
            if (filter.contains({lat: lat, lng: lng})){
                return true
            } else {
                return false
            }
        }
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleListItemClick = (lat, lng) => {
        console.log(handleOnLoad(lat, lng))
        props.setMarkerCenter(lat, lng)
    }
    
    const inBoundingBox = (sw, ne, rLat, rLng) => {
        if (sw && ne && rLat && rLng) { 
        let isLngInRange
        if (ne.lng < sw.lng) {
            isLngInRange = rLng >= sw.lng || rLng <= ne.lng
        } else {
            isLngInRange = rLng >= sw.lng && rLng <= ne.lng
        }
        return (
            rLat >= sw.lat && rLat <= ne.lat && isLngInRange
        )
        } else {
            return false
        }
    }
    
    // const filteredReports = () => { props.reports && props.reports.filter(report => inBoundingBox(bounds[0], bounds[1], report.lat, report.lng))}
    // const filterReports = () => {
    //     setFilteredReports(props.reports.filter(report => inBoundingBox(props.bounds.sw, props.bounds.ne, report.lat, report.lng)))
    // }
    // console.log(filteredReports)
    const renderMap = () => 
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Main open={open} sx={{ height: [null, null, 700], zIndex: 1 }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: `${process.env.REACT_APP_B_API_KEY}` }}
                        center={props.currentCenter}
                        defaultZoom={15}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={handleOnLoad}
                        onChange={({ zoom, bounds }) => {
                            setZoom(zoom)
                            setBounds([
                                bounds.sw,
                                bounds.ne,
                            ])
                        }}
                        options={{ fullscreenControl: false }}
                        onChildClick={(e) => { props.toggleReportWindow(e) }}>
                        {props.geolocating ? <LoadingSpinner text={"Locating"} /> : null}
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
                </Main>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                        },
                    }}
                    variant="persistent"
                    anchor="right"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List >
                        {/* {props.reports.map((report, index) => ( */}
                        {filteredReports.length > 0 ? filteredReports.map((report, index) => (
                            <ListItem button key={report.id} >
                                <ListItemAvatar>
                                    <Avatar alt={report.breed} src={`dog-icons/${report.breed}.png`} variant="square" sx={{ width: [null, null, 36] }} />
                                </ListItemAvatar>
                                <ListItemText primary={report.breed} secondary={report.name} onClick={(e) => handleListItemClick(report.lat, report.lng)}>

                                </ListItemText>
                            </ListItem>
                        )) : <ListItem>
                                <ListItemText primary="No Reports Found Here. Zoom Out or Pan Around to See More!"></ListItemText>
                            </ListItem>}
                    </List>
                </Drawer>
            </Box>
        </div>
    
  return props.loading === false && props.currentCenter ? !props.geolocating ? renderMap() : <LoadingSpinner text={"Locating"}/> : <LoadingSpinner text={"Loading"}/>

  
}

const mapStateToProps = (state) => {
    // const inBoundingBox = (sw, ne, rLat, rLng) => {
    //     debugger
    //     let isLngInRange
    //     if (ne.lng < sw.lng) {
    //         isLngInRange = rLng >= sw.lng || rLng <= ne.lng
    //     } else {
    //         isLngInRange = rLng >= sw.lng && rLng <= ne.lng
    //     }
    //     return (
    //         rLat >= sw.lat && rLat <= ne.lat && isLngInRange
    //     )
    // }
    // const filteredReports = state.reports.reports && state.reports.reports.filter(report => inBoundingBox(state.user.bounds.sw, state.user.bounds.ne, report.lat, report.lng))

    return {
    // filteredReports, 
    reports: state.reports.reports,
    userCenter: state.user.defaultCenter,
    currentCenter: state.user.currentCenter,
    geolocating: state.user.geolocating,
    loading: state.reports.loading,
    bounds: state.user.bounds
    }
}

export default connect(mapStateToProps, { getReports, toggleReportWindow, setGeolocatedCenter, setMarkerCenter, resetCenter })(MapContainer)