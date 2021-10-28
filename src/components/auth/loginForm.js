import React, { Component } from 'react'
import styled from "styled-components"
import { connect } from 'react-redux'
import { withRouter, useHistory } from 'react-router'
import { handleLoginFormChange, loginUser} from '../../actions/user'

const LoginForm = (props) => {
    const history = useHistory()
    const { form, handleLoginFormChange, loginUser } = props
    const { username, password, passwordConfirmation } = form

    const handleSubmit = (e) => {
        e.preventDefault()
        password === passwordConfirmation ? loginUser({username: username, password: password}) : alert("Passwords do not match")
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

export default connect(mapStateToProps, { handleLoginFormChange, loginUser})(withRouter(LoginForm))