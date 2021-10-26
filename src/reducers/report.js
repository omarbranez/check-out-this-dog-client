const nullReportForm = {
    userId: '',
    dogId: '',
    name: '',
    breed: '', 
    color: '',
    gender: '',
    lat: '',
    lng: '',
    age: '',
    features: '',
    photo: ''
}

const initialState = {
    reports: [],
    reportForm: nullReportForm,
    loading: false,
}

const reportReducer = (state=initialState, action) => {
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
        case "REPORT_FORM_CHANGE":
            // debugger
            return { ...state, reportForm: {
                ...state.reportForm,
                [action.payload.name]: action.payload.value
            }
        }
        default: 
            return {...state}
    }

}

export default reportReducer
