import {React, useEffect, useState}from 'react'

import Header from './Header'
import {Loading,get,toTitleCase} from '../CommonCmp'
import { Avatar, Button, Grid, Typography } from '@material-ui/core'
import useStyles,{StyledBadge} from './style'
import CircularProgresswithLabel from './CircularProgresswithLabel'
import { NavigateNext } from '@material-ui/icons'
import CardSection from './CardSection'
import { useHistory } from 'react-router-dom'
import Quote from './Quote'

function Student_index(){
   const [name,setname]=useState('');
    
    return (
        <Grid container >
             <Grid item xs={12}>
                 <Header setname={setname}/>
             </Grid>
             
              <Body name={name}/>
             
             
        </Grid>
    )

}

function Body(props)
{   
    const [loading, setloading] = useState(true);
    const [quote, setquote] = useState('');
    const [attendance,setattendance]=useState('');
    const history=useHistory();

 useEffect(() => {

     async function fetch_data()
     {   
         const res=await get('/quotes');
        
         if(res && res.status)
         {
             setquote(res.quote);
                
                //for cache data
                sessionStorage.quote=res.quote.quote
                sessionStorage.by=res.quote.by
           
         }
        
        

     }

     async function fetch_attendance()
     {
        const attendance_data=await get('/get_attendance',{token:localStorage.token});
        if(attendance_data && attendance_data.status)
        {
            setattendance(attendance_data.attendance);
            console.log(attendance_data);
            setloading(false)

        }

     }
    if(!sessionStorage.quote)
    {
        fetch_data()
    }
    
    fetch_attendance();
    
    
     
     
     return () => {
         
     }

 }, []);

 const classes=useStyles();

    if(loading) return <Loading/>;

    return (
        <>
        <Grid container s={12} lg={12} className={classes.container} >
            <Grid item xs={12} className={classes.center} lg={4}>
                    <StyledBadge
                overlap="circle"
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                variant="dot"
            >
            <Avatar  className={classes.avatarsize}  src={sessionStorage.avatar? `data:image/png;base64,` + sessionStorage.avatar:'Default Image'} />
            </StyledBadge>
            </Grid>
            <Grid item xs={12} lg={4} className={classes.center}>
              <Typography variant="h5">Welcome,<b>{sessionStorage.name && toTitleCase(sessionStorage.name).split(' ')[0]}</b></Typography>
            </Grid>

            <Grid item xs={12} lg={4} className={classes.center} style={{flexDirection:'column'}}>
                <CircularProgresswithLabel color='green' size={120} value={attendance}/><br/>
                <Button variant="outlined" onClick={()=>history.push('student/attendance')} style={{borderRadius:'20px'}}>View Report<NavigateNext/></Button>
            </Grid>



            
              
              
        </Grid>
        <CardSection/>
        <Quote data={quote}/>
        </>
    )

}


export default Student_index
