import React, { Component} from 'react'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {
    render(){
        return(
            <div>
                < NavLink to="/">Home  </NavLink>
                < NavLink to="/profile">My Profile  </NavLink>
                < NavLink to="/reports/new">New Report  </NavLink>
                < NavLink to="/map">Map  </NavLink>
                < NavLink to="/login"> Log In  </NavLink>
                < NavLink to="/register">Register  </NavLink>
                < NavLink to="/breeds">What are dogs, even?  </NavLink>
            </div>
        )
    }
}

export default Navbar