

import { useDispatch } from 'react-redux';
import Avatar from './../avatar/Avatar';
import './Post.scss'  ;
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { likeAndUnlike } from '../../redux/slices/postsSlice';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../redux/slices/appConfigSlice';
import { TOAST_SUCCESS } from '../../App';
function Post({post}) {
    const navigate = useNavigate() ; 
 // console.log(post)  ; 
  const dispatch = useDispatch() ; 

  async function onLikeHandle () {
    dispatch(likeAndUnlike({postId:post._id})) ; 
   // console.log("liked cliked") ; 
    dispatch(showToast({type:TOAST_SUCCESS , message :"like or unlike "}))
  }
  return (
    <div className='Post'>
        <div className='heading' onClick={()=>{
          navigate(`/profile/${post?.owner?._id}`)   ; 
          }}>
            <Avatar src={post?.owner?.avatar?.url}/>
            <h4>{post?.owner?.name}</h4>
        </div>
        <div className='contant'>

            <img src={post?.image?.url} alt='post'/>
        </div>
        <div className='footer'>
            <div className='like hover-link' onClick={onLikeHandle}>
                {post?.isLiked ? <AiFillHeart className='icon hover-link' style={{color:'red'}}/>: <AiOutlineHeart className='icon hover-link'/>}
            <h4>{`${post?.likeCount} likes`}</h4>
            </div>
            <p className='caption'>  {post?.caption} </p>
            <h6 className='timeAgo'> {post?.timeAgo} </h6>
        </div>

    </div>
  )
}

export default Post