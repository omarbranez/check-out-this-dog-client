import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import ReportFormMap from './reportFormMap'
import ReportAnalyzeImage from './reportAnalyzeImage'
import { createReport, reportFormChange, reportFormSelectChange, reportFormImageChange, setSelectedReport } from '../../actions/reportActions'
import { getBreeds } from '../../actions/breedActions'
import { setGeolocatedCenter } from '../../actions/mapActions'
import { colors } from '../../colors'
import MuttmapNewReport from '../../muttmap-new-dog-report.png'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import {Select as MuiSelect} from '@mui/material'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Autocomplete from '@mui/material/Autocomplete'
import Slider from '@mui/material/Slider'
import Checkbox from '@mui/material/Checkbox'
import OutlinedInput from '@mui/material/OutlinedInput'
import PropTypes from 'prop-types'
import { basePlacements } from '@popperjs/core'


const ReportForm = (props) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selectedTab, setSelectedTab] = useState(0)
    const [checked, setChecked] = useState([true, false])

    const [showMap, setShowMap] = useState(false)
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [name, setName] = useState('')
    const [dogId, setDogId] = useState(null)
    const [breed, setBreed] = useState('')
    const [color, setColor] = useState('')
    const [colorInput, setColorInput] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState(null)
    const [features, setFeatures] = useState('')
    const [demeanor, setDemeanor] = useState('')
    const [photo, setPhoto] = useState(null)
    const [photoAllowed, setPhotoAllowed] = useState('')
    
    useEffect(() => {
        dispatch(getBreeds())
    }, [dispatch])

    useEffect(() => {
        dispatch(setGeolocatedCenter())
    }, [dispatch])
    
    const handleChecked = (e) => {
        setCheked
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        props.createReport({name, color, colorInput, gender, lat, lng, age, features, demeanor, photo, user_id: props.user.id, dog_id: dogId})
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

    const allowPhoto = (verdict) => {
        if (verdict === "disallow"){
            setPhoto(null)
            alert("The selected photo is not allowed. Please select a different one")
        } else {
            setPhotoAllowed("allow")
        }        
    }

    const handleBreedSelect = (option) => {
        setDogId(option.value)
        setBreed(option.label)
    }
    const handleValueChange = (e, newValue) => {
        setSelectedTab(newValue)
    }

    const ageOptions = Array.from({length: 20}, (v,k) => k + 1)

    const isSubmitEnabled = 
        age && colorInput && features && demeanor && gender && lat && lng && name && dogId && photo && (photoAllowed == "allow")
    
    const breeds = props.breeds.map(breed => ({value: breed.id, label: breed.breed, attribute: "dogId"}))

    const addPhoto = (photo) => {
        setPhoto(photo)
    }

    return (
        <Box sx={{width: '100%'}}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

            <img src={MuttmapNewReport} width="500"></img>
                <h2 style={{color: 'red'}}>All Fields Are Required</h2>
            <form onSubmit={handleSubmit}>
            <Tabs value={selectedTab} onChange={handleValueChange}>
                        <Tab label="Location" />
                        <Tab label="Breed"/>
                        <Tab label="Name"/>
                        <Tab label="Age"/>
                        <Tab label="Color/Markings"/>
                        <Tab label="Gender"/>
                        <Tab label="Features"/>
                        <Tab label="Demeanor"/>
                        <Tab label="Photo"/>
                        <Tab label="Submit Report"/>
                    </Tabs>
                    {selectedTab === 0 && (
                <div>
                    <label>Location</label>
                    <br />
                    <TextField
                    id="lat-field" disabled type="text" name="lat" onChange={(e)=>setLat(e.target.value)} value={lat}/>
                    <TextField
                    id="lng-field" disabled type="text" name="lng" onChange={(e)=>setLng(e.target.value)} value={lng}/>
                    <br />
                    <input type="button" disabled={showMap} onClick={handleCurrentLocationClick} value="Use Current Location"/>
                    <br />
                    <input type="button" onClick={()=>setShowMap(!showMap)} value="Find Location on Map"/>
                    
                </div>
                    )}
                
                <div >
                    {showMap && !props.geolocating ? <ReportFormMap mapCoordinates={props.currentCenter} mapLoading={props.geolocating} sendMapToForm={sendMapToForm} confirmClicked={confirmClicked}/> : null }
                </div>

                {/* // <br /> */}
                {selectedTab === 1 && (
                <div>
                    <label>Breed</label><br />
                    <Select placeholder="Select Breed" onChange={(option)=>handleBreedSelect(option)} options={breeds}  /> 
                </div>
                )}
                
                {selectedTab === 2 && (
                <div>
                    <FormControl margin='dense' sx={{ m: 1, minWidth: 100 }}>
                    <TextField value={name} onChange={(e)=>setName(e.target.value)} label="Dog's Name"/>
                    </FormControl>
                </div>
                )}
                
                {selectedTab === 3 && (
                <div>
                    <FormControl margin='dense' sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel>Dog's Age</InputLabel>
                    <MuiSelect value={age} onChange={(e)=>setAge(e.target.value)} label="Dog's Age">
                        {ageOptions.map(ageOption => <MenuItem value={ageOption}>{ageOption}</MenuItem>)}
                    </MuiSelect>
                    </FormControl>
                </div>
                )}
                
                {selectedTab === 4 && (
                <div>
                    <FormControl margin='dense'>
                    <Autocomplete 
                        disablePortal 
                        sx={{ width: 300 }} 
                        value={color} 
                        onChange={(e, newValue)=>setColor(newValue)} 
                        inputValue={colorInput}
                        onInputChange={(e, newInputValue)=>setColorInput(newInputValue)}
                        options={colors} 
                        renderInput={(params)=> <TextField {...params} label="Dog's Color/Markings"/>}/>
                    </FormControl>
                </div>
                )}
                
                {selectedTab === 5 && (
                <div>
                    <FormControl margin='dense' sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel>Dog's Gender</InputLabel>
                    <MuiSelect value={gender} onChange={(e)=>setAge(e.target.value)} label="Dog's Gender">
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Unknown">Unknown</MenuItem>
                    </MuiSelect>
                    </FormControl>
                </div>
                )}
                
                {selectedTab === 6 && (
                <div>
                    <FormControl  margin='dense' sx={{ m: 1, minWidth: 400 }}>
                    <TextField placeholder="Does Anything Stand Out About This Dog's Appearance?" label="Dog's Features" multiline rows={4} value={features} onChange={(e)=>setFeatures(e.target.value)}/>
                    </FormControl>
                </div>
                )}
                
                {selectedTab === 7 && (
                <div>
                    <FormControl  margin='dense' sx={{ m: 1, minWidth: 400 }}>
                    <TextField placeholder="How Does This Dog Behave?" label="Dog's Demeanor" multiline rows={4} value={demeanor} onChange={(e)=>setDemeanor(e.target.value)}/>
                    </FormControl>
                </div>
                )}
               
             {selectedTab === 8 && (
            <div>
                <ReportAnalyzeImage addPhoto={addPhoto} breeds={props.breeds} allowPhoto={allowPhoto}/>
            </div>
             )}
             {selectedTab === 9 && (
                <div>
                    {!isSubmitEnabled && <p style={{color:"red"}}>Please complete all fields</p>}
                    <p>Location: {lat}, {lng}</p>
                    <p>Breed: {breed}</p>
                    <p>Name: {name ? name : "No Name Provided"}</p>
                    <p></p>
                    <input type="submit" value="Submit New Report" disabled={!isSubmitEnabled}/>
                </div>
             )}
            </form>
            </Box>
        </Box>
    )
}


const mapStateToProps = (state) => ({
    breeds: state.breeds.breeds,
    loading: state.breeds.loading,
    currentCenter: state.user.currentCenter,
    geolocating: state.user.geolocating,
    user: state.user
})

export default connect(mapStateToProps, { createReport, getBreeds, reportFormChange, reportFormSelectChange, reportFormImageChange })(ReportForm)
