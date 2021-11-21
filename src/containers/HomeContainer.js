import React from 'react'
import background from '../dog-walking.gif'

// class HomeContainer extends Component {
    // componentDidMount(){
    //     // navigator.geolocation.getCurrentPosition(function(position){
    //     // console.log(`Latitude is :`, position.coords.latitude)
    //     // console.log(`Longitude is :`, position.coords.longitude)
    //     // console.log(position)
    // })

    // render(){
const HomeContainer = () => {

return (
    <div style={{backgroundImage: `url(${background})`, backgroundSize: 'cover'}}>
        {/* <img src="./dog-walking.gif"/> */}
        {/* <div> */}
        <img src='./muttmap-logo.png'></img>
        <h1 style={{color: 'white', textShadow: '1px 1px 2px black'}}>Welcome to MuttMap!</h1>
        <h3 style={{color: 'white', textShadow: '1px 1px 2px black'}}>Create an account to know when GOODBOIS and GOODGIRLS are in your neighborhood!</h3>
        <p>‎</p>{/* whitespace characters to allow the whole background to load*/}
        <p>‎</p>
        <p>‎</p>
        <p>‎</p>
        <p>‎</p>
        <p>‎</p>


        {/* </div> */}
    </div>


)
}


export default HomeContainer