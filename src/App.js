import logo from './logo.svg';
import './App.css';
import './marker.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getReports } from './actions/reports'
import { setCenter } from './actions/map'
import { autoLoginUser, logoutUser } from './actions/user';
import React, { Component } from 'react'
import HomeContainer from './containers/HomeContainer'
import ReportsContainer from './containers/ReportsContainer';
import ReportForm from './components/report/reportForm'
import MapContainer from './containers/MapContainer'
import Navbar from './components/navbar'
import LoginForm from './components/auth/loginForm'
import SignupForm from './components/auth/signupForm'


// function App() {
class App extends Component {

  componentDidMount(){
    localStorage.token && this.props.autoLoginUser()
    this.props.setCenter()
  }
  logout = () => {
    this.props.logoutUser()
    return <Redirect to='/' push={true} />
  }
  render() {
    return (
     <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomeContainer}/>
            <Route exact path='/map' component={MapContainer}/>
            <Route exact path="/reports" component={ReportsContainer}/>
            <Route exact path="/reports/new" component={ReportForm}/>
            <Route exact path='/login' component={LoginForm}/>
            <Route exact path='/signup' component={SignupForm}/>
            <Route exact path='/logout' render={this.logout}/>
          </Switch>
    </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user
})
export default connect(mapStateToProps, {getReports, setCenter, autoLoginUser, logoutUser })(App);