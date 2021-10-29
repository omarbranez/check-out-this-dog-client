import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { getReports } from '../actions/reports'
// import { getBreeds } from '../actions/breeds'
import ReportForm from '../components/report/reportForm'
import Report from '../components/report/report'

class ReportsContainer extends Component {

    componentWillMount(){
        this.props.getReports()
        // this.props.getBreeds()
    }
    
    render(){
        return(
            <div>
                <h2>IS THERE A DOG NEAR YOU? IS IT AMAZING? SHARE IT WITH US!</h2>
                <Link to="/reports/new" />
                <h2>News Feed</h2>
                {this.props.reports.map((report) => <Report key={report.id} {...report} user={this.props.user}/>)}
                {/* <MapContainer reports={this.state}/> */}
            </div>
        )
    }
 }


const mapStateToProps = (state) => ({
    reports: state.reports.reports,
    // breeds: state.breeds,
    user: state.user,
})

export default connect(mapStateToProps, { getReports })(ReportsContainer)