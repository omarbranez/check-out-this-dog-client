
const initialState = {
    id: null,
    username: '',
    defaultCenter: {
        lat: null,
        lng: null
    },
    currentCenter: { 
        lat: null,
        lng: null,
    },
    geolocating: false,
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case "LOGIN_FORM_CENTER_CHANGE":
            return {...state, loginForm: {
                ...state.loginForm,
                lat: action.payload.lat,
                lng: action.payload.lng,
            }}
        case "SET_USER":
            console.log(action.payload.lat)
            return {...state, ...action.payload,
            defaultCenter: {
                lat: action.payload.lat,
                lng: action.payload.lng
            },
            currentCenter: {
                lat: action.payload.lat,
                lng: action.payload.lng,
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
        default:
            return {...state}
    }
}

export default userReducer