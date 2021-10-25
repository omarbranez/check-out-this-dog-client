const BASE_URL = 'http://localhost:3000/encounters'

export const getReports = () => {
    return dispatch => {
        // debugger
        dispatch({ type: "LOADING_REPORTS"})
        fetch(BASE_URL, {
            header: 'Access-Control-Allow-Origin'
        })
        .then(res => res.json())
        .then(responseJSON => dispatch({
            type: "ADD_REPORTS",
            payload: responseJSON,
        })
    )}
}

export const createReport = (reportData) => {
    return dispatch => {
        dispatch({ type: "CREATE_REPORT"})
        fetch(BASE_URL, {
            method: 'POST',
            header: 'Access-Control-Allow-Origin',
            body: JSON.stringify(reportData)
        })        
        .then(res => res.json())
        .then(responseJSON => dispatch({
            type: "ADD_REPORTS",
            payload: responseJSON
        }))
    }
}
