import React from 'react'
import { connect } from 'react-redux'
import Report from '../components/report/report'

const ProfileContainer = (props) => {

    return(
        <div>
            <h1>Welcome Back, {props.user}</h1>
            <h2>You have made {props.reports.length} reports</h2>
            <div>
                {props.reports.map((report) => <Report key={report.id} {...report}/>)}
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    reports: state.reports.reports.filter((report) => report.user_id === state.user.id ),
    user: state.user.username
})
export default connect(mapStateToProps)(ProfileContainer)