import userReducer from './user'
import reportReducer from './report'
import breedReducer from './breed'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    user: userReducer,
    reports: reportReducer,
    breeds: breedReducer,
})

export default rootReducer