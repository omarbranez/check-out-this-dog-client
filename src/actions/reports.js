const REPORTS_URL = 'http://localhost:3000/reports'
const REACTIONS_URL = 'http://localhost:3000/reactions'
export const getReports = () => {
    return dispatch => {
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

export const getFilteredReports = () => {
    return dispatch => { // try watchPosition
        navigator.geolocation.getCurrentPosition(position =>  {
            dispatch({ type: "LOADING_MAP" })
            dispatch({type: "SET_CENTER", payload: {
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }
        }
    })
    const bounds = new URLSearchParams().toString()
    return dispatch => {
        dispatch({ type: "LOADING_REPORTS"})
        fetch(REPORTS_URL + '?' + bounds, {
            header: 'Access-Control-Allow-Origin'
        })
        .then(res => res.json())
        .then(responseJSON => dispatch({
            type: "ADD_REPORTS",
            payload: responseJSON,
        }))
    }
})}}

export const setSelectedReport = (id) => {
    // console.log("THE ID IS " + id)
    // debugger
    return dispatch => {
        // dispatch({type: "ADD_LIKE_TO_SET_REPORT"})
        fetch(REPORTS_URL + '/' + id, {
            headers: {
                'Authorization': localStorage.token,
            }})
        // .then(res => console.log(res.json()))
        .then(res => res.json())
        .then(report => dispatch({
            type: 'SET_SELECTED_REPORT',
            payload: report
        }))
    }
}

export const unsetSelectedReport = () => ({
    type: "UNSET_SELECTED_REPORT"
})

export const reportFormChange = (e) => ({
    type: "REPORT_FORM_CHANGE",
    payload: {name: e.target.name, value: e.target.value}
})

export const reportFormSelectChange = (option) => ({
    type: "REPORT_FORM_CHANGE",
    payload: {name: option.attribute, value: option.value}
})

export const reportFormImageChange = (e) => ({
    type: "REPORT_FORM_CHANGE",
    payload: {name: "photo", value: e.target.files[0]}
})

export const createReport = (reportData) => {
    const fData = new FormData()
    fData.append('name', reportData.name)
    fData.append('user_id', reportData.user_id)
    fData.append('dog_id', reportData.dog_id)
    fData.append('color', reportData.color)
    fData.append('gender', reportData.gender)
    fData.append('lat', reportData.lat)
    fData.append('lng', reportData.lng)
    fData.append('age', reportData.age)
    fData.append('features', reportData.features)
    fData.append('demeanor', reportData.demeanor)
    fData.append('photo', reportData.photo)
    fData.append('show', false)

    // debugger
    return dispatch => {
        fetch(REPORTS_URL, {
            method: 'POST',
            body: fData
        })        
        .then(res => res.json())
        .then(responseJSON => dispatch({
            type: "ADD_REPORTS",
            payload: responseJSON
        }))
    }
}

export const toggleReportWindow = (reportId) => ({
    type: "TOGGLE_SHOW_WINDOW",
    payload: reportId
})

export const addLiked = (userId, reportId) => {
    return dispatch => {
        fetch(REACTIONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json",
                'Authorization': localStorage.token,
            },
            body: JSON.stringify({
                user_id: userId,
                report_id: reportId
            })
        })
        .then(dispatch(setSelectedReport(reportId)))

        // .then(dispatch({
        //     type: "LIKE_REPORT"
        // }))
}}

export const undoLiked = (likeId, reportId) => {
    // console.log(likeId)
    return dispatch => {
        fetch(REACTIONS_URL + `/${likeId}`, {
            method: 'DELETE',
        })
        // .then(res => res.json())
        // .then(dispatch({
        //     type: "UNLIKE_REPORT"
        // }))
        .then(dispatch(setSelectedReport(reportId)))
    }
}

