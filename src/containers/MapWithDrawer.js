import React, { useState, useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react/'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { connect, useDispatch } from 'react-redux'
import { getReports, toggleReportWindow } from '../actions/reports'
import { setGeolocatedCenter, resetCenter } from '../actions/map'
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
    }
    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
      const handleListItemClick = (id) => {
          console.log(`${id} was clicked`)
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
                                bounds.nw.lng,
                                bounds.se.lat,
                                bounds.se.lng,
                                bounds.nw.lat
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
                        {props.reports.map((report, index) => (
                            <ListItem button key={report.id} >
                                <ListItemAvatar>
                                    <Avatar alt={report.breed} src={`dog-icons/${report.breed}.png`} variant="square" sx={{ width: [null, null, 36] }} />
                                </ListItemAvatar>
                                <ListItemText primary={report.breed} secondary={report.name} onClick={(e) => handleListItemClick(report.id)}>

                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
        </div>
    
  return props.loading === false && props.currentCenter ? !props.geolocating ? renderMap() : <LoadingSpinner text={"Locating"}/> : <LoadingSpinner text={"Loading"}/>

  
}

const mapStateToProps = (state) => ({
    reports: state.reports.reports,
    userCenter: state.user.defaultCenter,
    currentCenter: state.user.currentCenter,
    geolocating: state.user.geolocating,
    loading: state.reports.loading,
    
})

export default connect(mapStateToProps, { getReports, toggleReportWindow, setGeolocatedCenter, resetCenter })(MapContainer)