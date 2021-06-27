import { Avatar, Grid, Typography } from '@material-ui/core'
import { React, useEffect, useState } from 'react'
import {get, Loading,toTitleCase} from '../CommonCmp'
import useStyles,{StyledBadge} from '../Student/style'
import Header from './Header'
import Quote from '../Student/Quote'
import { SimpleCard } from '../Student/CardSection'


function Teacher_index(){
const [name,setname]=useState('')
    return (
        <Grid container >
            <Grid item xs={12}>
                <Header setname={setname}/>

            </Grid>
            <Grid item container xs={12} style={{paddingTop:'50px'}}>
                <Body name={name}/>
            </Grid>
        </Grid>
    )
}

function Body(props){
    const [loading, setloading] = useState(true);
    const [quote, setquote] = useState('')
    const classes=useStyles();

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
              
                setloading(false);
               
              
           
        }
       
       

    }
         
    if(!sessionStorage.quote)
    {fetch_data()}
    else
    {
        setloading(false)
    }
    
     
     return () => {
         
     }
     
 }, []);


    if(loading) return <Loading/>;

    return (
        <>
        <Grid container s={12} lg={12} className={classes.container}>
            <Grid item xs={12} className={classes.center} lg={4}>
                        <StyledBadge
                            overlap="circle"
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                            }}
                            variant="dot"
                        >
                <Avatar  className={classes.avatarsize} src={sessionStorage.avatar? `data:image/png;base64,` + sessionStorage.avatar:'Default Image'} />
                </StyledBadge>
                </Grid>
                <Grid item xs={12} lg={4} className={classes.center}>
                <Typography variant="h5">Welcome,<b>{sessionStorage.name && toTitleCase(sessionStorage.name).split(' ')[0]}</b></Typography>
                </Grid>

                
                    
            </Grid>
        <Quote data={quote}/>
        <CardSection/>
        </>
    )

}


function CardSection()
{


    return (
        <>
        <Grid container lg={12}>
        <Grid item xs={12} lg={4}>
            <SimpleCard text="Take Attendance" src="data:image/png;base64,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" goto="/teacher/attendance"/>
            </Grid>
            <Grid item xs={12} lg={4}>
            <SimpleCard text="Check Attendance" src="https://cdn2.iconfinder.com/data/icons/education-59/128/check_up-512.png" goto="/teacher/checkattendance"/>
            </Grid>
            <Grid item xs={12} lg={4}>
            <SimpleCard text="Update Attendance" src="https://icons.iconarchive.com/icons/custom-icon-design/flatastic-4/512/Male-user-edit-icon.png" goto="/teacher/updateattendance"/>
            </Grid>
            
            <Grid item xs={12} lg={4}>
            <SimpleCard text="Help" src="https://img.flaticon.com/icons/png/512/682/682055.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"/>
            </Grid>
        </Grid>
        
        </>
    )
}


export default Teacher_index
