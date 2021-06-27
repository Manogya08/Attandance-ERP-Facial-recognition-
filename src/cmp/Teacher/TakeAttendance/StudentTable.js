import React from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Checkbox, CircularProgress } from '@material-ui/core';
import { Loading } from '../../CommonCmp'
const useStyles = makeStyles({
  table: {

  },
  th: {
    fontSize: 24,
    textDecoration: 'bold',
    backgroundColor: '#3f51b5',
    color: 'white'
  },
  tfooter: {
    fontSize: 24
  },
  highlight: {
    backgroundColor: lighten('rgb(71, 145, 219)', 0.75),
    color: 'white'
  }
});



function StudentTable(props) {

  const classes = useStyles();
  if (props.isuploading) {
    return <Loading />
  }
  if (props.fetched.length === 0) {
    return <></>
  }


  const getpresent = () => {
    var count = 0;
    props.fetched.map(stud => {
      if (stud.present) { count++; }
    })

    return count

  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.th}>
          <TableRow className={classes.th}>
            <TableCell align="center" className={classes.th}>Status</TableCell>
            <TableCell align="center" className={classes.th} >Name</TableCell>
            <TableCell align="center" className={classes.th}>Roll&nbsp;No</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {props.fetched.map((row) => (

            <TableRow key={row.uid} className={row.present ? classes.highlight : ''}>
              <TableCell component="th" scope="row" align="center">
                <Checkbox
                  checked={row.present}
                  color="primary"
                  size="medium"
                  onChange={() => { props.oncheckbox(row.uid) }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </TableCell>
              <TableCell align="center">{row.Name}</TableCell>
              <TableCell align="center">{row.uid}</TableCell>

            </TableRow>
          ))}
          <br />
          <TableRow className={classes.tfooter} >
            <TableCell className={classes.tfooter} align="center" colSpan={3}>Total : {props.fetched.length}   &nbsp;&nbsp;   Present : {getpresent()}  &nbsp;&nbsp; Absent : {props.fetched.length - getpresent()}</TableCell>

          </TableRow>
          <br />
          <TableRow className={classes.tfooter} >
            <TableCell className={classes.tfooter} align="center" colSpan={3}>
              <Button
                type="submit"
                onClick={props.uploadattendance}
                variant="contained"
                color="primary"
              >{props.isloading ? <CircularProgress color='secondary' size={30} /> : 'Save'}</Button>
            </TableCell>

          </TableRow>
          <br />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentTable