import { React, useState, useEffect } from 'react';
import { IconButton, Avatar, CircularProgress, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useFormik } from 'formik';
import { Redirect } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@material-ui/icons'

import SignInStyles from './SignInStyles'
import SignInSchema from '../Validate';
import AlertMessage from '../CommonCmp'
import check_session from '../Session'
import api from '../API_URL'
import { Loading } from '../CommonCmp'
import Forgetpassword from '../Forgetpassword'

export default function SignIn() {


  const [is_logged_in, setis_logged_in] = useState(false)
  const [loading, setloading] = useState(true)
  const [usertype, setusertype] = useState(null)
  const [refresh, setrefresh] = useState(null)
 
  useEffect(() => {
    async function fetchData() {
      console.log('sessionchecking');
      const d = await check_session(localStorage.token)
      setusertype(d.role)
      setis_logged_in(d.is_session_valid)
      if (!d.is_session_valid) {
        localStorage.removeItem('token')
      }
      setloading(false)

    }
    if (localStorage.token) { fetchData() }
    else { setloading(false) }

    return () => {
      fetchData()
      setusertype(null)
      setis_logged_in(false)
      setloading(true)
    }


  }, [refresh])


  return (
    <>

      {is_logged_in ? usertype === 'student' ? <Redirect to='/student' /> : <Redirect to='/teacher' /> : ''}
      {loading ? <Loading /> : <Body setrefresh={setrefresh} />}

    </>
  );
}


function Body(props) {
  const [open,setopen] =useState(false)
  const classes = SignInStyles();
  const handleClose=()=>{
    setopen(false)
  }

  const handleOpen=()=>{
    setopen(true)
  }

  const [error, seterror] = useState({ is_have: false, message: 'this is an error', type: 'error' })
  const [isvisible, setisvisible] = useState(false)

  const on_submit = (data) => {

    //  alert(JSON.stringify(data, null, 2));
      fetch(api + '/user/login', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(data) })
      .then(res => res.json())
      .then((data) => on_data(data))
      .catch(err => (formik.setSubmitting(false) || seterror({ message: 'Server Error', is_have: true, type: 'error' })))

  }

  function on_data(data) {
    formik.setSubmitting(false)

    //console.log(data);
    if (data.logged_in) {
      formik.resetForm()
      localStorage.token = data.uuid
      props.setrefresh(true)

    }
    else {
      seterror({ message: 'Incorrect ERP ID or password', is_have: true, type: 'error' })

    }
  }

  const on_value_change = (e) => {

    //so that touched is set to true
    formik.handleChange(e);
    formik.handleBlur(e);

    var d = formik.validateForm()
    d.then(data => formik.errors = data);



  }

  const on_blur = (e) => {
    formik.handleBlur(e)

  }
  
  const formik = useFormik({
    initialValues: {
      uid: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: on_submit
  });

  return (
    <Container className={classes.font} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.font} component="h1" variant="h5">
          Sign in
        </Typography>

        <AlertMessage error={error.is_have} type='error' seterror={seterror} message={error.message} />

        <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>

          <TextField
            className={classes.font}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="uid"
            label="ERP ID"
            name="uid"
            value={formik.values.uid}
            onChange={on_value_change}
            onBlur={on_blur}
            error={formik.touched.uid && Boolean(formik.errors.uid)}
            helperText={formik.touched.uid && formik.errors.uid}
            autoComplete='off'
          />

          <TextField
            className={classes.font}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={isvisible ? 'text' : 'password'}

            InputProps={{
              endAdornment:
                <IconButton onClick={() => setisvisible(!isvisible)}>{isvisible ? <Visibility /> : <VisibilityOff />}</IconButton>,

            }}

            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={on_value_change}
            onBlur={on_blur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <CircularProgress color='secondary' size={30} /> : 'Login'}
          </Button>
          <Forgetpassword open={open} handleClose={handleClose}/>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={handleOpen}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Niet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
