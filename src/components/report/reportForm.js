import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { createReport } from '../../actions/reports'
import { getBreeds } from '../../actions/dogs'

class ReportForm extends Component {

    componentDidMount(){
        this.props.getBreeds()
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createReport({...e.target.form})
    }
    
    render(){
        const { breeds } = this.props.breeds
        console.log(breeds)
        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Location</label>
                    <input type="text" name="coordinates" onChange={this.handleFormChange} placeholer="Location"/>
                </div>
                <div>
                    <label>Breed</label>
                    {this.props.loading === false && {breeds} ? <Select placeholder="Select Breed" name="breed" onChange={(value) => console.log(value)} options={breeds} values={[]} getOptionLabel={(option)=>option.attributes.breed} getOptionValue={(option)=>option.id}/> : <h2>loading breeds</h2>}
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    // breeds: state.breeds.breeds,
    breeds: state.breeds,
    loading: state.breeds.loading,
})
export default connect(mapStateToProps, { createReport, getBreeds })(ReportForm)
