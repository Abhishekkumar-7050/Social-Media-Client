import React, { useEffect, useState } from "react";
import dummyuserImg from "../../assets/user.png";
import "./UpdateProfile.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateMyProfile } from "../../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { removeItem } from "../../utils/localStorageManager";
import {  useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN } from "../../utils/localStorageManager";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_FAILURE } from "../../App";
import { TOAST_SUCCESS } from "../../App";

function UpdateProfile() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // in starting value is find in name bio
  // console.log(" my profile data",myProfile);

  useEffect(() => {
    setName(myProfile?.name || '');
    setBio(myProfile?.bio || '');
    setUserImg(myProfile?.avatar?.url || '')
  }, [myProfile]);

  function handleImgChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader(); // it is givin by dom
    fileReader.readAsDataURL(file);
    fileReader.onload =()=>{
      if(fileReader.readyState === fileReader.DONE){
        setUserImg(fileReader.result);
        console.log(userImg);
      }
    }

  }

  function handleSubmit (e) {
    e.preventDefault();
    dispatch(updateMyProfile({
      name,
      bio,
      userImg
    }));
  }

  async function handelDeleteAcount(){
    try {
      const choice = prompt("type yes to delete , otherwise no ") ; 
      if(choice === "yes") {
          dispatch(setLoading(true));
              await axiosClient.delete('/user') ; 
              dispatch(showToast({
              type:TOAST_SUCCESS , 
              message :"user has been deleted successfully"
          })) ;
          removeItem(KEY_ACCESS_TOKEN) ; 
          navigate('/login')  ;
      }
      else {
          dispatch(showToast({
              type:TOAST_SUCCESS , 
              message :"ooppss you saved" 
          })) ;
      }
      

  } catch (error) {
      dispatch(showToast({
          type:TOAST_FAILURE , 
          message :error
        })) ;
  }finally{
      dispatch(setLoading(false));
  }
  }



  return (
    <div className="UpdateProfile">
      <div className="container">
        <div className="left-part">
          {/* <img className='userImage' src={userImg} alt='UserImg' /> */}
          <div className="input-user-img">
            <label htmlFor="inputImg" className="labelImg">
              <img src={userImg ? userImg : dummyuserImg} alt={name} />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImgChange}
            />
          </div>
        </div>
        <div className="right-part">
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              type="text"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              value={bio}
              type="text"
              placeholder="Your Bio"
              onChange={(e) => setBio(e.target.value)}
            />
            <input type="submit" className="btn-primary" onClick={handleSubmit} />
          </form>

          <button className="delete-account btn-primary"  onClick={handelDeleteAcount} >Delete Acount</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
