import React, {useEffect} from 'react'
import { useNavigate } from 'react-router'

const LoginSuccess = (props) => {
    
    const navigate = useNavigate()
    
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/map', { redirect: true})
        }, 3000) 
        return () => clearTimeout(timer)
    })
    
    return (
        <h2>Login successful! Redirecting you to the Map!</h2>
    )
}

export default LoginSuccess