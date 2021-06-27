import { Button, CircularProgress, Grid, MenuItem, TextField } from '@material-ui/core'
import React from 'react'
import useStyles from '../TakeAttendance/Styles'
import moment from 'moment';
function formatDate(date)
{
    var d=new Date(date);
    
  return moment(d).format('YYYY-MM-DD');

}

function Form(props) {
    const classes=useStyles()
    return (
        <>
            <Grid className={classes.datefield} item xs={12} lg={3}>
                    <TextField
                    className={classes.font}
                    variant="outlined"
                id="date"
                label="Date"
                type="date"
                fullWidth
                value={formatDate(props.date)}
                onChange={(e)=>props.setdate(e.target.value)}
                inputProps={{
                    max:formatDate(new Date()),
                    min:moment(new Date).subtract(3,'Days').format('YYYY-MM-DD')
                }}
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
            />
        </Grid>
        <Grid className={classes.field} item xs={12} lg={3}>
           { props.date &&  <TextField
            className={classes.font}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="uid"
            label="ERP ID"
            name="uid"
            value={props.uid}
            onChange={
                (e)=>props.setuid(e.target.value)
            }
            
            
            autoComplete='off'
          />
           }
        </Grid>
        
        <Grid item xs={11} sm={3} >
          {   props.date && props.uid &&   <Button
                    
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={props.on_submit}
                    disabled={props.loading}
                >
                    {props.loading?<CircularProgress color='secondary' size={30} />:'Search'}
                </Button>
          }
        </Grid>

        
       
        </>
    )
}

export default Form
