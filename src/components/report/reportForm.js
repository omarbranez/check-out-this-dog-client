import React, { useEffect } from 'react'
import Select from 'react-select'
import { connect, useDispatch } from 'react-redux'
import { createReport, reportFormChange, reportFormSelectChange, reportFormImageChange } from '../../actions/reports'
import { getBreeds } from '../../actions/breeds'
import { withRouter, useHistory } from 'react-router-dom'
import {colors} from '../../colors'


const ReportForm = (props) => {
    const history = useHistory()
    const { age, color, dogId, features, demeanor, gender, lat, lng, name, photo } = props.form
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBreeds())
    }, [dispatch])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(props.form)
        props.createReport({...props.form, user_id: '1', dog_id: dogId})
        history.push("/map")

    }
    function triggerInput(input, enteredValue) { // should be a blog post
        const lastValue = input.value
        input.value = enteredValue
        const event = new Event("input", { bubbles: true })
        const tracker = input._valueTracker
        if (tracker) {
            tracker.setValue(lastValue)
        }
        input.dispatchEvent(event)
    }

    const handleClick = () => {
        triggerInput(document.getElementById("lat-field"), props.mapCoordinates.lat)
        triggerInput(document.getElementById("lng-field"), props.mapCoordinates.lng)
    }

    const isEnabled = 
        age && color && features && demeanor && gender && lat && lng && name && dogId// && photo// && userId //dogId
    
    // console.log(props)

    const breeds = props.breeds.map(breed => ({value: breed.id, label: breed.breed, attribute: "dogId"}))

    return (
        <div>
            <h1>Report a new dog sighting!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Location</label><br />
                    <input id="lat-field" disabled type="text" name="lat" onChange={props.reportFormChange} value={lat}/>
                    <input id="lng-field" disabled type="text" name="lng" onChange={props.reportFormChange} value={lng}/>
                    <input type="button" onClick={handleClick} value="Set Location"/>
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
                    <input type="submit" value="Submit New Report" disabled={!isEnabled}/>
                </div>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => ({
    breeds: state.breeds.breeds,
    loading: state.breeds.loading,
    form: state.reports.reportForm,
    mapCoordinates: state.mapCoordinates.center
})

export default connect(mapStateToProps, { createReport, getBreeds, reportFormChange, reportFormSelectChange, reportFormImageChange })(withRouter(ReportForm))
