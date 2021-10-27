import React, { useEffect } from 'react'
import Select from 'react-select'
import { connect, useDispatch } from 'react-redux'
import { createReport, reportFormChange, reportFormSelectChange } from '../../actions/reports'
import { getBreeds } from '../../actions/breeds'
import {colors} from '../../colors'


const ReportForm = (props) => {

    const { age, breed, color, dogId, features, demeanor, gender, lat, lng, name, photo, userId } = props.form
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBreeds())
    }, [dispatch])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        props.createReport({...e.target.form})
    }
    function triggerInput(input, enteredValue) { // should be a blog post
        const lastValue = input.value;
        input.value = enteredValue;
        const event = new Event("input", { bubbles: true });
        const tracker = input._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        input.dispatchEvent(event);
    }

    const handleClick = () => {
        const latField = document.getElementById("lat-field")
        const lngField = document.getElementById("lng-field")
        triggerInput(latField, props.mapCoordinates.lat)
        triggerInput(lngField, props.mapCoordinates.lng)
    }
    console.log(props)

    const breeds = props.breeds.breeds.map(breed => ({value: breed.id, label: breed.attributes.breed, attribute: "breed"}))

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
                    <input type="text" name="name" onChange={props.reportFormChange} value={name}/>
                </div>
                <br />
                <div>
                    <label>Dog's Age</label><br />
                    <input type="number" name="age" onChange={props.reportFormChange} value={age}/>
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
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>
                <br />
                <div>
                    <label>Dog's Features</label><br />
                    <textarea name="features" onChange={props.reportFormChange} value={features}/>
                </div>
                <br />
                <div>
                    <label>Dog's Demeanor</label><br />
                    <textarea name="demeanor" onChange={props.reportFormChange} value={demeanor}/>
                </div>
                <br />
                <div>
                    <label>Upload Photo</label><br />
                    <input type="file" accept="image/*" multiple={false} onChange={props.reportFormChange} value={photo}/>
                </div>
                <br />
                <div>
                    <input type="submit" value="Submit New Report" />
                </div>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => ({
    breeds: state.breeds,
    loading: state.breeds.loading,
    form: state.reports.reportForm,
    mapCoordinates: state.mapCoordinates.center
})

export default connect(mapStateToProps, { createReport, getBreeds, reportFormChange, reportFormSelectChange })(ReportForm)
