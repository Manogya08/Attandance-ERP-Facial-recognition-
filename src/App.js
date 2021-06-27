import './App.css';
import SignIn from './cmp/SignIn/SignIn';
import SignUp from './cmp/SignUp/SignUp';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';

import Student_index from './cmp/Student/Student_index'
import Teacher_index from './cmp/Teacher/Teacher_index';
import PrivateRoute from './PrivateRoute'
import StudPhotoUpload from './cmp/Student/StudPhotoUpload/StudPhotoUpload';
import Attendance from './cmp/Teacher/TakeAttendance/Attendance';
import Checkattendance from './cmp/Student/Checkattendance/Checkattendance';
import studattendance from './cmp/Teacher/studattendance/studattendance';
import updateattendance from './cmp/Teacher/updateattendance/updateattendance';

function App(){
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path='/' component={SignIn} />
        <Route  exact path='/signup' component={SignUp}/>
        
        <PrivateRoute  exact path='/teacher' component={Teacher_index} role='teacher'/>
        <PrivateRoute  exact path='/teacher/attendance' component={Attendance} role='teacher'/>
        <PrivateRoute  exact path='/teacher/checkattendance' component={studattendance} role='teacher' />
        <PrivateRoute  exact path='/teacher/updateattendance' component={updateattendance} role='teacher'/>
        
        <PrivateRoute  exact path='/student' component={Student_index} role='student'/>
        <PrivateRoute  exact path='/student/upload' component={StudPhotoUpload} role='student'/>
        <PrivateRoute  exact path='/student/attendance' component={Checkattendance} role='student'/>
        
        
        <Redirect  to='/' />
      </Switch>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
