export const setCenter = () => {
  return dispatch => { // try watchPosition
    navigator.geolocation.getCurrentPosition(position => {
      dispatch({ type: "LOADING_MAP" })
      dispatch({
        type: "SET_CENTER", payload: {
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        }
      })
    })
  }
}

export const geolocateAddress = ({zip}) => {
  // return dispatch => {
    fetch(`http://dev.virtualearth.net/REST/v1/Locations/US/-/-/${zip}/&key=${process.env.REACT_APP_B_API_KEY}`)
    .then(res => res.json())
    .then(console.log)
  // }
}