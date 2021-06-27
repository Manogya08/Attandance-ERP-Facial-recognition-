import { Box, CircularProgress, Typography, withStyles } from '@material-ui/core'
import React from 'react'



function CircularProgresswithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
      <CircularProgress  variant="determinate" {...props} style={{color:props.color}}/>
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h7" component="div" color=""><b>{`${Math.round(
          props.value,
        )}%`}</b><Typography color="textSecondary">Attendance</Typography></Typography>
       
      </Box>
    </Box>
    )
}

export default CircularProgresswithLabel
