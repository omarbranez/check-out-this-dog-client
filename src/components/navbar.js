import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import isUserLoggedIn from '../util/auth'

class Navbar extends Component {
    render(){
        const username = this.props.user

        return(
            <div>
                < Link to="/"><button>Home</button>  </Link>
                {/* {isUserLoggedIn() ? < Link to={"/profile/"+`${username}`}>{username}'s Profile  </Link> : null} */}
                {isUserLoggedIn() ? < Link to={"/profile/"+`${username}`}><button variant="contained" >{username}'s Profile</button></Link> : null}
                {isUserLoggedIn() ? < Link to="/reports/new"><button variant="contained" >New Report</button></Link> : null}
                < Link to="/map"><button variant="contained" >Map</button></Link>
                < Link to="/reports"><button variant="contained" >News Feed</button></Link>
                {isUserLoggedIn() ? null : < Link to="/login"><button variant="contained" >Log In </button></Link>}
                {isUserLoggedIn() ? null : < Link to="/signup"><button variant="contained" >Sign Up</button></Link>}
                < Link to="/breeds"><button variant="contained" >Breed Guide</button></Link>
                {isUserLoggedIn() ? < Link to="/logout"><button variant="contained">Log Out</button></Link> : null }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.username
})

export default connect(mapStateToProps)(Navbar)