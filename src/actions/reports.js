const REPORTS_URL = 'http://localhost:3000/encounters'

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
    fData.append('photo', reportData.photo)

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


