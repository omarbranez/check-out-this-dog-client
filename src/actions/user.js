const BASE_URL = "http://localhost:3000/"

export const handleLoginFormChange = (e) => ({
    type: "LOGIN_FORM_CHANGE",
    payload: {name: e.target.name, value: e.target.value}
})

export const createUser = (formData) => {
    return dispatch => {
        fetch(BASE_URL + "/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(res => {
            localStorage.token = res.token
            dispatch({
                type: "SET_USER",
                payload: {user: res.user}
            })
        })
    }
}

export const loginUser = (formData) => {
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
            localStorage.token = res.token
            dispatch({
                type: "SET_USER",
                payload: {user: res.user}
            })
        })
    }
}

export const autoLoginUser = () => {
    return dispatch => {
        fetch(BASE_URL + "/autologin", {
            method: 'POST',
            headers: {
                'Authorization': localStorage.token
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

export const logoutUser = () => {
    return dispatch => {
        localStorage.clear("token")
        dispatch({type: "LOGOUT"})
    }
}