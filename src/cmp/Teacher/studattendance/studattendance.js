import {  Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Header from '../Header';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { get ,toTitleCase} from '../../CommonCmp';
import Form from './Form'
import Stud_data_grid from './Stud_data_grid'
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

function studattendance(){
    
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
    const [departments, setdepartments] = useState({ 'values': ['Computer Science'], 'short': ['CSE'] })
    const [sections, setsections] = useState(['A', 'B', 'C', 'D'])
    const [section,setsection] =useState('');
    const [branch,setbranch]=useState('');
    const [errors, seterrors] = useState('');
    const [loading, setloading] = useState(false)
    const [semester, setsemester] = useState('')
    const [error, seterror] = useState({ is_have: false, message: 'this is an error', type: 'error' })

    const classes=useStyles();
    const on_submit=async()=>{
        
        
        if(branch && section)
        {setloading(true);
          seterrors('')
          setres([])
          
            const data=await get('/get_attendance_by_class',{token:localStorage.token,stud_class:branch+'-'+section,department:branch,semester:semester});
            setloading(false);
            if(data && data.status)
            {
             if(!data.students.length)
             {seterror({ message: 'Data Not Present', is_have: true, type: 'error' })
             setres([])}
             else
             {
              setres(data.students)
             }
              
             
            
             
             
            }
            else
            {
              setres([])
              
            }
            

        }

    }
    return (<>
    <Grid item container xs={12} spacing={1} style={{paddingTop:'70px'}}>
    <AlertMessage error={error.is_have} type='error' seterror={seterror} message={error.message} />
        <Form
        loading={loading} 
        section={section} 
        branch={branch} 
        semester={semester}
        setsection={setsection}
        setbranch={setbranch}
        setsemester={setsemester}

        on_submit={on_submit}

        departments={departments}
        sections={sections}

        />
        
    </Grid>
   
    {/* {res.length?<Stud_table fetched={res}/>:''} */}
    {res.length?<Stud_data_grid fetched={res}/>:''}
    
    
    
    </>)
}







export default studattendance
