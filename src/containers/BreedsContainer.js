import React, {useEffect} from 'react'
import { connect, useDispatch} from 'react-redux'
import { getBreeds } from '../actions/breeds'
import Breed from '../components/breeds/breed'
import Modal from 'react-modal'

const BreedsContainer = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBreeds())
    }, [dispatch])

    return(
        <div>
            <h2>Current List of Breeds</h2>
            {props.breeds.map((breed) => <Breed key={props.dog_id} {...breed}/> )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    breeds: state.breeds.breeds
})

export default connect(mapStateToProps, {getBreeds})(BreedsContainer)