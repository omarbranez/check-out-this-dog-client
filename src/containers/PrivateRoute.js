// import React from 'react'
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isUserLoggedIn } from '../util/auth'

const PrivateRoute = ({ component: Component, ...rest}) => {
   
    return (
        <Route {...rest} render={props => (
            isUserLoggedIn() ? 
            <Component {...props}/>
            : <Redirect to='/login'/>
        )} />
    )
}

export default PrivateRoute