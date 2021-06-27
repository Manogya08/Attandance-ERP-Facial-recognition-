import { React, useState } from 'react';
import { MenuItem, IconButton, Avatar, CircularProgress, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useFormik } from 'formik';
import { Visibility, VisibilityOff } from '@material-ui/icons'

import SignUpStyles from './SignUpStyles'
import { SignUpSchema } from '../Validate';
import AlertMessage from '../CommonCmp';
import api from '../API_URL'
import Forgetpassword from '../Forgetpassword'


const Departments = [{ 'value': 'Computer Science', 'svalue': 'CSE' }]
const semesters=['1','2','3','4','5','6','7','8'];
const sections = ['A', 'B', 'C', 'D']

export default function SignUp(){

  const classes = SignUpStyles();
  const [error, seterror] = useState({ is_have: false, message: 'this is an error', type: 'error' })
  const [isvisible, setisvisible] = useState(false)
  const [open,setopen] =useState(false)

  const on_submit = (data) => {

    fetch(api + '/user/register', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(data) })
      .then(res => res.json())
      .then((data) => on_data(data))
      .catch(err => seterror({ message: 'Server Error', is_have: true, type: 'error' }))


  }

  function on_data(data) {
    formik.setSubmitting(false)
    console.log(data);
    if (data.status) {
      formik.resetForm()
      seterror({ message: 'Successfully Registered!', is_have: true, type: 'success' })

    }
    else {
      seterror({ message: 'Already Registered!', is_have: true, type: 'error' })
    }
  }

  const on_value_change = (e) => {
    formik.handleChange(e);
    //so that touched is set to true
    formik.handleBlur(e)

    var d = formik.validateForm()
    d.then(data => formik.errors = data);


  }

  const on_blur = (e) => {
    formik.handleBlur(e)

  }

  const handleClose=()=>{
    setopen(false)
  }

  const handleOpen=()=>{
    setopen(true)
  }

  const formik = useFormik({
    initialValues: {
      uid: '',
      password: '',
      department: '',
      Name: '',
      section: '',
      role: 'student',
      email: '',
      semester:''
    },
    validationSchema: SignUpSchema,
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
          Sign Up
        </Typography>

        <AlertMessage error={error.is_have} type={error.type} seterror={seterror} message={error.message} />

        <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>

          <TextField
            className={classes.font}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="Name"
            value={formik.values.Name}
            onChange={on_value_change}
            onBlur={on_blur}
            error={formik.touched.Name && Boolean(formik.errors.Name)}
            helperText={formik.touched.Name && formik.errors.Name}
          />
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
          />
          <TextField
            className={classes.font}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={on_value_change}
            onBlur={on_blur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            id="password"
            InputProps={{
              endAdornment:
                <IconButton onClick={() => setisvisible(!isvisible)}>{isvisible ? <Visibility /> : <VisibilityOff />}</IconButton>,

            }}
            autoComplete="current-password"
            value={formik.values.password}
            onChange={on_value_change}
            onBlur={on_blur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            id="department"
            select
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Department"
            name="department"
            value={formik.values.department}
            onChange={on_value_change}
            onBlur={on_blur}
            error={formik.touched.department && Boolean(formik.errors.department)}
            helperText={formik.touched.department && formik.errors.department}
          >
            {Departments.map((option) => (
              <MenuItem key={option.value} value={option.svalue}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="semester"
            select
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Semester"
            name="semester"
            value={formik.values.semester}
            onChange={on_value_change}
            onBlur={on_blur}
            error={formik.touched.semester && Boolean(formik.errors.semester)}
            helperText={formik.touched.semester && formik.errors.semester}
          >
            {semesters.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField
            id="section"
            select
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Section"
            name="section"
            value={formik.values.section}
            onChange={on_value_change}
            onBlur={on_blur}
            error={formik.touched.section && Boolean(formik.errors.section)}
            helperText={formik.touched.section && formik.errors.section}
          >
            {sections.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <CircularProgress color='secondary' size={30} /> : 'Register'}
          </Button>
          <Forgetpassword open={open} handleClose={handleClose}/>

          <Grid container>
            <Grid item xs>
            <Link href="#" variant="body2" onClick={handleOpen}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                {"Already Register?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
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
      <br />
      <br />
    </Typography>
  );
}
