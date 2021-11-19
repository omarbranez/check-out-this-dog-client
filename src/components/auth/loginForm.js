import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../actions/user'

const LoginForm = ({loginUser}) => {

    const navigate = useNavigate()
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        password === passwordConfirmation ? loginUser({username: username, password: password}, navigate) : alert("Passwords do not match")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username:</label><br/>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
                <label>Password</label><br/>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
                <label>Confirm Password</label><br/>
                <input type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} /><br/>
                <input type="submit" value="Log In" />
            </form>
        </div>
    )
}

// const mapStateToProps = (state) => ({
//     // form: state.user.loginForm
// })

export default connect(null, { loginUser})(LoginForm)