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

const App = ({autoLoginUser}) => {
  
  useEffect(() => localStorage.token && autoLoginUser(), [autoLoginUser])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate replace to='/welcome' />} />
        <Route path='/welcome' element={<HomeContainer />} />
        <Route path='/profile/:username' element={<PrivateRoute><ProfileContainer /></PrivateRoute>} />
        <Route path='/reports' exact element={<PrivateRoute><ReportsContainer /></PrivateRoute>} />
        <Route path='/reports/new' element={<PrivateRoute><ReportForm /></PrivateRoute>} />
        <Route path='/reports/:reportId' element={<PrivateRoute><ReportShow/></PrivateRoute>} />
        <Route path='/breeds' element={<PrivateRoute><BreedsContainer/></PrivateRoute>} />
        <Route path='/login' element={<AuthLoginForm />} />
        <Route path='/login/success' element={<AuthLoginSuccess />} />
        <Route path='/signup' element={<AuthSignupForm />} />
        <Route path='/logout' element={<AuthLogoutSuccess />} />
        <Route path='/map' element={<PrivateRoute><MapWithDrawer/></PrivateRoute>}/>
      </Routes>
    </div>
  )
  }

const mapStateToProps = (state) => {
  return {user: state.user}
}
export default connect(mapStateToProps, {getReports, setGeolocatedCenter, autoLoginUser, logoutUser })(App);