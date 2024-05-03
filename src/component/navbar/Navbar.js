// import React, { useRef, useState } from 'react'
import './Navbar.scss' 
import Avatar from '../avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector} from 'react-redux'
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN ,removeItem} from '../../utils/localStorageManager';
import { TOAST_SUCCESS } from '../../App';
import { showToast } from '../../redux/slices/appConfigSlice';

function Navbar() {
  const navigate = useNavigate();
 const myProfile = useSelector(state =>state.appConfigReducer.myProfile)
 
const dispatch = useDispatch()

   async function handleLogOutClicked (){
    await axiosClient.post('/auth/logout') ; 
    removeItem(KEY_ACCESS_TOKEN) ; 
    dispatch(showToast({
      type:TOAST_SUCCESS , 
      message :"succesfully logout , visit again ..."
    })) ;
    navigate('/login') ; 
    
  }

  return (
    <div className='Navbar'>
        <div className='container'>
            <h2 className='banner hover-link' onClick={()=>navigate('/')}>
                Social Media
            </h2>
            <div className='right-side'>
                <div className='profile hover-link'onClick={()=>navigate(`/profile/${myProfile?._id}`)}> <Avatar src={myProfile?.avatar?.url}/></div>
                  <div className='logout hover-link' onClick={handleLogOutClicked}> <FiLogOut /> </div>
            </div>

        </div>
    </div>
  )
}

export default Navbar