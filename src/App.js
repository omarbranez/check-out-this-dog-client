import './marker.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { getReports } from './actions/reportActions'
import { setGeolocatedCenter } from './actions/mapActions'
import { autoLoginUser, logoutUser } from './actions/userActions';
import React, { useEffect } from 'react'
import PrivateRoute from './containers/PrivateRoute'
import HomeContainer from './containers/HomeContainer'
import ProfileContainer from './containers/ProfileContainer';
import ReportsContainer from './containers/ReportsContainer';
import ReportForm from './components/report/reportForm'
import ReportShow from './components/report/reportShow'
import BreedsContainer from './containers/BreedsContainer';
import Navbar from './components/navbar'
import AuthLoginForm from './components/auth/authLoginForm'
import AuthLoginSuccess from './components/auth/authLoginSuccess'
import AuthSignupForm from './components/auth/authSignupForm'
import AuthLogoutSuccess from './components/auth/authLogoutSuccess'
import MapWithDrawer from './containers/MapWithDrawer'

const App = ({autoLoginUser, user}) => {
  
  function isEmpty(str) {
    return (!str || str.length === 0 );
  }
  // console.log(isEmpty(user.username))
  // console.log(user)
  // useEffect(() => {if (!isEmpty(user.username)) {autoLoginUser()}}, [autoLoginUser])  
  useEffect(() => localStorage.token && autoLoginUser(), [autoLoginUser])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate replace to='/welcome' />} />
        <Route path='/welcome' element={<HomeContainer />} />
        <PrivateRoute path='/profile/:username' element={<ProfileContainer />} />
        <Route path='/reports' exact element={<ReportsContainer />} />
        <PrivateRoute path='/reports/new' exact element={<ReportForm />} />
        <Route path='/reports/:reportId' element={<ReportShow />} />
        <Route path='/breeds' element={<BreedsContainer />} />
        <Route path='/login' element={<AuthLoginForm />} />
        <Route path='/login/success' element={<AuthLoginSuccess />} />
        <Route path='/signup' element={<AuthSignupForm />} />
        <Route path='/logout' element={<AuthLogoutSuccess />} />
        <Route path='/map' element={<MapWithDrawer />} />
      </Routes>
    </div>
  )
  }

const mapStateToProps = (state) => {
  return {user: state.user}
}
export default connect(mapStateToProps, {getReports, setGeolocatedCenter, autoLoginUser, logoutUser })(App);