import React, {useState} from 'react'
import Tooltip from '@mui/material/Tooltip'
import { useHistory } from 'react-router-dom'

const ReportButton = (props) => {
    
    const history = useHistory()
    
    const [open, setOpen] = useState(false)
    
    const Button = React.forwardRef(function Button(props, ref){
        return <div {...props} ref={ref}><img className='reportButton' src='../reportButton.png' alt='report button'></img></div>})
    
    const handleClick = () => {
        setOpen(false)
    }
    
    return (
        <div>
            <Tooltip title='Click here to report a new dog sighting!' placement='top-start' open={open} disableHoverListener disableFocusListener>
                <Button onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} onClick={handleClick}/>
            </Tooltip>
        </div>
    )
} 

export default ReportButton