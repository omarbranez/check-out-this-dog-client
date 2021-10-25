const nullReport = {
    userId: '',
    dogId: '',
    name: '',
    color: '',
    lat: '',
    lng: '',
    age: '',
    features: '',
    photo: ''
}

const reportReducer = (state = {reports: [], loading: false }, action) => {
    switch(action.type){
        // debugger
        case "LOADING_REPORTS":
            return {
                ...state,
                reports: [...state.reports],
                loading: true,
            }
        case "ADD_REPORTS":
            return {
                ...state, 
                reports: action.payload.data,
                loading: false,
            }
        default: 
            return {...state}
    }

}

export default reportReducer
