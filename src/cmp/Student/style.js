import { Badge } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { CenterFocusStrong } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    avatar:{

    }
    ,
    container:{
        paddingTop:'70px'
    },
    center:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:'20px'
    }
    ,
    avatarsize:{
        height:theme.spacing(16),
        width:theme.spacing(16),
        
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
      }
  }));

  const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);

  export default useStyles

 export{
     StyledBadge
 }