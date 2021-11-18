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
        lat: null,
        lng: null
    },
    currentCenter: { // able to keep this logic in the reducer instead of a local state in map container
        lat: null,
        lng: null,
    },
    loginForm: initialLoginForm,
    geolocating: false,
    // bounds: {
    //     sw: {
    //         lat: null,
    //         lng: null,
    //     },
    //     ne: {
    //         lat: null,
    //         lng: null,
    //     }
    // }
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case "LOGIN_FORM_CHANGE":
            return {...state, loginForm: {
                ...state.loginForm,
                [action.payload.name]: action.payload.value
            }}
        case "LOGIN_FORM_CENTER_CHANGE":
            // debugger
            return {...state, loginForm: {
                ...state.loginForm,
                lat: action.payload.lat,
                lng: action.payload.lng,
            }}
        case "SET_USER":
            return {...state, ...action.payload.user,
            defaultCenter: {
                lat: action.payload.user.lat,
                lng: action.payload.user.lng
            },
            currentCenter: {
                lat: action.payload.user.lat,
                lng: action.payload.user.lng,
            }}
        case "SET_DEFAULT_CENTER":
            return {
                ...state,
                currentCenter: {
                    lat: state.defaultCenter.lat,
                    lng: state.defaultCenter.lng,
                }
            }
        case "SET_NEW_CENTER":
            return { ...state, ...action.payload }
        case "CURRENTLY_GEOLOCATING":
            return {...state, geolocating: true}
        case "FINISHED_GEOLOCATING":
            return {...state, geolocating: false}
        case "LOGOUT":
            return {initialState}
        // case "SET_BOUNDS":
        //     // debugger
        //     return {...state, bounds: {sw: action.payload.bounds[0], ne: action.payload.bounds[1]} }
        // case "RESET_BOUNDS":
        //     return {...state, bounds: {sw: null, ne: null}}
        default:
            return {...state}
    }
}

export default userReducer