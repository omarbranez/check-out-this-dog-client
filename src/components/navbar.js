import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Icon from "@mui/material/Icon";
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoginIcon from '@mui/icons-material/Login';
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import AnnouncementSharpIcon from '@mui/icons-material/AnnouncementSharp';
import PetsSharpIcon from '@mui/icons-material/PetsSharp';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';


const drawerWidth = 240;


{/* <div>
    < Link to="/"><button>Home</button>  </Link>
    {isUserLoggedIn() ? < Link to={"/profile/"+`${username}`}><button variant="contained" >{username}'s Profile</button></Link> : null}
    {isUserLoggedIn() ? < Link to="/reports/new"><button variant="contained" >New Report</button></Link> : null}
    < Link to="/map"><button variant="contained" >Map</button></Link>
    < Link to="/reports"><button variant="contained" >News Feed</button></Link>
    {isUserLoggedIn() ? null : < Link to="/login"><button variant="contained" >Log In </button></Link>}
    {isUserLoggedIn() ? null : < Link to="/signup"><button variant="contained" >Sign Up</button></Link>}
    < Link to="/breeds"><button variant="contained" >Breed Guide</button></Link>
    {isUserLoggedIn() ? < Link to="/logout"><button variant="contained">Log Out</button></Link> : null }
</div> */}


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        //    vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Navbar = (props) => {
    
    const username = props.user
    const linkRoutesAndIcons = [
        {
            path: "/map",
            text: "Map",
            icon: <MapTwoToneIcon/>
        },
        {
            path: "/reports",
            text: "News Feed",
            icon: <AnnouncementSharpIcon/>
        },
        {
            path: "breeds",
            text: "Breed Information",
            icon: <PetsSharpIcon/>
        },
        {
            path: "reports/new",
            text: "Create New Report",
            icon: <AddBoxOutlinedIcon/>
        }
    ]

    const loggedInRoutesAndIcons = [
        {
            path: `/profile/${username}`,
            text: "My Profile",
            icon: <AccountBoxOutlinedIcon/>
        },
        {
            path: "/logout",
            text: "Log Out",
            icon: <ExitToAppOutlinedIcon/>
        },
    ]

    const loggedOutRoutesAndIcons = [
        {
            path: '/login',
            text: "Log In",
            icon: <LoginIcon/>
        },
        {
            path: '/signup',
            text: "Create New Account",
            icon: <FiberNewOutlinedIcon/>
        }
    ]


    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    return (
        <div>
            <Box sx={{ display: 'flex'}}>
                <CssBaseline />
                <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' })  }}
                        >
                            <img src='./muttmap-menu-icon.png' width="40"></img>
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <img src='./muttmap-text.png' height="45"></img> 
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
                <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
      >
            {/* this is covered by the app bar */}
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}> 
            <img src='./muttmap-menu-icon-open.png' width="50"></img>
          </IconButton>
        </DrawerHeader>
          {/* this is covered by the app bar */}
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}> 
            <img src='./muttmap-menu-icon-open.png' width="50"></img>
          </IconButton>
        </DrawerHeader>
        <Divider />
        {username ? 
        <List>
            {linkRoutesAndIcons.map((route) => (
            <Link to={route.path}>
            <ListItem button key={route.text} onClick={handleDrawerClose}>
              <ListItemIcon>
                  {route.icon}
              </ListItemIcon>
              <ListItemText primary={route.text} />
            </ListItem>
            </Link>
          ))}
        </List>
        :
        <List>
            {loggedOutRoutesAndIcons.map((route) => (
             <Link to={route.path}>
            <ListItem button key={route.text} onClick={handleDrawerClose}>
              <ListItemIcon>
                  {route.icon}
              </ListItemIcon>
              <ListItemText primary={route.text} />
            </ListItem>
            </Link>
            ))}
        </List>
        }

        <Divider />
        {username &&
        <List>
          {/* {['My Profile', 'Logout'].map((text, index) => ( */}
          {loggedInRoutesAndIcons.map((route) => (
              <Link to={route.path}>
              <ListItem button key={route.text} onClick={handleDrawerClose}>
                <ListItemIcon>
                    {route.icon}
                </ListItemIcon>
                <ListItemText primary={route.text} />
              </ListItem>
              </Link>
          ))}
        </List>
        }
      </Drawer>
            </Box>
        </div>
    );
}



const mapStateToProps = (state) => ({
    user: state.user.username
})

export default connect(mapStateToProps)(Navbar)