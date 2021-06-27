import { Grid, lighten, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Loading ,get} from '../../CommonCmp'
import Header from '../Header'

import Paper from '@material-ui/core/Paper';

function Checkattendance() {
    return (
        <Grid container >
            <Grid item xs={12}>
                <Header />

            </Grid>
            <Grid item container xs={12} style={{ paddingTop:'70px'}}>
                <Body />
            </Grid>
        </Grid>
    )
}

function Body() {
    const [loading, setloading] = useState(true)
    const [res, setres] = useState([])
    const [attendance,setattendance]=useState('')

    
    useEffect(() => {
        async function get_data()
        {
        
         const data=await get('/get_attendance',{token:localStorage.token});
         if(data && data.status)
         {
          setloading(false);
          console.log(data);
          setres(data.stud_data)
          setattendance(data.attendance)
         }
        

        }
        get_data();
        
       
    }, [])
    
    if(loading) return <Loading/>

    return <Stud_table fetched={res} attendance={attendance}/>


}


const useStyles = makeStyles({
    table: {
    
     
     
    },
    th: {
      fontSize:18,
      textDecoration: 'bold',
      backgroundColor: '#3f51b5',
      color: 'white'
    },
    tfooter: {
      fontSize: 18
    },
    highlight: {
      backgroundColor: lighten('rgb(71, 145, 219)', 0.75),
      color: 'white'
    }
  });


function Stud_table(props)
{  const classes=useStyles();

   
    return (<>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.th}>
          <TableRow className={classes.th}>
            <TableCell align="center" className={classes.th}>Subject</TableCell>
            <TableCell align="center" className={classes.th} >Total</TableCell>
            <TableCell align="center" className={classes.th}>Present</TableCell>
            <TableCell align="center" className={classes.th}>per(%)</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {props.fetched.map((row) => (

            <TableRow key={row.subject} >
              <TableCell component="th" scope="row" align="center">
                {row.subject.toUpperCase()}
              </TableCell>
              <TableCell align="center">{row.total}</TableCell>
              <TableCell align="center">{row.present}</TableCell>
              <TableCell align="center">{Math.round((row.present/row.total)*10000)/100}%</TableCell>

            </TableRow>
          ))}

           <TableRow key={'overall'} className={classes.tfooter} >
              <TableCell component="th" scope="row" align="center" colSpan={4} className={classes.tfooter}>
                Total : {props.attendance}%
              </TableCell>
              

            </TableRow>

          
          
        </TableBody>
      </Table>
    </TableContainer>
    
    </>)

}

export default Checkattendance
