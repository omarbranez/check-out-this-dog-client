import React from 'react'
import { Outlet, Navigate } from "react-router-dom"
import isUserLoggedIn from "../util/auth"

const PrivateOutlet = () => {
    const auth = isUserLoggedIn()
    console.log(auth)
    return auth ? <Outlet /> : <Navigate to='/login'/>
}

export default PrivateOutlet