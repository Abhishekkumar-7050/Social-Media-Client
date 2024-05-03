import React from "react";
import Avatar from "../avatar/Avatar";
import "./Follower.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";

function Follower({ follow }) {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const [isFollowing, setIsFollowing] = useState();
  const navigate = useNavigate();

  //  console.log("props data in Follower",{follow});
  function handleFollowAndUnfollow() {
    dispatch(followAndUnfollowUser({ userToFollowId: follow?._id }));
  }

  useEffect(() => {
    setIsFollowing(
      feedData?.followings?.find((item) => item?._id === follow?._id)
    );
  }, [feedData]);

  return (
    <div className="Follower">
      <div
        className="user-info"
        onClick={() => navigate(`/profile/${follow?._id}`)}
      >
        <Avatar src={follow?.avatar?.url} />
        <h4 className="name"> {follow?.name}</h4>
      </div>
      <h5  onClick={handleFollowAndUnfollow}
              className={isFollowing? 'follow-link hover-link' :' btn-primary'}>
          {isFollowing?"unfollow":"follow"}
        </h5>

    </div>
  );
}

export default Follower;
