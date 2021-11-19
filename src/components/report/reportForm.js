import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import UserMap from '../map/userMap'
import { connect, useDispatch } from 'react-redux'
import { createReport, reportFormChange, reportFormSelectChange, reportFormImageChange } from '../../actions/reports'
import { getBreeds } from '../../actions/breeds'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../colors'
import AnalyzeImage from './analyzeImage'


const ReportForm = (props) => {

    const navigate = useNavigate()

    const [ showMap, setShowMap ] = useState(false)
    const [ disableButton, setDisableButton ] = useState(false)

    const { age, color, dogId, features, demeanor, gender, lat, lng, name, photo } = props.form
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBreeds())
    }, [dispatch])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        props.createReport({...props.form, user_id: props.user.id, dog_id: dogId})
        navigate('/map', {replace: true})
    }
    function triggerInput(input, enteredValue) { // should be a blog post. REACT HATES THIS
        const lastValue = input.value
        input.value = enteredValue
        const event = new Event("input", { bubbles: true })
        const tracker = input._valueTracker
        if (tracker) {
            tracker.setValue(lastValue)
        }
        input.dispatchEvent(event)
    }

    const handleCurrentLocationClick = () => { 
        triggerInput(document.getElementById("lat-field"), props.currentCenter.lat)
        triggerInput(document.getElementById("lng-field"), props.currentCenter.lng)
    }

    const sendMapToForm = ({lat, lng}) => {
        triggerInput(document.getElementById("lat-field"), lat)
        triggerInput(document.getElementById("lng-field"), lng)
    }

    const confirmClicked = () => {
        setShowMap(!showMap)
    }

    const isSubmitEnabled = 
        age && color && features && demeanor && gender && lat && lng && name && dogId// && photo// && userId //dogId
    
    const breeds = props.breeds.map(breed => ({value: breed.id, label: breed.breed, attribute: "dogId"}))

    return (
        <div>
            <h1>Report a new dog sighting!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Location</label><br />
                    <input id="lat-field" disabled type="text" name="lat" onChange={props.reportFormChange} value={lat}/>
                    <input id="lng-field" disabled type="text" name="lng" onChange={props.reportFormChange} value={lng}/>
                    <input type="button" disabled={showMap} onClick={handleCurrentLocationClick} value="Use Current Location"/>
                    <input type="button" onClick={()=>setShowMap(!showMap)} value="Find Location on Map"/>
                </div>
                <br />
                <div >
                    {showMap && !props.geolocating ? <UserMap mapCoordinates={props.currentCenter} mapLoading={props.geolocating} sendMapToForm={sendMapToForm} confirmClicked={confirmClicked}/> : null }
                </div>
                <br />
                <div>
                    <label>Breed</label><br />
                    <Select placeholder="Select Breed" onChange={props.reportFormSelectChange} options={breeds} /> 
                </div>
                <br />
                <div>
                    <label>Dog's Name</label><br />
                    <input type="text" name="name" onChange={props.reportFormChange} value={name} pattern="[A-Za-z]{1,16}"/>
                </div>
                <br />
                <div>
                    <label>Dog's Age</label><br />
                    <input type="number" name="age" onChange={props.reportFormChange} value={age} min="0" max="30"/>
                </div>
                <br />
                <div>
                    <label>Dog's Color/Markings</label><br />
                    <Select placeholder="Select Color/Markings" onChange={props.reportFormSelectChange} options={colors}/>
                </div>
                <br />
                <div>
                    <label>Dog's Gender</label><br />
                    <select name="gender" selected={gender} onChange={props.reportFormChange}>
                        <option value="" selected disabled hidden>Pick One</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>
                <br />
                <div>
                    <label>Dog's Features</label><br />
                    <textarea name="features" onChange={props.reportFormChange} value={features} />
                </div>
                <br />
                <div>
                    <label>Dog's Demeanor</label><br />
                    <textarea name="demeanor" onChange={props.reportFormChange} value={demeanor} />
                </div>
                <br />
                <div>
                    <label>Upload Photo</label><br />
                    <input type="file" name="photo" accept="image/*" multiple={false} onChange={props.reportFormImageChange}/>
                </div>
                <br />
                <div>
                    <input type="submit" value="Submit New Report" disabled={!isSubmitEnabled}/>
                </div>
            </form>
            <div>
                <AnalyzeImage image={photo}/>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    breeds: state.breeds.breeds,
    loading: state.breeds.loading,
    form: state.reports.reportForm,
    currentCenter: state.user.currentCenter,
    geolocating: state.user.geolocating,
    user: state.user
})

export default connect(mapStateToProps, { createReport, getBreeds, reportFormChange, reportFormSelectChange, reportFormImageChange })(ReportForm)
