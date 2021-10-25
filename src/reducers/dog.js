const dogReducer = (state = {breeds: [], loading: false }, action) => {
    switch(action.type){
        // debugger
        case "LOADING_BREEDS":
            return {
                ...state,
                breeds: [...state.breeds],
                loading: true,
            }
        case "SHOW_BREEDS":
            return {
                ...state, 
                breeds: action.payload.data,
                loading: false,
            }
        default: 
            return {...state}
    }

}

export default dogReducer
