import MuiAlert from '@material-ui/lab/Alert';
import {Snackbar,Button} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Redirect,useHistory} from 'react-router-dom';
import api from './API_URL'
const useStylesLoading = makeStyles((theme) => ({
  root: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:'100vh',
    width:'100vw'

  },
  
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
function AlertMessage(props)
  {
    return (<Snackbar 
        anchorOrigin={{vertical:'top',horizontal: 'right'}} 
        open={props.error} 
        autoHideDuration={4000} 
        
        onClose={()=>props.seterror({is_have:false,type:props.type})} >
         <Alert  
         severity={props.type}
         onClose={()=>props.seterror({is_have:false,type:props.type})}>
          {props.message}
        </Alert>
      </Snackbar>)
    
    
  
  }

  function Loading(props)
  {
    const classes=useStylesLoading()
    return(
      <div className={classes.root}>
      <CircularProgress size={100}/>
    </div>
    )
  }


const Logout=(history)=>
{
  
  fetch(api+'/user/logout',{method:'post',headers: { 'Content-type': 'application/json' }, body: JSON.stringify({token:localStorage.token}) })
  // console.log('logout clicked');
  sessionStorage.clear();
  localStorage.removeItem('token');
  history.push('/')  
    

}

async function get(url,data)
{ 
  var result='';
   try
   {
    result = await fetch(api + url, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(data) })
    .then(res => res.json())
    
   }
   catch(err){
     console.error(err);
   }

   return result;
  
  
}

function toTitleCase(str)
  {
    if(str)
    return str.replace(
      /\w\S*/g,function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase();}
    )
    else
    {return str}

  }

export default AlertMessage

  export {
Loading,Logout,get,toTitleCase
  }