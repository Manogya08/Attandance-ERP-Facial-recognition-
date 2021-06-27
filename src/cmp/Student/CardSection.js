import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';
import { Avatar, Box, Button, Fab, Grid } from '@material-ui/core';
import { ArrowRight, NavigateNext } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    margin:'10px',
    paddingTop:'20px',
    paddingBottom:'20px'
  },
  text:{
    paddingTop:'5px',
    paddingBottom:'5px'
  }
  
});


export default function CardSection() {
    return (
        <>
        <Grid container lg={12}>
            <Grid item xs={12} lg={4}>
            <SimpleCard text="My Attendance" src="https://images.squarespace-cdn.com/content/v1/55e76219e4b03fb450e52fe5/1523473508155-ADE8YKHYEZ21Q3YJW3QL/ke17ZwdGBToddI8pDm48kIpJu6BuS1ZwX2UljWP57L1Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGQCHcT-ApMOC-C7Q9FThJowH2vqWQSwdZGp84M57hcyZuG45vQwBxdpDrCGUSSl5w/graph+icon.png" goto="/student/attendance"/>
            </Grid>
            <Grid item xs={12} lg={4}>
            <SimpleCard text="Upload Image" src="https://png.pngtree.com/png-vector/20191129/ourlarge/pngtree-image-upload-icon-photo-upload-icon-png-image_2047547.jpg" goto="/student/upload"/>
            </Grid>
            <Grid item xs={12} lg={4}>
            <SimpleCard text="Help" src="https://img.flaticon.com/icons/png/512/682/682055.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"/>
            </Grid>

        
        
        </Grid>
        
        </>
    )
}


 function SimpleCard(props) {
  const classes = useStyles();
  const history=useHistory();
  
  return (
    <Card className={classes.root} onClick={()=>history.push(props.goto)}>
     
          <Avatar style={{height:80,width:80}} src={props.src}/>
          <Typography variant="h5" className={classes.text}>{props.text}</Typography>
          <Fab color="green" style={{height:'40px',width:'40px',backgroundColor:'white'}}><NavigateNext/></Fab>
     
    </Card>
  );
}

export{
  SimpleCard
}
