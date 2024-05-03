import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from '../../utils/axiosClient';
import { setLoading } from "./appConfigSlice";
import { likeAndUnlike } from "./postsSlice";


export const getFeedData = createAsyncThunk('user/getFeedData' , async(body  ,thunkAPI) =>{
    try {
        thunkAPI.dispatch(setLoading(true)) ; 
       // console.log("fine") ; 
        const  response  = await axiosClient.get('/user/getFeedData' ); 
       console.log("user feed data  profile " , response.result) ; 
        return response.result ; 
    } catch (error) {
        console.log("error is :" , error) ; 
        return Promise.reject(error)  ;
    }finally{
        thunkAPI.dispatch(setLoading(false)) ; 
    }
})

export const followAndUnfollowUser = createAsyncThunk('user/followAndUnfollowUser' , async (body , thunkAPI)=> {
    try {
        thunkAPI.dispatch(setLoading(true)) ; 
        // console.log("fine") ; 
         const  response  = await axiosClient.post('/user/follow' , body); 
         console.log("user profile " , response.result) ; 
         return response.result.userToFollow ; 
    } catch (error) {
        console.log("error is :" , error) ; 
        return Promise.reject(error)  ;
    }finally{
        thunkAPI.dispatch(setLoading(false)) ; 
    }
})


const feedSlice = createSlice({
    name :'feedSlice' , 
    initialState: {
        feedData:{} 
    } ,  
    extraReducers : (builder) =>{
        builder.addCase(getFeedData.fulfilled , (state , action) =>{
            state.feedData = action.payload ;
        })
        .addCase(likeAndUnlike.fulfilled , (state , action) =>{
            const post = action.payload ;
            const index = state?.feedData?.posts?.findIndex(item => item._id ===post._id) ; 
            if(index !=undefined &&  index !=-1) {
                state.feedData.posts[index] = post ; 
            } 
        })
        .addCase(followAndUnfollowUser.fulfilled , (state , action) =>{
            const user = action.payload ;
            const index = state?.feedData?.followings?.findIndex(item => item._id === user._id) ; 
        //    const index2 = state?.feedData?.suggestions?.findIndex(item => item._id ===user._id) ; 

            if(index !=undefined &&  index !=-1) {
                state.feedData.followings.splice(index , 1 ) ; 
              //  state.feedData.suggestions.push(user ) ; 
            } 
            else {
              //  state.feedData.suggestions.splice(index , 1 ) ; 
                state.feedData.followings.push(user) ; 
            }

        })
    }
})

export default feedSlice.reducer ; 