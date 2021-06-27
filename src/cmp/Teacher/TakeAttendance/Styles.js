import { makeStyles } from '@material-ui/core/styles';
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
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      input: {
        display: 'none',
      },
      upload:{
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
       
      },
      field:{
          margin:'8px'
      },
      submit: {
        margin: theme.spacing(4,2, 2),
        fontFamily:'Poppins',
        fontSize:18
      },
      datefield:{
        margin:'10px',
        marginTop:'24px'
      }
  }));

  export default useStyles