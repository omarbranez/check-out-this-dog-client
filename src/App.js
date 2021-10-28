import logo from './logo.svg';
import './App.css';
import './marker.css'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getReports } from './actions/reports'
import { setCenter } from './actions/map'
import React, { Component } from 'react'
import HomeContainer from './containers/HomeContainer'
import ReportsContainer from './containers/ReportsContainer';
import ReportForm from './components/report/reportForm'
import MapContainer from './containers/MapContainer'
import Navbar from './components/navbar'
import LoginForm from './components/auth/loginForm'
import SignupForm from './components/auth/signupForm'
console.log(process.env.REACT_APP_B_API_KEY)

// function App() {
class App extends Component {

  componentDidMount(){
    this.props.setCenter()
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
          </Switch>
    </div>
    );
  }
}

export default connect(null, {getReports, setCenter })(App);