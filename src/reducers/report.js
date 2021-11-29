// const nullReportForm = {
//     id: null,
//     user_id: null,
//     dog_id: null,
//     name: '',
//     // breed: '', 
//     color: '',
//     gender: '',
//     lat: null,
//     lng: null,
//     age: null,
//     features: '',
//     demeanor: '',
//     photo: null,
//     created: '',
// }

const nullReport = {
    id: null,
    user_id: null,
    dog_id: null,
    name: '',
    color: '',
    gender: '',
    lat: null,
    lng: null,
    age: null,
    features: '',
    photo: null,
    created: '',
    liked: false,
    like_id: null,
    commented: false,
    comment_id: null,
    reactions: [],
    comments: []
}

const initialState = {
    reports: [],
    liked: false,
    commented: false,
    selectedReport: nullReport,
    // reportForm: nullReportForm,
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
            // debugger
            return {
                ...state, 
                reports: action.payload,
                // reportForm: nullReportForm,
                loading: false,
            }
        case "SET_SELECTED_REPORT": 
            return {...state, selectedReport: action.payload, liked: action.payload.liked, commented: action.payload.commented, loading: false}
        case "UNSET_SELECTED_REPORT":
            return {...state, selectedReport: nullReport}
        case "REPORT_FORM_CHANGE":
            // debugger
            return { ...state, reportForm: {
                ...state.reportForm,
                [action.payload.name]: action.payload.value
            }
        }
        case "TOGGLE_SHOW_WINDOW":
            // eslint-disable-next-line
            const toggledReport = state.reports.find((report) => report.id == action.payload)
            toggledReport.show = !toggledReport.show
            return { ...state,
                    reports: [
                        ...state.reports.slice(0, toggledReport), ...state.reports.slice(toggledReport + 1)
                    ]
            }
        default: 
            return {...state}
    }

}

export default reportReducer
