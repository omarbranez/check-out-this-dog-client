const REPORTS_URL = 'http://localhost:3000/encounters'

export const getReports = () => {
    return dispatch => {
        // debugger
        dispatch({ type: "LOADING_REPORTS"})
        fetch(REPORTS_URL, {
            header: 'Access-Control-Allow-Origin'
        })
        .then(res => res.json())
        .then(responseJSON => dispatch({
            type: "ADD_REPORTS",
            payload: responseJSON,
        })
    )}
}
export const reportFormChange = (e) => ({
    type: "REPORT_FORM_CHANGE",
    payload: {name: e.target.name, value: e.target.value}
})

export const reportFormSelectChange = (option) => ({
    type: "REPORT_FORM_CHANGE",
    payload: {name: option.attribute, value: option.value}
})
export const createReport = (reportData) => {
    return dispatch => {
        fetch(REPORTS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportData)
        })        
        .then(res => res.json())
        .then(responseJSON => dispatch({
            type: "ADD_REPORTS",
            payload: responseJSON
        }))
    }
}


