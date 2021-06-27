import {React, useEffect, useState} from 'react'
import { AppBar, Toolbar, IconButton, Typography, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from './Drawer'
import { useHistory } from 'react-router-dom';
import { Avatar, Menu, MenuItem } from '@material-ui/core';
import {get, Logout,toTitleCase} from '../CommonCmp'
import { ExitToAppOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    menu:{
      marginTop:-10,
      marginLeft:10
    },
    logoutalign:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }
  }));



function Header(props) {
  const [isopen, setisopen] = useState(false);
  const [anchorE1, setanchorE1] = useState(null);
  const [name, setname] = useState('')

    const classes=useStyles();
    const history=useHistory();


  useEffect(() => {
    async function fetch_data()
    {
     
      const res=await get('/getdetails',{token:localStorage.token})
       
      if(res)
      {
        sessionStorage.name = res.name
         setname(res.name);
         
         props.setname(res.name)
         
         
      }
    }
    if(!sessionStorage.name)
    {
    fetch_data()
    }
    return () => {
      
    }
  }, [])

  const handleClose=()=>{
    setanchorE1(null)

  }
  const handleMenu=(e)=>{
    setanchorE1(e.currentTarget)
  }
  
    
    
    return(
<div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" onClick={()=>setisopen(true)} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Face-Net-Niet
          </Typography>
          <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt={name || sessionStorage.name} src='/ds'/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorE1}
                className={classes.menu}
                keepMounted
                
                open={Boolean(anchorE1)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Avatar alt={name || sessionStorage.name} src={`data:image/png;base64,` + sessionStorage.avatar} />  &nbsp;{toTitleCase(name) || toTitleCase(sessionStorage.name)}</MenuItem>
            <MenuItem className={classes.logoutalign} onClick={() => Logout(history)}><ExitToAppOutlined/>signout</MenuItem>
              </Menu>
        </Toolbar>
      </AppBar>
      <Drawer isopen={isopen} setisopen={setisopen}/>
    </div>


    )
}

export default Header
