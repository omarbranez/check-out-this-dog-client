import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'

import HomeContainer from './containers/HomeContainer'
import ReportsContainer from './containers/ReportsContainer';
import Navbar from './components/navbar'
import Login from './components/auth/login'
import Signup from './components/auth/signup'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
          <Switch>
          <Route exact path="/" component={HomeContainer}/>
          <Route exact path="/reports" component={ReportsContainer}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          </Switch>
      </Router>
      {/* <header className="App-header">
        <h1>Check Out This Dog!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
