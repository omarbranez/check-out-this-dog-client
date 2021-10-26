const breedReducer = (state = {breeds: [], loading: false }, action) => {
    switch(action.type){
        case "LOADING_BREEDS":
            // debugger
            return {
                ...state,
                breeds: [...state.breeds],
                loading: true,
            }
        case "SHOW_BREEDS":
            // debugger
            return {
                ...state, 
                breeds: action.payload.data,
                loading: false,
            }
        default: 
            return {...state}
    }

}

export default breedReducer
