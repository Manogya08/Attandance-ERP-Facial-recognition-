import { makeStyles } from '@material-ui/core/styles';

const SignUpStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      
     
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      width:50,
      height:50
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      fontFamily:'rosemary'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      fontFamily:'Poppins',
      fontSize:18
    },
    font:{
      fontFamily:'Poppins',
      
    },
  }));
  
export default SignUpStyles