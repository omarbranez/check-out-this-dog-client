export const setCenter = () => {
  return dispatch => { // try watchPosition
    navigator.geolocation.getCurrentPosition(position => {
      dispatch({ type: "LOADING_MAP" })
      dispatch({
        type: "SET_NEW_CENTER", payload: {
          currentCenter: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        }
      })
    })
  }
}

export const resetCenter = () => ({
  type: "SET_DEFAULT_CENTER"
})