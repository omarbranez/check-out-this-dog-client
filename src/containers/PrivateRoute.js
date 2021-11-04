import { Route, Navigate } from 'react-router-dom'
import isUserLoggedIn from '../util/auth'

const PrivateRoute = ({ element, path }) => {
    const ele = isUserLoggedIn() === true ? element : <Navigate replace to='/login'/>
    return <Route path={path} element={ele}/>
}

export default PrivateRoute