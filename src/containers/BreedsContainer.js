import React, {useEffect} from 'react'
import { connect, useDispatch} from 'react-redux'
import { getBreeds } from '../actions/breeds'
import { getReports } from '../actions/reports'
import Breed from '../components/breeds/breed'
import Modal from 'react-modal'
import Grid from '@mui/material/Grid'

const BreedsContainer = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBreeds())
    }, [dispatch])

    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])

    const filteredReports = (breed) => {
       return props.reports.filter(report => report.breed === breed.breed)
    }
    
    // console.log(filteredReports("Pembroke Welsh Corgi"))
    // console.log(props.reports.filter(report => report.breed === "Pembroke Welsh Corgi"))
    // debugger
    return(
        <div>
            <h2>Current List of Breeds</h2>
            <Grid container spacing={3}>
            {props.breeds.map((breed) => <Grid item xs={3}><Breed key={props.dog_id} {...breed} reportData={filteredReports(breed)}/> </Grid>)}
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