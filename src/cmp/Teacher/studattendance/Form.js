import { Button, CircularProgress, Grid, MenuItem, TextField } from '@material-ui/core'
import React from 'react'
import useStyles from '../TakeAttendance/Styles'

const semesters=['1','2','3','4','5','6','7','8'];
function Form(props) {
    const classes=useStyles()
    return (
        <>
            <Grid className={classes.field} item xs={12} lg={3}>
            <TextField
                id="Department"
                select
            
                variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                label="Department"
                name="department"
                value={props.branch}
                onChange={(e)=>props.setbranch(e.target.value)}
                
                >
                {props.departments.values.map((option,index) => (
                    <MenuItem key={option} value={props.departments.short[index]}>
                    {option}
                    </MenuItem>
                ))}
        </TextField>
        </Grid>
        <Grid className={classes.field} item xs={12} lg={3}>
           { props.branch && <TextField
                id="semester"
                select
                
                variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                label="Semester"
                name="semester"
                value={props.semester}
                onChange={(e)=>props.setsemester(e.target.value)}
                
                >
                {semesters.map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                ))}
        </TextField>
           }
        </Grid>
        <Grid className={classes.field} item xs={12} lg={3}>
           { props.semester && <TextField
                id="section"
                select
                
                variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                label="Section"
                name="section"
                value={props.section}
                onChange={(e)=>props.setsection(e.target.value)}
                
                >
                {props.sections.map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                ))}
        </TextField>
           }
        </Grid>
        <Grid item xs={11} sm={3} >
          {   props.branch && props.section &&   <Button
                    
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
