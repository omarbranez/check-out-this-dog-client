import React, { Component } from 'react'
import styled from "styled-components"
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleLoginFormChange, loginUser} from '../../actions/user'
import { isUserLoggedIn } from '../../util/auth'
const LoginForm = (props) => {
    const navigate = useNavigate()
    const { form, handleLoginFormChange, loginUser } = props
    const { username, password, passwordConfirmation } = form

    const handleSubmit = (e) => {
        e.preventDefault()
        password === passwordConfirmation ? loginUser({username: username, password: password}, navigate) : alert("Passwords do not match")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username:</label><br/>
                <input type="text" name="username" value={username} onChange={handleLoginFormChange} /><br/>
                <label>Password</label><br/>
                <input type="password" name="password" value={password} onChange={handleLoginFormChange} /><br/>
                <label>Confirm Password</label><br/>
                <input type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={handleLoginFormChange} /><br/>
                <input type="submit" value="Log In" />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    form: state.user.loginForm
})

export default connect(mapStateToProps, { handleLoginFormChange, loginUser})(LoginForm)