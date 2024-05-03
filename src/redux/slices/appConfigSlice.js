import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import toast from "react-hot-toast";

export const getMyInfo = createAsyncThunk(
  "/user/getMyInfo",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const respons = await axiosClient.get("/user/getmyinfo");
      // console.log("api called data", respons.result);
      return  respons.result;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);


 export const updateMyProfile = createAsyncThunk("user/updateMyProfile", async(body, thunkAPI)=>{
  try {
    thunkAPI.dispatch(setLoading(true));
    const respons = await axiosClient.put("/user/", body);
      console.log("api called data", respons);
    return respons.result;
  } catch (error) {
    console.log("is error",error);
     return Promise.reject(error);
  }
  finally{
    thunkAPI.dispatch(setLoading(false));

  }
 })


const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    toastData:{},
    myProfile:{

    }
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast:(state,action) =>{
       state.toastData = action.payload
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(getMyInfo.fulfilled,(state,action)=>{
        state.myProfile = action.payload.user
    })
    .addCase(updateMyProfile.fulfilled,(state,action)=>{
      state.myProfile = action.payload.user

    })
  }
});
export default appConfigSlice.reducer; // slice reducer ko export

export const { setLoading,showToast } = appConfigSlice.actions;
