const initialState = {
    center: {
        lat: null,
        lng: null,
    },
    zoom: '14',
}

const mapReducer = (state=initialState, action) => {
    switch(action.type){
        case "LOADING_MAP":
            return {
                ...state,
                loading: true,
            }
        case "SET_CENTER":
            // debugger
            console.log(action.payload)
            return {
                ...state,
                center: {
                    lat: action.payload.center.lat,
                    lng: action.payload.center.lng,
                },
                loading: false
            }
        default:
            return {...state}
    }
}

export default mapReducer