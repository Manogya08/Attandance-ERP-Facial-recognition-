import { green } from '@material-ui/core/colors';
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
       
      }
  }));


  const CardStyles = makeStyles({
    root: {
     margin:'25px'
    },
    media: {
      height:300,
      width:300
    },
    title:{
        textAlign:'center'
    }
  });


export default useStyles
export{
    CardStyles
}