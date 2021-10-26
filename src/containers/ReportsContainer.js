import React, { Component} from 'react'
import { connect } from 'react-redux'
import { getReports } from '../actions/reports'
// import { getBreeds } from '../actions/breeds'
import ReportForm from '../components/report/reportForm'

class ReportsContainer extends Component {

    componentWillMount(){
        this.props.getReports()
        // this.props.getBreeds()
    }
    

    render(){
        return(
            <div>
                <ReportForm />
                {/* <MapContainer reports={this.state}/> */}
            </div>
        )
    }
 }


const mapStateToProps = (state) => ({
    reports: state.reports,
    breeds: state.breeds,
})

export default connect(mapStateToProps, { getReports })(ReportsContainer)