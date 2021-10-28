const initialLoginForm = {
    username: '',
    password: '',
    passwordConfirmation: '',
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
        case "SET_USER":
            return {...state, ...action.payload.user}
        case "LOGOUT":
            return {...state, username: '', id: null}
        default:
            return {...state}
    }
}

export default userReducer