import Loginclient from "./pages/login/Loginclient";
import Signupclient from "./pages/signup/Signupclient"
import Home from "./pages/home/Home"
import { Route,  Routes } from "react-router-dom";
import RequireUser from "./component/RequireUser.js"
import Feed from "./component/feed/Feed.js";
import Profile from "./component/profile/Profile.js";
import UpdateProfile from "./component/updateProfile/UpdateProfile.js";
import {useSelector} from 'react-redux'
import { useEffect, useRef } from "react";
import LoadingBar from  'react-top-loading-bar';
import OnlyIfNotLoggedIn from "./component/OnlyIfNotLoggedin.js";
import toast, { Toaster } from 'react-hot-toast';
export const TOAST_SUCCESS =  "taost_success" ; 
export const TOAST_FAILURE =  "toast_failure" ; 


function App() {
  const isLoading = useSelector( state => state.appConfigReducer.isLoading);
  const toastData = useSelector((state)=>state.appConfigReducer.toastData )
  const loadingRef = useRef(null);
useEffect(() =>{
if(isLoading){
  loadingRef.current?.continuousStart();
}
else{
  loadingRef.current?.complete();
  
}
},[isLoading])



useEffect(() => {
  switch(toastData.type) {
    case TOAST_SUCCESS :
      toast.success(toastData?.message) ; 
      break ;  
    case TOAST_FAILURE :
      toast.error(toastData?.message) ;
      break ;  
      // default:
      // toast(toastData?.message) ;
      // break;

  }
}, [toastData]);



  return (
    <div className="App">
       <LoadingBar color='#f11946' ref={loadingRef} />
       <div><Toaster/></div>
      
    <Routes>
      <Route  element={<RequireUser/>}> 
       
      <Route  element ={<Home/>}>
      <Route path="/" element = {<Feed/>}/>
      <Route path="/profile/:userId" element = {<Profile/>}/>
      <Route path="/updateProfile" element = {<UpdateProfile/>}/>
      </Route> 
      </Route>
      <Route element ={< OnlyIfNotLoggedIn/>}>
     <Route path="/login" element ={<Loginclient/>}/>
     <Route path="/signup" element ={<Signupclient/>}/>
     </Route>
    </Routes>
    </div>
  )
}
export default App;
