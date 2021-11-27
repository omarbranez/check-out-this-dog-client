import React, {useEffect, useState} from 'react'
import { connect, useDispatch} from 'react-redux'
import { getBreeds } from '../actions/breeds'
import { getReports } from '../actions/reports'
import Breed from '../components/breeds/breed'
import Grid from '@mui/material/Grid'

const BreedsContainer = (props) => {
    
    const dispatch = useDispatch()
    
    const [letterFilter, setLetterFilter] = useState('')
    const [groupFilter, setGroupFilter] = useState('')

    const letters = [...Array(26)].map((_, i) => String.fromCharCode('A'.charCodeAt(0) + i))
    const breedGroups = ['Herding', 'Hound', 'Mixed', 'Non-Sporting', 'Sporting', 'Terrier', 'Toy', 'Working']

    
    useEffect(() => {
        dispatch(getBreeds())
    }, [dispatch])

    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])

    const letterFilteredBreeds = (breeds) => {
        if (letterFilter) {
            return breeds.filter(breed => breed.breed.startsWith(letterFilter))
        } else {
            return breeds  
        }
    }

    const groupFilteredBreeds = (breeds) => {
        if (groupFilter) {
            return letterFilteredBreeds(props.breeds).filter(breed => breed.breed_group == groupFilter)
        } else {
            return letterFilteredBreeds(props.breeds)
        }
    }

    const filteredReports = (breed) => {
       return props.reports.filter(report => report.breed === breed.breed)
    }
    
    const handleLetterReset = (e) => {
        setLetterFilter('')
        document.getElementById('breedLetters').selectedIndex = 0
    }

    const handleGroupReset = (e) => {
        setGroupFilter('')
        document.getElementById('breedGroups').selectedIndex = 0
    }

    return(
        
        <div>
            <h2>Current List of Breeds</h2>
            <div>
                <label>Filter By First Letter </label>
                <select id="breedLetters" name="breedLetter" onChange={(e)=>setLetterFilter(e.target.value)}>
                    <option disabled selected value>Select Letter</option>
                    {letters.map(letter => <option value={letter}>{letter}</option>)}
                </select>
                <button onClick={(e)=>handleLetterReset(e)}> Reset Letter Filter</button>
            </div>
            <div>
                <label>Filter by Breed Group </label>
                <select id="breedGroups" name="breedGroup" onChange={(e)=>setGroupFilter(e.target.value)}>
                    <option disabled selected value>Select Breed Group</option>
                    {breedGroups.map(group => <option value={group}>{group}</option>)}    
                </select>
                <button onClick={(e)=>handleGroupReset(e)}> Reset Group Filter</button>  
            </div><br/>
            <Grid container spacing={3}>
                {groupFilteredBreeds(props.breeds).map((breed) => <Grid item xs={3}><Breed key={props.dog_id} {...breed} reportData={filteredReports(breed)}/> </Grid>)}
            {/* insert reports for statistics (how many of this breed, etc) */}
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    breeds: state.breeds.breeds,
    reports: state.reports.reports
})

export default connect(mapStateToProps, {getBreeds, getReports})(BreedsContainer)