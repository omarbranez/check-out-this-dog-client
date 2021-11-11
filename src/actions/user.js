import { Navigate } from "react-router-dom"

const BASE_URL = "http://localhost:3000/"

export const handleLoginFormChange = (e) => ({
    type: "LOGIN_FORM_CHANGE",
    payload: {name: e.target.name, value: e.target.value}
})

export const geolocateUser = ({zip}) => {
    // return dispatch => {
      fetch(`http://dev.virtualearth.net/REST/v1/Locations/US/-/-/${zip}/&key=${process.env.REACT_APP_B_API_KEY}`,
      {
        header: 'Access-Control-Allow-Origin'
    })
      .then(res => res.json())
      .then(console.log)
    // }
  }

export const createUser = (formData, navigate) => {
    geolocateUser(formData.zip)
    // return dispatch => {
    //     (fetch(BASE_URL + "/users", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(formData),
    //     }))
    //     .then(res => res.json())
    //     .then(res => {
    //         if (res.error) {
    //             alert(res.error)
    //         } else {
    //             localStorage.token = res.token
    //             dispatch({
    //                 type: "SET_USER",
    //                 payload: {user: res.user}
    //             })
    //             navigate('/login/success', {replace: true})
                
    //     }})
    // }
}

export const loginUser = (formData, navigate) => {
    return dispatch => {
        fetch(BASE_URL + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                localStorage.token = res.token
                dispatch({
                    type: "SET_USER",
                    payload: {user: res.user}
                })
                // history.push('/map')
                navigate('/login/success', {replace: true})
        }})
    }
}

export const autoLoginUser = () => {
    return dispatch => {
        fetch(BASE_URL + "/autologin", {
            method: 'POST', // not needed?
            headers: {
                'Authorization': localStorage.token,
                // 'Access-Control-Allow-Origin': 
            },
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: "SET_USER",
                payload: {user: res.user}
            })
        })
    }
}

export const logoutUser = (navigate) => {
    return dispatch => {
        localStorage.clear("token")
        dispatch({type: "LOGOUT"})
        navigate('/welcome', {replace: true})
    }
    
}