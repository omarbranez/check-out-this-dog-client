import currentUserReducer from './currentUser'
import reportReducer from './report'
import mapReducer from './map'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    currentUser: null,
    reports: reportReducer,
    mapCoordinates: mapReducer,
})

export default rootReducer