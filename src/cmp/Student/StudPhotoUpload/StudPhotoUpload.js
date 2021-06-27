import {React, useState,useEffect}from 'react'
import Compress from 'compress.js'
import {Fab, Grid, Typography} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import useStyles from './Styles';
import StudImageCard from './StudImageCard';
import Header from '../Header';
import CheckIcon from '@material-ui/icons/Check';
import api from '../../API_URL'
import {Loading,get} from '../../CommonCmp'




function StudPhotoUpload() {
    const [images, setimages] = useState([])
    const [imagestatus, setimagestatus] = useState({})
    const [isuploading, setisuploading] = useState(false)
    const [fetched, setfetched] = useState([])
    const [loading, setloading] = useState(true)
    

    useEffect(() => {
      async function fetchData() {
      
      const res=await get('/getuserphoto',{token:localStorage.token});
      if(res)
      {
        setfetched(res)
        setloading(false)
        setimages([])
        if(res.length>10)
        {setisuploading(true)}
      }
      
       
        
      }

      fetchData()
      return () => {
       
      }
    }, [imagestatus])


    const FileChanged=(e)=>{
       var temp=e.target.files
       setimages(images.concat(Object.values(temp)))
    }
    
    
    const upload=async ()=>{

      setisuploading(true)
      var FD=new FormData();
      FD.append('token',localStorage.token);
     //code to compress all the images uploaded by client
      const compress= new Compress();
      for(var i=0;i<images.length;i++)
      {
        
        
        const name=images[i].name
        const data=await compress.compress([images[i]], {
          size: 10, // the max size in MB, defaults to 2MB
          quality: .75, // the quality of the image, max is 1,
          maxWidth: 1920, // the max width of the output image, defaults to 1920px
          maxHeight: 1920, // the max height of the output image, defaults to 1920px
          resize: true, // defaults to true, set false if you do not want to resize the image width and height
        })
          
          const img1 = data[0]
          const base64str = img1.data
          const imgExt = img1.ext
          
          const d = Compress.convertBase64ToFile(base64str, imgExt)
          const  file = new File([d],name,{ type: d.type });
          
          FD.append('userPhoto', file, file.name);
        

      }

      
      
      const res=await fetch(api+'/upload',{method:'POST',body:FD})
      .then(res=>res.json())
      setimagestatus(res)
      setisuploading(false)
      

    }

    
    const classes=useStyles();
    return (
         <Grid container >
             <Grid item xs={12}>
                 <Header />
                
             </Grid>
             <Grid item container  xs={12} style={{ paddingTop:'70px'}}>
               <Content images={images} loading={loading} fetched={fetched} imagestatus={imagestatus} isuploading={isuploading}/>
             </Grid>
             
             <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={FileChanged}
              />
              {
                //disable upload button if no file is selected
                images.length?<Fab  color="green" disabled={isuploading} onClick={upload} className={classes.upload} component="span">
                <CheckIcon/>
              </Fab>:''
              }
              
              <label htmlFor="contained-button-file">
                <Fab  disabled={isuploading} color="primary" className={classes.fab} component="span">
                  <AddIcon/>
                </Fab>

              </label>
           </Grid>


    )

}



function Content(props){
  const classes=useStyles();
  if(props.loading)
  {
    return (<Loading/>)
  }

return (
    <>
    {//for user selected data
          props.images.map(image=>(
            <Grid key={Math.random()} item xs={12} sm={12} lg={3}>
            <StudImageCard  url={URL.createObjectURL(image)} isuploading={props.isuploading} status={props.imagestatus[image.name]}/>
            </Grid>
      ))

    }

    {//for fetched data
     props.fetched.length?
     props.fetched.map(image=>(
               <Grid key={Math.random()} item xs={12} sm={12} lg={3}>
               <StudImageCard  url={`data:image/png;base64,`+image} isuploading={false} status={props.imagestatus[image.name]}/>
               </Grid>
    ))
    :
    //if there are no uploads from user 
    <Typography className={classes.title} variant="h5"><br/>No Data Found<br/></Typography>
    
    }

    
    
   
  </>
    )

}



export default StudPhotoUpload
