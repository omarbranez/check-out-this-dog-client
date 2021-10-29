import React, { Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { isUserLoggedIn } from '../util/auth'

class Navbar extends Component {
    render(){
        const username = this.props.user.username
        return(
            <div>
                < NavLink to="/">Home  </NavLink>
                {isUserLoggedIn() ? < NavLink to={"/profile/"+`${username}`}>{username}'s Profile  </NavLink> : null}
                {isUserLoggedIn() ? < NavLink to="/reports/new">New Report  </NavLink> : null}
                < NavLink to="/map">Map  </NavLink>
                {isUserLoggedIn() ? null : < NavLink to="/login"> Log In  </NavLink>}
                {isUserLoggedIn() ? null : < NavLink to="/signup">Sign Up  </NavLink>}
                < NavLink to="/breeds">What are dogs, even?  </NavLink>
                {isUserLoggedIn() ? < NavLink to="/logout">Log Out </NavLink> : null }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Navbar)