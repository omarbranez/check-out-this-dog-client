// import React, { Component } from 'react'
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { connect, useDispatch } from 'react-redux'
import { createReport } from '../../actions/reports'
import { getBreeds } from '../../actions/breeds'
import {colors} from '../../colors'

const ReportForm = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBreeds())
    }, [dispatch])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        createReport({...e.target.form})
    }

    const handleFormChange = (e) => {

    }
    
    console.log(props)
        // console.log(props.breeds)
    const { breeds } = props.breeds
        // console.log({breeds})
    return (
        <div>
            <h1>Report a new dog sighting!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Location</label><br />
                    <input type="text" name="coordinates" onChange={handleFormChange} placeholer="Location" />
                </div>
                <br />
                <div>
                    <label>Breed</label><br />
                    <Select placeholder="Select Breed" name="breed" onChange={(value) => console.log(value)} options={breeds} values={[]} getOptionLabel={(option) => option.attributes.breed} getOptionValue={(option) => option.id} /> 
                </div>
                <br />
                <div>
                    <label>Dog's Name</label><br />
                    <input type="text" name="name" onChange={handleFormChange} />
                </div>
                <br />
                <div>
                    <label>Dog's Age</label><br />
                    <input type="number" name="age" onChange={handleFormChange} />
                </div>
                <br />
                <div>
                    <label>Dog's Color/Markings</label><br />
                    <Select placeholder="Select Color/Markings" name="color" onChange={(value) => console.log(value)} options={colors} values={[]} />
                </div>
                <br />
                <div>
                    <label>Dog's Gender</label><br />
                    <select name="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>
                <br />
                <div>
                    <label>Dog's Features</label><br />
                    <textarea name="features" onChange={handleFormChange} />
                </div>
                <br />
                <div>
                    <label>Dog's Demeanor</label><br />
                    <textarea name="demeanor" onChange={handleFormChange} />
                </div>
                <br />
                <div>
                    <label>Upload Photo</label><br />
                    <input type="file" accept="image/*" multiple={false} onChange={handleFormChange} />
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
})

export default connect(mapStateToProps, { createReport, getBreeds })(ReportForm)
