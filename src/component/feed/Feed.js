import React from "react";
import "./Feed.scss";
import Post from '../post/Post'
import Follower from "../follower/Follower";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../../redux/slices/feedSlice";
function Feed() {
 const dispatch = useDispatch();
 const feedData = useSelector(state => state.feedDataReducer.feedData) ; 

  useEffect(()=> {
    dispatch(getFeedData()) ; 
   // console.log(feedData) ; 

  } ,[dispatch]) ; 

  return (
    <div className="Feed">
      <div className="container">
        <div className="left-part">
        {feedData?.posts?.map(post => {
             return  <Post key={post?._id} post = {post}/>
            })}

        </div>
        <div className="right-part">
          <h3 className="title"> You are following </h3>
          {
              feedData?.followings?.map(follow => {
               return  <Follower key={follow?._id} follow={follow}/>
              })
            }

          <h3 className="suggestions">Suggests for you </h3>
          {             
              feedData?.suggestions?.map(follow => {
               return  <Follower key={follow?._id} follow={follow}/>
              })
            }
        </div>
      </div>
    </div>
  );
}

export default Feed;
