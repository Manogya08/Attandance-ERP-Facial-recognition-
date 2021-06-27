import { List, ListItem, ListItemIcon, ListItemText, makeStyles, SwipeableDrawer } from '@material-ui/core'
import { AddOutlined, CheckBoxOutlined, ExitToAppOutlined, HomeOutlined } from '@material-ui/icons';
import React from 'react'
import {  useHistory } from 'react-router-dom';
import {Logout} from '../CommonCmp'

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

function Drawer(props) {

    return (
        <div>
            <SwipeableDrawer
            anchor={'left'}
            open={props.isopen}
            onClose={()=>props.setisopen(false)}
            onOpen={()=>props.setisopen(true)}
          >
            <Items close={props}/>
          </SwipeableDrawer>
        </div>
    )
}



function Items(props)
{   
    const history=useHistory()
    const classes= useStyles()
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
          
         <ListItemText primary={'Dashboard'} onClick={()=>goto('/student')}/>
         </ListItem>

         <ListItem button key={2} >
         <ListItemIcon> <AddOutlined color={iconcolor}/> </ListItemIcon> 
         <ListItemText primary={'Upload Photo'} onClick={()=>goto('/student/upload')}/>
         </ListItem>
         
         <ListItem button key={3} >
         <ListItemIcon><CheckBoxOutlined color={iconcolor}/> </ListItemIcon> 
         <ListItemText primary={'Check Attendance'} onClick={()=>goto('/student/attendance')}/>
         </ListItem>

         <ListItem button key={4} >
         <ListItemIcon><ExitToAppOutlined color={iconcolor}/>  </ListItemIcon> 
         <ListItemText primary={'Logout'} onClick={()=>Logout(history)}/>
         </ListItem>
         
     </List>

    </div>
    
    
    
    
    )

}
export default Drawer
