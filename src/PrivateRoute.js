import {React,useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import check_session from './cmp/Session'
import {Loading} from './cmp/CommonCmp'

function PrivateRoute(props) {
    const [is_logged_in, setis_logged_in] = useState(true)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        async function fetchData() {
          const d=await check_session(localStorage.token,props.role) 
          //console.log(d);
          setis_logged_in(d.is_session_valid)
          setloading(false)
          
        }
        if(localStorage.token)
        {   
            fetchData()
        }
        else
        {
            setis_logged_in(false)
            setloading(true)
        }
        
        return () => {
          fetchData()
          setis_logged_in(true)
          setloading(true)
          
        }
        
       
      },[])

    return (
        
        <>
        {is_logged_in?'':(localStorage.removeItem('token') || <Redirect to='/'/>)}
        {loading?<Loading/>:<props.component/>}
        
       
       </>
    )
}

export default PrivateRoute
