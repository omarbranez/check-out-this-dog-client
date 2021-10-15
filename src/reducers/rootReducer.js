import currentUserReducer from './currentUser'
import reportReducer from './report'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    currentUser: null,
    reports: null,
})

export default rootReducer