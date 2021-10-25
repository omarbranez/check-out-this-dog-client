import React, { Component} from 'react'
import { connect } from 'react-redux'
import { getReports } from '../actions/reports'
// import MapContainer from './MapContainer'

class ReportsContainer extends Component {

    state = {
        reports: [],
    }

    componentDidMount(){
        this.props.getReports()
    }

    render(){
        return(
            <div>
                {/* <MapContainer reports={this.state}/> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        reports: state
    }
}

export default connect(mapStateToProps, { getReports })(ReportsContainer)