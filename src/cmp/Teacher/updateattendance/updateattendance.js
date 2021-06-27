import {  Button, Card, CardActionArea, CardActions, CardContent, Checkbox, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Header from '../Header';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { get ,toTitleCase} from '../../CommonCmp';
import Form from './Form'

import AlertMessage from '../../CommonCmp'
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      
     
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      width:50,
      height:50
    },
    form: {
      width: '100%', //Fix IE 11 issue.
      marginTop: theme.spacing(1),
      fontFamily:'rosemary'
    },
    submit: {
      margin: theme.spacing(4,2, 2),
      fontFamily:'Poppins',
      fontSize:18
    },
    font:{
      fontFamily:'Poppins',
      marginLeft:2
    },
    field:{
      margin:'8px 8px -20px 8px'
  }
  }));

function updateattendance(){
    
        return (
            <Grid container >
                <Grid item xs={12}>
                    <Header />
       
                </Grid>
                
                    <Body />
                
            </Grid>
        )
    
}

function Body()
{ 
    const [res, setres] = useState([]);
    
    const [date,setdate]=useState(new Date());
    const [loading, setloading] = useState(false)
    const [uid, setuid] = useState('')
    const [error, seterror] = useState({ is_have: false, message: 'this is an error', type: 'error' })
    const [updateload,setupdateload]=useState(false)
    const classes=useStyles();
    
    const on_submit=async()=>{
        
        
        if(date && uid)
        {setloading(true);
          
          setres([])
          
            const data=await get('/get_attendance_for_update',{token:localStorage.token,stud_uid:uid,date:date});
            setloading(false);
            
            if(data && data.status)
            {
                if(!Object.keys(data.student).length)
                {seterror({ message: 'Data Not Found', is_have: true, type: 'error' })
                setres([])}
                else
                {
                    console.log(data.student);
                setres(data.student)
                }
              
             
            
             
             
            }
            else
            {
              setres([])
              
            }
            

        }

    }
    
    const update_attendance=async()=>{
      setupdateload(true)
      const data=await get('/update_attendance',{token:localStorage.token,data:res});
      if(data && data.status)
      {
        seterror({ message: 'Attendance Updated!', is_have: true, type: 'success' });
        setres([])
        setuid('')

      }
      else
      {
        seterror({ message: 'Error Occured', is_have: true, type: 'error' });

      }
      setupdateload(false)
    }
    return (<>
    <Grid item container xs={12} spacing={1} style={{paddingTop:'70px'}}>
     <AlertMessage error={error.is_have} type={error.type} seterror={seterror} message={error.message} />
        <Form
          loading={loading} 
          
          uid={uid}
          setuid={setuid}
          date={date}
          setdate={setdate}


          on_submit={on_submit}

        

        />
    </Grid>
    <Grid item container xs={12} spacing={1}>

      <Grid item xs={0} lg={4}>

      </Grid>
      <Grid item xs={12} lg={4}>
       {
       Object.keys(res).length?
       <Student_card 
       fetched={res} 
       setfetched={setres} 
       loading={updateload}
       update_attendance={update_attendance}
       />:''
       }
      </Grid>
      <Grid item xs={0} lg={4}>

      </Grid>
    </Grid>
  
    
    
    
    </>)
}


function Student_card(props)
{
    return (<>
    <Card style={{marginTop:'20px'}}>
      <CardActionArea>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Name : {props.fetched.name}
          </Typography>
         
          <Typography variant="h6" color="textSecondary" component="p">
            Status : {props.fetched.status?'Present':'Absent'}
          </Typography>
          <Checkbox
                  checked={props.fetched.status}
                  color="primary"
                  size="medium"
                  
                  onChange={() =>{props.setfetched({...props.fetched,status:!props.fetched.status})}}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
         
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={props.update_attendance}>
          {props.loading?<CircularProgress color='secondary' size={30} />:'Update'}
        </Button>
       
      </CardActions>
    </Card>
    
    
    </>)
}






export default updateattendance
