import currentUserReducer from './currentUser'
import userReducer from './user'
import reportReducer from './report'
// import mapReducer from './map'
import breedReducer from './breed'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    currentUser: null,
    user: userReducer,
    reports: reportReducer,
    // mapCoordinates: mapReducer,
    breeds: breedReducer,
})

export default rootReducer