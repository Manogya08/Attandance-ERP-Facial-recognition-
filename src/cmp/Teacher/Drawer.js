import { List, ListItem, ListItemIcon, ListItemText, makeStyles, SwipeableDrawer } from '@material-ui/core'
import { CheckBoxOutlined, Edit, ExitToAppOutlined, HomeOutlined, PersonPinCircleOutlined } from '@material-ui/icons';
import React from 'react'
import { useHistory } from 'react-router-dom';
import {Logout} from '../CommonCmp'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  iconcolor:{
    color:'primary'
  }
});

function Drawer(props) {

  return (
    <div>
      <SwipeableDrawer
        anchor={'left'}
        open={props.isopen}
        onClose={() => props.setisopen(false)}
        onOpen={() => props.setisopen(true)}
      >
        <Items close={props}/>
      </SwipeableDrawer>
    </div>
  )
}


function Items(props) {
  const history = useHistory()
  const classes = useStyles()
  const iconcolor='primary'
  const goto=(link)=>{
    history.push(link);
    props.close.setisopen(false)
    
    } 
  
  return (
    <div
      className={classes.list}
      role="presentation"

    >
      <List>
        <ListItem button key={1} >
          <ListItemIcon> <HomeOutlined color={iconcolor}/> </ListItemIcon>

          <ListItemText primary={'Dashboard'}  onClick={() => goto('/teacher')} />
        </ListItem>

        <ListItem button key={2} >
          <ListItemIcon> <PersonPinCircleOutlined color={iconcolor}/> </ListItemIcon>
          <ListItemText primary={'Mark Attendance'} onClick={() => goto('/teacher/attendance')} />
        </ListItem>
        
        <ListItem button key={3} >
          <ListItemIcon><Edit color={iconcolor}/> </ListItemIcon>
          <ListItemText primary={'Update Attendance'} onClick={() => goto('/teacher/updateattendance')} />
        </ListItem>

        <ListItem button key={4} >
         <ListItemIcon><CheckBoxOutlined color={iconcolor}/> </ListItemIcon> 
         <ListItemText primary={'Check Attendance'} onClick={()=>goto('/teacher/checkattendance')}/>
         </ListItem>
        <ListItem button key={5} >
          <ListItemIcon><ExitToAppOutlined color={iconcolor}/>  </ListItemIcon>
          <ListItemText primary={'Logout'} onClick={()=>Logout(history)} />
        </ListItem>

      </List>

    </div>




  )

}
export default Drawer
