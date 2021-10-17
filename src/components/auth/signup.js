import React, { Component } from 'react'
import styled from "styled-components"
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'

class Signup extends Component {

    state = {
        username: '',
        password: '',
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        this.props.userCreate(this.state)
        this.setState({
            username: '',
            password: '',
        })
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <input type="submit" value="Log In"/>
                </form>
            </div>
        )
    }
}

export default Signup