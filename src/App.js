// import './App.css';
import './marker.css'
// import { Route, Switch, Redirect } from 'react-router-dom'
import { Route, Routes, Navigate, useNavigate, Link } from 'react-router'
import { connect } from 'react-redux'
import { getReports } from './actions/reports'
import { setCenter } from './actions/map'
import { autoLoginUser, logoutUser } from './actions/user';
import React, { useEffect } from 'react'
import PrivateRoute from './containers/PrivateRoute'
import PrivateOutlet from './containers/PrivateOutlet'
import HomeContainer from './containers/HomeContainer'
import ProfileContainer from './containers/ProfileContainer';
import ReportsContainer from './containers/ReportsContainer';
import ReportForm from './components/report/reportForm'
import Report from './components/report/report'
import BreedsContainer from './containers/BreedsContainer';
import MapContainer from './containers/MapContainer'
import Navbar from './components/navbar'
import LoginForm from './components/auth/loginForm'
import SignupForm from './components/auth/signupForm'


const App = ({autoLoginUser, setCenter, user}) => {
// class App extends Component {

  const navigate = useNavigate()

  // componentDidMount(){
  //   localStorage.token && props.autoLoginUser()
  //   props.setCenter()
  // }

  useEffect(() => user && autoLoginUser() && setCenter(), [])
    // setCenter()

  const logout = (props) => {
    props.logoutUser()
    // return <Navigate replace to='/' push={true} message={"You have been logged out!"}/>
    navigate('/', {replace: true})
  }

    return (
     <div className="App">
          <Navbar />
          <Routes>
            {/* <Route exact path="/" component={HomeContainer}/> */}
            <Route path='/' element={<Navigate replace to='/welcome'/>}/>
            <Route path='/welcome' element={<HomeContainer/>}/>
            {/* <PrivateRoute exact path='/profile/:username' component={<ProfileContainer/>}/> */}
            <PrivateRoute path='/profile/:username' element={<ProfileContainer/>}/>
            {/* <Route path="/profile/:username" element={<PrivateOutlet/>}>
              <Route element={<ProfileContainer/>}/>
            </Route> */}
            <Route path='/map' element={<MapContainer/>}/>
            {/* <Route exact path="/reports" component={ReportsContainer}/> */}
            <Route path='/reports' exact element={<ReportsContainer/>}/>
            <PrivateRoute path='/reports/new' exact element={<ReportForm/>}/>
            <Route path='/reports/:reportId' element={<Report/>}/>
            {/* <Route exact path="/reports/new" component={ReportForm}/> */}
            {/* <PrivateRoute exact path='/reports/new' component={ReportForm} /> */}
            <Route path='/breeds' element={<BreedsContainer/>}/>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/signup' element={<SignupForm/>}/>
            <Route path='/logout' render={logout}/>
          </Routes>
    </div>
    );
  }

const mapStateToProps = (state) => {
  return {user: state.user}
}
export default connect(mapStateToProps, {getReports, setCenter, autoLoginUser, logoutUser })(App);