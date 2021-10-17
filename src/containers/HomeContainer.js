import React, { Component} from 'react'

class HomeContainer extends Component {
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(function(position){
        console.log(`Latitude is :`, position.coords.latitude)
        console.log(`Longitude is :`, position.coords.longitude)
        console.log(position)
    })
}
    render(){
        return(
            <div>
                <h1>Welcome to Check Out This Dog!</h1>
                <h3>Create an account to </h3>
            </div>

                
        )
    }
}

export default HomeContainer