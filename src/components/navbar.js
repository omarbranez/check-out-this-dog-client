import React, { Component} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '@mui/material/Button'
import isUserLoggedIn from '../util/auth'

class Navbar extends Component {
    render(){
        const username = this.props.user
        // return(
        //     <div>
        //         < NavLink to="/">Home  </NavLink>
        //         {/* {isUserLoggedIn() ? < NavLink to={"/profile/"+`${username}`}>{username}'s Profile  </NavLink> : null} */}
        //         {isUserLoggedIn() ? < NavLink to={"/profile/"+`${username}`}>{username}'s Profile  </NavLink> : null}
        //         {isUserLoggedIn() ? < NavLink to="/reports/new">New Report  </NavLink> : null}
        //         < NavLink to="/map">Map  </NavLink>
        //         < NavLink to="/reports">News Feed   </NavLink>
        //         {isUserLoggedIn() ? null : < NavLink to="/login"> Log In  </NavLink>}
        //         {isUserLoggedIn() ? null : < NavLink to="/signup">Sign Up  </NavLink>}
        //         < NavLink to="/breeds">What are dogs, even?  </NavLink>
        //         {isUserLoggedIn() ? < NavLink to="/logout">Log Out </NavLink> : null }
        //     </div>
        // )
        return(
            <div>
                < Link to="/"><button>Home</button>  </Link>
                {/* {isUserLoggedIn() ? < Link to={"/profile/"+`${username}`}>{username}'s Profile  </Link> : null} */}
                {isUserLoggedIn() ? < Link to={"/profile/"+`${username}`}><button variant="contained" >{username}'s Profile</button></Link> : null}
                {isUserLoggedIn() ? < Link to="/reports/new"><button variant="contained"on >New Report</button></Link> : null}
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

// return(
//     <div>
//         < Link to="/"><Button variant="contained">Home</Button>  </Link>
//         {/* {isUserLoggedIn() ? < Link to={"/profile/"+`${username}`}>{username}'s Profile  </Link> : null} */}
//         {isUserLoggedIn() ? < Link to={"/profile/"+`${username}`}><Button variant="contained" >{username}'s Profile</Button></Link> : null}
//         {isUserLoggedIn() ? < Link to="/reports/new"><Button variant="contained"on >New Report</Button></Link> : null}
//         < Link to="/map"><Button variant="contained" >Map</Button></Link>
//         < Link to="/reports"><Button variant="contained" >News Feed</Button></Link>
//         {isUserLoggedIn() ? null : < Link to="/login"><Button variant="contained" >Log In </Button></Link>}
//         {isUserLoggedIn() ? null : < Link to="/signup"><Button variant="contained" >Sign Up</Button></Link>}
//         < Link to="/breeds"><Button variant="contained" >Breed Guide</Button></Link>
//         {isUserLoggedIn() ? < Link to="/logout"><Button variant="contained">Log Out</Button></Link> : null }
//     </div>
// )