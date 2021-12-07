import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../actions/userActions'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from "@mui/material/InputAdornment"
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Tooltip from '@mui/material/Tooltip'





const AuthLoginForm = ({loginUser}) => {

    const navigate = useNavigate()
    
    const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    const [values, setValues] = useState({
        password: '',
        showPassword: false
    })
    // const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        // password === passwordConfirmation ? loginUser({username: username, password: password}, navigate) : alert("Passwords do not match")
        username !== '' && values.password !== '' ? loginUser({username: username, password: values.password}, navigate) : alert("All fields must be filled")
        setUsername('')
        setValues({password: '', showPassword: false})
        // setPasswordConfirmation('')
    }

    const handleClickShowPassword = (e) => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        })
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault()
    }
    return (
        // <div>
        //     <form onSubmit={handleSubmit}>
        //         <label>Username:</label><br/>
        //         <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
        //         <label>Password</label><br/>
        //         <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
        //         <label>Confirm Password</label><br/>
        //         <input type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} /><br/>
        //         <input type="submit" value="Log In" />
        //     </form>
        // </div>
        <Box
            component="form"
            sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
            noValidate
            autoComplete="off"
        >
            <h1 style={{margin: '0 auto'}}>Log In To MuttMap</h1>
            <TextField
                id="outlined-name"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br/>
            {/* <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /> */}
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    // label="Password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={(e) => setValues({password: e.target.value})}
                    endAdornment={
                <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
            <br/>
            <Button variant="contained" onClick={handleSubmit}>Log In</Button>
        </Box>
    )
}

// const mapStateToProps = (state) => ({
//     // form: state.user.loginForm
// })

export default connect(null, { loginUser})(AuthLoginForm)