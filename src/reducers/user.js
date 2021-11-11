const initialLoginForm = {
    username: '',
    password: '',
    passwordConfirmation: '',
    lat: '',
    lng: '',
}

const initialState = {
    id: null,
    username: '',

    loginForm: initialLoginForm,
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case "LOGIN_FORM_CHANGE":
            return {...state, loginForm: {
                ...state.loginForm,
                [action.payload.name]: action.payload.value
            }}
        case "LOGIN_FORM_CENTER_CHANGE":
            debugger
            return {...state, loginForm: {
                ...state.loginForm,
                lat: action.payload.lat,
                lng: action.payload.lng,
            }}
        case "SET_USER":
            return {...state, ...action.payload.user}
        case "LOGOUT":
            return {...state, username: '', id: null}
        default:
            return {...state}
    }
}

export default userReducer