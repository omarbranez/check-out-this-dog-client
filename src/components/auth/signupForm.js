import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router'
import { handleLoginFormChange, createUser, getLatLngOutput } from '../../actions/user'

const SignupForm = (props) => {
    const navigate = useNavigate()
    const { form, handleLoginFormChange, createUser, getLatLngOutput } = props
    const { username, password, passwordConfirmation, lat, lng } = form
    const [ showCityState, setShowCityState ] = useState(false)
    const url = `https://www.bing.com/api/maps/mapcontrol?key=${process.env.REACT_APP_M_API_KEY}`
    const handleSubmit = (e) => {
        e.preventDefault()
        password === passwordConfirmation ? createUser({ username: username, password: password, lat: lat, lng: lng}, navigate) : alert("Passwords do not match")
    }

 // can we have their city/state show up on this form before it's submitted?

    useEffect(() => window.Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
        callback: onLoad,
        errorCallback: onError
    }), [])
    
    const onLoad = () => {
        console.log("called")
        const options = { maxResults: 5 };
        const manager = new window.Microsoft.Maps.AutosuggestManager(options);
        manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion);
        }

    const onError = (message) => {
        document.getElementById('printoutPanel').innerHTML = message;
    }
    
    function selectedSuggestion(suggestionResult) {
        console.log(suggestionResult)
        // document.getElementById('printoutPanel').innerHTML =
        //     'Suggestion: ' + suggestionResult.formattedSuggestion +
        //         '<br> Lat: ' + suggestionResult.location.latitude +
        //         '<br> Lon: ' + suggestionResult.location.longitude;
        getLatLngOutput(suggestionResult.location.latitude, suggestionResult.location.longitude)
    }
      
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username:</label><br/>
                <input type="text" name="username" value={username} onChange={handleLoginFormChange} required/><br/>
                <label>Password</label><br/>
                <input type="password" name="password" value={password} onChange={handleLoginFormChange} required/><br/>
                <label>Confirm Password</label><br/>
                <input type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={handleLoginFormChange} required/><br/>
                <label>Set Location</label><br/>
                <div id='printoutPanel'>
                    <input type="hidden" value={lat} onChange={getLatLngOutput}/>
                    <input type="hidden" value={lng} onChange={getLatLngOutput}/>
                </div>
                <div id='searchBoxContainer'><input type='text' id= 'searchBox'/></div>
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    form: state.user.loginForm
})

export default connect(mapStateToProps, { handleLoginFormChange, createUser, getLatLngOutput})(SignupForm)