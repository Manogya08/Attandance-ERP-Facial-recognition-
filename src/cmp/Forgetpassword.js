import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, CircularProgress, IconButton, TextField, Typography } from '@material-ui/core';
import AlertMessage, { get } from './CommonCmp';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { passwordschema } from './Validate';




const useStyles = makeStyles((theme) => ({
  paper: {
    width:400,
    height:400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
    margin:'10px',
    display:'flex',
      justifyContent:'center',
      alignitems:'center',
      flexDirection:'column'
  },
  modalcenter:{
      display:'flex',
      justifyContent:'center',
      alignitems:'center'
  }
}));


export default function SimpleModal(props) {
    const [uid, setuid] = useState('')
    const [error, seterror] = useState({ is_have: false, message: 'this is an error', type: 'error' })
    const [errors, seterrors] = useState({})
    const [otptxtfield, setotptxtfield] = useState('')
    const [isuservalid, setisuservalid] = useState(false)
    const [isotpvalid, setisotpvalid] = useState(false)
    const [loading, setloading] = useState(false)
    const [password, setpassword] = useState('')
    const [isvisible, setisvisible] = useState(false)
    const [email,setemail]=useState('')
    const [repass,setrepass]=useState('')
    const classes = useStyles();


  const on_otpsend=async ()=>{
      if(!uid)
      {
          seterrors({uid:'User id Is required'})
          return
      }
      seterrors({})
      setloading(true)

    const res=await get('/generate_otp',{uid:uid});
    if(res && res.status)
    {
       setisuservalid(true)
       seterrors({})
       setemail(res.email)
    }
    else
    {
        seterrors({uid:'User ID not Registered'})
        setisuservalid(false)
        setemail('')
    }
    setloading(false)

  }

  const verify_otp=async()=>{
      setloading(true)
      const res=await get('/verify_otp',{otp:otptxtfield});
      if(res && res.status)
      { setisotpvalid(true)
        seterrors({})
      }
      else
      {
          setisotpvalid(false)
          seterrors({otp:'Invalid OTP'})
      }
      setloading(false)

  }
  const change_password=async()=>{
      setloading(true)
      
      try{
        const t=await passwordschema.validate({password:password});
        if(password!=repass)
        {
          seterrors({repass:'Password not matched'});
          setloading(false)
          return
        }

      }
      catch(err)
      {
          console.log(err.message);
          seterrors({password:err.message})
          setloading(false)
          return
      }
     
      
      seterrors({})

      
      const res=await get('/change_password',{password:password,uid:uid});
    
      if(res && res.status)
      {
        seterror({ message: 'Password changed', is_have: true, type: 'success' })
        props.handleClose()
        setisuservalid(false)
        setisotpvalid(false)
        setpassword('')
        setrepass('')
        setuid('')
        setotptxtfield('')
      }
      else
      {
        seterror({ message: 'Error Occured', is_have: true, type: 'error' })
        setisuservalid(false)
        setisotpvalid(false)
        setpassword('')
        setrepass('')
        setuid('')
        setotptxtfield('')

      }

      setloading(false)
      
  }
  
  const Close=()=>{
      seterrors({})
    setisuservalid(false)
    setisotpvalid(false)
    setpassword('')
    setrepass('')
    setuid('')
    setotptxtfield('')
    setloading(false)
    setemail('')
      props.handleClose()
  }

  const body = (
    <div className={classes.paper}>
      
      {/*   for user id tab  */}
      {!isuservalid
      && 
      <>
      <TextField
            className={classes.font}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="uid"
            label="ERP ID"
            name="uid"
            value={uid}
            onChange={(e)=>setuid(e.target.value)}
            
            error={errors.uid && Boolean(errors.uid)}
            helperText={errors.uid}
            autoComplete='off'
      />

      <Button
      
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      onClick={on_otpsend}
      disabled={loading}
    >
      {loading? <CircularProgress color='secondary' size={30} /> : 'Send OTP'}
    </Button>

    <Button
      style={{marginTop:'6px'}}
      fullWidth
      variant="contained"
      color="secondary"
      className={classes.submit}
      onClick={Close}
      >
      Cancel
    </Button>
      </>

      }

     {/*   if the user is valid and otp is generated tab */ }
      {isuservalid && !isotpvalid &&
      <>
      <Typography variant="h6" >Email sent To {email}</Typography>
      <TextField
            className={classes.font}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="uid"
            label="OTP"
            name="otp"
            value={otptxtfield}
            onChange={(e)=>setotptxtfield(e.target.value)}
            
            error={errors.otp && Boolean(errors.otp)}
            helperText={errors.otp}
            autoComplete='off'
      />

      <Button
      
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      onClick={verify_otp}
      disabled={loading}
    >
      {loading? <CircularProgress color='secondary' size={30} /> : 'Verify'}
    </Button>
    <Button
      style={{marginTop:'6px'}}
      fullWidth
      variant="contained"
      color="secondary"
      className={classes.submit}
      onClick={Close}
      >
      Cancel
    </Button>
      </>

      }

      {/*   if the opt is verified tab to change password */ }
      {isotpvalid && isuservalid &&
      <>
      <TextField
            className={classes.font}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label=" New Password"
            type={isvisible ? 'text' : 'password'}

            InputProps={{
              endAdornment:
                <IconButton onClick={() => setisvisible(!isvisible)}>{isvisible ? <Visibility /> : <VisibilityOff />}</IconButton>,

            }}

            id="password"
            
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            
            error={errors.password && Boolean(errors.password)}
            helperText={errors.password }
          />

          <TextField
            className={classes.font}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label=" Re-Password"
            type={isvisible ? 'text' : 'password'}

            InputProps={{
              endAdornment:
                <IconButton onClick={() => setisvisible(!isvisible)}>{isvisible ? <Visibility /> : <VisibilityOff />}</IconButton>,

            }}

            id="password"
            
            value={repass}
            onChange={(e)=>setrepass(e.target.value)}
            
            error={errors.repass && Boolean(errors.repass)}
            helperText={errors.repass }
          />

      <Button
      
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      onClick={change_password}
      disabled={loading}
      >
      {loading? <CircularProgress color='secondary' size={30} /> : 'Change Password'}
    </Button>
    <Button
      style={{marginTop:'6px'}}
      fullWidth
      variant="contained"
      color="secondary"
      className={classes.submit}
      onClick={Close}
      >
      Cancel
    </Button>
      </>

      }
      
    </div>
  );

  return (
   
     <>
     <AlertMessage error={error.is_have} type={error.type} seterror={seterror} message={error.message} />
      <Modal
        open={props.open}
        onClose={props.handleClose}
        className={classes.modalcenter}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}
