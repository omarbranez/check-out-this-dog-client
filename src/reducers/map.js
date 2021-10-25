const initialState = {
    center: {
        lat: 10.99835602,
        lng: 77.01502627,
    },
    zoom: '14',
}

const MapReducer = (state=initialState, action) => {
    switch(action.type){
        case "SET_CENTER":
            // debugger
            console.log(action.payload)
            return {
                ...state,
                center: {
                    lat: action.payload.center.lat,
                    lng: action.payload.center.lng,
                }
            }
        default:
            return {...state}
    }
}

export default MapReducer