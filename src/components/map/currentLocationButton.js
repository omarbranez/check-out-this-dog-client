import React, {useState} from 'react'
import Tooltip from '@mui/material/Tooltip'

const CurrentLocationButton = (props) => {

    
    const [open, setOpen] = useState(false)
    
    const Button = React.forwardRef(function Button(props, ref){
        return <div {...props} ref={ref}><img className='currentLocationButton' src='../currentLocationButton.jpg' alt='current location button'></img></div>})
    
    const handleClick = () => {
        setOpen(false)
    }
    
    return (
        <div>
            <Tooltip title='Click here to find your current location!' placement='top-start' open={open} disableHoverListener disableFocusListener>
                <Button onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} onClick={handleClick}/>
            </Tooltip>
        </div>
    )
} 

export default CurrentLocationButton