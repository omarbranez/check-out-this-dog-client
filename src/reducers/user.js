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
    defaultCenter: {
        lat: '',
        lng: ''
    },
    currentCenter: { // able to keep this logic in the reducer instead of a local state in map container
        lat: '',
        lng: '',
    },
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
            // debugger
            return {...state, ...action.payload.user,
            defaultCenter: {
                lat: action.payload.user.lat,
                lng: action.payload.user.lng
            },
            currentCenter: {
                lat: action.payload.user.lat,
                lng: action.payload.user.lng,
            }}
        case "SET_NEW_CENTER":
            return {...state, ...action.payload}
        case "SET_DEFAULT_CENTER":
            return {...state, 
                currentCenter: {
                    lat: state.defaultCenter.lat,
                    lng: state.defaultCenter.lng,
            }}
        case "LOGOUT":
            return {...state, username: '', id: null}
        default:
            return {...state}
    }
}

export default userReducer