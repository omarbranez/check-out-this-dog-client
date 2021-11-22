import React from 'react';
import Button from '@mui/material/Button';

const GradientButton = (props) => {
  return (
    // <Stack direction="row" spacing={2}>
    <div>
      {/* <Button variant="contained" style={{background:
        'linear-gradient(to right, #03018C, #212AA5, #4259C3, #7B9FF2'}}>Secondary</Button><br/> */}
      <Button variant="contained"><br/>
        {props.text}
      </Button><br/>
      {/* <Button varianwt="outlined" color="error">
        Error
      </Button> */}
      </div>
    // </Stack>
  );
}

export default GradientButton