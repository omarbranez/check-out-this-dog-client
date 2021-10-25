const BASE_URL = 'http://localhost:3000/encounters'

export const getReports = () => {
    return dispatch => {
        // debugger
        dispatch({ type: "LOADING_REPORTS"})
        fetch(BASE_URL, {
            header: 'Access-Control-Allow-Origin'
        })
        .then(res => res.json())
        // .then((responseJSON) => console.log(responseJSON.data))
        .then(responseJSON => dispatch({
            type: "ADD_REPORTS",
            payload: responseJSON,
        })
    )}
}
