

import './Profile.scss'
 
import userImg from '../../assets/user.png'
import { useNavigate, useParams } from 'react-router-dom';
import CreatePost from '../createPost/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../../redux/slices/postsSlice';
import Post from '../post/Post'

import { followAndUnfollowUser } from '../../redux/slices/feedSlice';

function Profile() {
  const navigate = useNavigate() ; 
  const params = useParams() ; 
  const dispatch = useDispatch() ; 
  const userProfile = useSelector(state => state.postReducer.userProfile) ; 
  // console.log( "Api data is from  userProfile",userProfile);
  const myProfile = useSelector(state => state.appConfigReducer.myProfile) ; 
  const [isMyProfile , setIsMyProfile] = useState(false) ; 
  const userId = params.userId; 
  const [isFollowing , setIsFollowing] = useState() ; 
  const feedData = useSelector(state => state.feedDataReducer.feedData) ; 

  function handleFollowAndUnfollow() {
    dispatch(followAndUnfollowUser({userToFollowId : params.userId} ));
  }

  
  useEffect(()=>{
    dispatch(getUserProfile({userId})) ; 
    setIsMyProfile(userId === myProfile?._id) ; 
    setIsFollowing(feedData?.followings?.find(item => item._id === userId)) ; 
   console.log("my profile " , myProfile?._id) ; 
   console.log("user id ",userId) ; 
    console.log(userProfile); 
  },[myProfile , userId , feedData ]) ;
  return (
    <div className='Profile'>
      <div className='container'>
        <div className='leftPart'>
          {
            isMyProfile && 
            <CreatePost/>
            
          }
          
         {
          userProfile?.posts?.map(post => {
           return  <Post key={post._id} post={post}/>
          })
         }

        </div>
        <div className='rightPart'>
          <div className='profileCard'>
            <img className='userImg' src={userProfile?.avatar?.url || userImg} alt='user img'/>
            <h3 className='userName'>{userProfile?.name}</h3>
            <p>{userProfile?.bio}</p>
            <div className='followerInfo'>
              <h4>{userProfile?.followers?.length} Followers</h4>
              <h4>{userProfile?.followings?.length} following</h4>
            </div>
            {!isMyProfile && 
              (isFollowing ? 
                <button onClick={handleFollowAndUnfollow} className='follow btn-primary' >Unfollow</button>
                  :<button onClick={handleFollowAndUnfollow} className='follow btn-primary' >follow</button>)
                  }
            {isMyProfile && (<button className='updateProfile btn-secondary' onClick={()=>{
              navigate('/updateProfile')
            }}>Update Profile</button>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile