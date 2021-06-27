import { Box, Button, Card, makeStyles, Typography } from '@material-ui/core';
import React from 'react'


const useStyles = makeStyles({
    root: {
      width:'100vw',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
      margin:'15px'
    },
    quote:{
        padding:'20px'
    }
    
  });

const share=()=>{
if(!navigator.share)
{ //if share api is not available in the browser
window.open('whatsapp://send?text='+sessionStorage.quote+' -shared from niet-face-net ')

}
else{
    navigator.share({
        title: 'Hey Check This quote',
        text: sessionStorage.quote+' -shared from niet-face-net ',
        
      });
}

}
  
function Quote(props) {
    const classes=useStyles();
    return (
        <Box className={classes.root}>
       <Typography className={classes.quote} variant="h5" color="textSecondary"><q> {props.data.quote || sessionStorage.quote} </q> -by <cite><b>{props.data.by || sessionStorage.by}</b></cite></Typography>
        <Button variant="contained"
            color="primary"
            style={{color:'white',backgroundColor:'#00dcff',borderRadius:'20px'}} onClick={share}>share</Button>
        </Box>
        
    
   
    )
}

export default Quote
