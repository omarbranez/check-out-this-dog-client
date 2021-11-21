import './marker.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { getReports } from './actions/reports'
import { setGeolocatedCenter } from './actions/map'
import { autoLoginUser, logoutUser } from './actions/user';
import React, { useEffect } from 'react'
import PrivateRoute from './containers/PrivateRoute'
import HomeContainer from './containers/HomeContainer'
import ProfileContainer from './containers/ProfileContainer';
import ReportsContainer from './containers/ReportsContainer';
import ReportForm from './components/report/reportForm'
import Report from './components/report/report'
import BreedsContainer from './containers/BreedsContainer';
import Navbar from './components/navbar'
import LoginForm from './components/auth/loginForm'
import LoginSuccess from './components/home/login'
import SignupForm from './components/auth/signupForm'
import LogoutPage from './components/home/logout'
import MapWithDrawer from './containers/MapWithDrawer'

const App = ({autoLoginUser, user}) => {
  
  function isEmpty(str) {
    return (!str || str.length === 0 );
  }
  console.log(isEmpty(user.username))
  console.log(user)
  useEffect(() => !isEmpty(user.username) && autoLoginUser(), [])  

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate replace to='/welcome' />} />
        <Route path='/welcome' element={<HomeContainer />} />
        <PrivateRoute path='/profile/:username' element={<ProfileContainer />} />
        <Route path='/reports' exact element={<ReportsContainer />} />
        <PrivateRoute path='/reports/new' exact element={<ReportForm />} />
        <Route path='/reports/:reportId' element={<Report />} />
        <Route path='/breeds' element={<BreedsContainer />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/login/success' element={<LoginSuccess />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='/map' element={<MapWithDrawer />} />
      </Routes>
    </div>
  )
  }

const mapStateToProps = (state) => {
  return {user: state.user}
}
export default connect(mapStateToProps, {getReports, setGeolocatedCenter, autoLoginUser, logoutUser })(App);