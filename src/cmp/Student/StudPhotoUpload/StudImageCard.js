import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { CardStyles } from './Styles';
import { Typography } from '@material-ui/core';



function StudImageCard(props) {


  const classes = CardStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.url}
          title={sessionStorage.name}
        />
        <CardContent>
          <Typography variant="h6" color='secondary' className={classes.title}>

            {props.isuploading ? 'Uploading...' : props.status ? 'Uploaded' : props.status === undefined ? '' : 'Invalid Image'}
          </Typography>

        </CardContent>
      </CardActionArea>

    </Card>
  )
}

export default StudImageCard