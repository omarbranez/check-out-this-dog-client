import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/user'

const LogoutPage = (props) => {
    const navigate = useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
            props.logoutUser(navigate)
        }, 3000) 
        return () => clearTimeout(timer)
    })

    return(
        <h2>You have been logged out. Redirecting you to the home page!</h2>
    )
}

export default connect(null, {logoutUser})(LogoutPage)