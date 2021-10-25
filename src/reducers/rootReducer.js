import currentUserReducer from './currentUser'
import reportReducer from './report'
import mapReducer from './map'
import dogReducer from './dog'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    currentUser: null,
    reports: reportReducer,
    mapCoordinates: mapReducer,
    breeds: dogReducer,
})

export default rootReducer