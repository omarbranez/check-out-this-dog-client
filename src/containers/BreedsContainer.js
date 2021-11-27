import React, {useEffect, useState} from 'react'
import { connect, useDispatch} from 'react-redux'
import { getBreeds } from '../actions/breeds'
import { getReports } from '../actions/reports'
import Breed from '../components/breeds/breed'
import Modal from 'react-modal'
import Grid from '@mui/material/Grid'

const BreedsContainer = (props) => {

    const [letterFilter, setLetterFilter] = useState('A')
    const [groupFilter, setGroupFilter] = useState('Toy')

    const dispatch = useDispatch()

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
    
    // const letterFilteredBreeds = () => return letterFilter ? props.breeds.filter(breed => breed.breed.startsWith(letterFilter)) : props.breeds
    // const groupFilteredBreeds = () => return groupFilter ? letterFilteredBreeds.filter(breed => breed.breed_group == groupFilter) : props.breeds
    // console.log(filteredReports("Pembroke Welsh Corgi"))
    // console.log(props.reports.filter(report => report.breed === "Pembroke Welsh Corgi"))
    // debugger
    // console.log(filteredBreeds)
    // const groupFilteredBreeds = () => {
    //     if (groupFilter) {
    //         return letterFilteredBreeds.filter(breed => breed.breed_group == groupFilter)
    //     } else {
    //         return letterFilteredBreeds
    //     }
    // }

    // console.log(letterFilteredBreeds())
    return(
        
        <div>
            <h2>Current List of Breeds</h2>
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