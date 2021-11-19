import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router'
import { createUser, getLatLngOutput } from '../../actions/user'

const SignupForm = ({createUser}) => {
    const [latLngOutput, setLatLngOutput] = useState({lat: null, lng: null})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const navigate = useNavigate()

    const url = `https://www.bing.com/api/maps/mapcontrol?key=${process.env.REACT_APP_M_API_KEY}` // does this do anything

    const handleSubmit = (e) => {
        e.preventDefault()
        password === passwordConfirmation ? createUser({ username: username, password: password, lat: latLngOutput.lat, lng: latLngOutput.lng}, navigate) : alert("Passwords do not match")
    }

    useEffect(() => window.Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', { // how to make sure it doesnt error out before it actually
        callback: onLoad,
        errorCallback: onError
    }), [])
    
    const onLoad = () => { // 
        // console.log("called")
        const options = { maxResults: 5 };
        const manager = new window.Microsoft.Maps.AutosuggestManager(options);
        manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion);
        }

    const onError = (message) => {
        document.getElementById('printoutPanel').innerHTML = message;
    }
    
    function selectedSuggestion(suggestionResult) {
        setLatLngOutput({lat: suggestionResult.location.latitude, lng: suggestionResult.location.longitude})
    }
      
    return (
        <div>
        {onLoad ? 
            <form onSubmit={handleSubmit}>
                <label>Username:</label><br/>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/><br/>
                <label>Password</label><br/>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/><br/>
                <label>Confirm Password</label><br/>
                <input type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required/><br/>
                <label>Set Location</label><br/>
                {/* <div id='printoutPanel'>
                    <input type="hidden" value={lat} onChange={(e) => setLat(e.target.value)}/>
                    <input type="hidden" value={lng} onChange={(e) => setLng(e.target.value)}/>
                </div> */}
                <div id='searchBoxContainer'><input type='text' id= 'searchBox'/></div>
                <input type="submit" value="Sign Up" />
            </form>
        : <h2>Loading</h2>}
        </div>
    )
}

export default connect(null, { createUser, getLatLngOutput})(SignupForm)