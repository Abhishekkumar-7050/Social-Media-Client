
import './CreatePost.scss'
import Avatar from './../avatar/Avatar';
import {BsCardImage} from 'react-icons/bs' ; 
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {axiosClient} from '../../utils/axiosClient' ; 
import {setLoading} from  '../../redux/slices/appConfigSlice'; 
import { getUserProfile } from '../../redux/slices/postsSlice';

function CreatePost() {
    const [postImg , setPostImage] = useState('') ;
    const [caption , setCaption] = useState()  ; 
    const dispatch = useDispatch() ;
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);  
    
    const handleImgChange = (e) => {
        const file = e.target.files[0] ; 
        const fileReader = new FileReader() ; 

        fileReader.readAsDataURL(file) ; 
        fileReader.onload = () => {
            if(fileReader.readyState === fileReader.DONE) {
              //  console.log("image data " , fileReader.result) ; 
              setPostImage(fileReader.result) ; 
            }
        }
    }

    const handlePostsubmit = async()=> {
        try {
            dispatch(setLoading(true)) ; 
            const post =  await axiosClient.post('/posts' , {
                caption,
                postImg
            })

           console.log("post data done" , post) ; 
            dispatch(getUserProfile({userId:myProfile?._id})) ; 

        } catch (e) {
         //  console.log("post submit handle error" , e) ; 
        }finally{
            dispatch(setLoading(false)) ; 
            setCaption('') ; 
            setPostImage('') ; 
        }
    }
  return (
    <div className='CreatePost'>
        <div className="createPostLeftPart">
            <Avatar src={myProfile?.avatar?.url }/>
        </div>
        <div className="createPostrightPart">
            <input  type='text' className='captionInput' placeholder='input your caption ...'
                onChange={(e)=> setCaption(e.target.value)}/>
            {postImg && (
                 <div className="imageContainer">
                 <img className='postImg' src={postImg} alt='post-image'/>
             </div>
            )}
            <div className="buttomPart">
                <div className="inputPostImg">
                   
                        <label htmlFor="inputImg"  className="labelImg">
                            <BsCardImage className='inputPostIcon'/>
                        </label>
                        <input id='inputImg' className='inputImg' type="file" accept='image/*' onChange={handleImgChange}/>
                </div>
                <button className='postBtn btn-primary' onClick={handlePostsubmit}>post</button>
            </div>

        </div>

    </div>
  )
}

export default CreatePost
