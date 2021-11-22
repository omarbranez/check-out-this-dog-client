import { Navigate } from "react-router-dom"

const BASE_URL = "http://localhost:3000/"

export const handleLoginFormChange = (e) => ({
    type: "LOGIN_FORM_CHANGE",
    payload: {name: e.target.name, value: e.target.value}
})

export const getLatLngOutput = (lat, lng) => ({
    type: "LOGIN_FORM_CENTER_CHANGE",
    payload: {lat, lng}
})

export const createUser = (formData, navigate) => {
    console.log(formData)
    return dispatch => {
        (fetch(BASE_URL + "/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }))
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
                navigate('/login/success', {replace: true})
                
        }})
    }
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
                navigate('/login/success', {replace: true})
        }})
    }
}

export const autoLoginUser = () => {
    console.log("hello")
    return dispatch => {
        fetch(BASE_URL + "/autologin", {
            method: 'POST', // not needed?
            headers: {
                'Authorization': localStorage.token,
                // 'Access-Control-Allow-Origin': 
            },
        })
        .then(res => res.json())
        // .then(console.log(res))
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