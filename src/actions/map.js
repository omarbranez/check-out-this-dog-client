export const setCenter = () => {
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
        })
}}