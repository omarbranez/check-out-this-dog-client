import currentUserReducer from './currentUser'
import reportReducer from './report'
import mapReducer from './map'
import breedReducer from './breed'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    currentUser: null,
    reports: reportReducer,
    mapCoordinates: mapReducer,
    breeds: breedReducer,
})

export default rootReducer