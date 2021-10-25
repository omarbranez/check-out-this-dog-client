export const setCenter = () => {
    return dispatch => {
        navigator.geolocation.getCurrentPosition(position =>  {
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
            // this.setState({
            dispatch({type: "SET_CENTER", payload: {
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }
            }
            })
        // .then((responseJSON) => console.log(responseJSON.data))
        })
}}