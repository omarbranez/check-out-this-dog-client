import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import {  Link, useNavigate } from 'react-router-dom'
import { getReports } from '../actions/reports'
// import ReportForm from '../components/report/reportForm'
// import Report from '../components/report/report'
import { DataGrid, GridToolbarFilterButton, GridCellParams} from '@mui/x-data-grid'
import report from '../components/report/report'

const ReportsContainer = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ sortDate, setSortDate ] = useState([{field: 'created', sort: 'desc'}])

    const [ like, setLike ] = useState(false)

    const columns = [
        { field: 'date', headerName: 'Date Reported', width: 200, filterable: false },
        { field: 'time', headerName: 'Time Reported', width: 200, filterable: false},
        { field: 'name', headerName: 'Dog Name', width: 150, filterable: false },
        { field: 'breed', headerName: 'Dog Breed', width: 200 },
        { field: 'created', type: 'dateTime', width: 200, filterable: false},
    ]

    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])

    const handleClick = (e) => {
        console.log(e.id)
        navigate(`/reports/${e.id}`)
    }
    return (
        <div>
            <h2>IS THERE A DOG NEAR YOU? IS IT AMAZING? SHARE IT WITH US!</h2>
            <Link to="/reports/new" >New Dog Report</Link>
            <h2>News Feed</h2>
            {!(props.reports.loading) ? <DataGrid 
                components={{ Toolbar: GridToolbarFilterButton, }}
                sortingOrder={['desc', 'asc']}
                sortModel={sortDate}
                // filterModel={filteredData}
                rows={props.reports.map((report) => ({id: report.id, date: report.date_created, time: report.time_created, name: report.name, breed: report.breed, created: report.created}))}
                columns={columns}
                onSortModelChange={(report) => setSortDate(report)}
                onCellClick={(e) => handleClick(e)}
                // onFilterModelChange={(report) => setFilteredData(report)}
            /> : <h2>Loading</h2>}
            {/* {!(props.reports.loading) ? props.reports.map((report) => <Report key={report.id} {...report} user={props.user}/>) : <h3>Loading Reports</h3> } */}
        </div>
    )
}


const mapStateToProps = (state) => ({
    reports: state.reports.reports,
    // breeds: state.breeds,
    user: state.user,
})

export default connect(mapStateToProps, { getReports })(ReportsContainer)