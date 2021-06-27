import { Grid, MenuItem, TextField } from '@material-ui/core'
import React from 'react'
import useStyles from './Styles'
import moment from 'moment';

function formatDate(date)
{
    var d=new Date(date);
    
  return moment(d).format('YYYY-MM-DD');

}

const semesters=['1','2','3','4','5','6','7','8'];
function Form(props) {
    const classes=useStyles()
    return (
        <>  <Grid className={classes.datefield} item xs={12} lg={3}>
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
          { props.branch &&  <TextField
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
                {semesters.map((option,index) => (
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

        <Grid className={classes.field} item xs={12} lg={3}>
           { props.section && <TextField
                id="subject"
                select
                
                variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                label="subject"
                name="subject"
                value={props.subject}
                onChange={(e)=>props.setsubject(e.target.value)}
                
                >
                {props.subjects && props.subjects.map((option) => (
                    <MenuItem key={option.code} value={option.code+' '+option.name}>
                    {option.code+' '+option.name}
                    </MenuItem>
                ))}
        </TextField>
            }
        </Grid>
        </>
    )
}

export default Form
