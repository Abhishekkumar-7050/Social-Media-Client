
import store from '../redux/Store'
import {  showToast } from "../redux/slices/appConfigSlice";
import { TOAST_FAILURE} from "../App";
import axios from "axios";

import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";


export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  // baseURL:'http://localhost:4000',

  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN); // take acces token from local storage
  // and sending the token header
  // console.log("sending access token from loccal storege", accessToken);
  // console.log("access token from local storage ", accessToken);

  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

axiosClient.interceptors.response.use(async (response) => {
  const data = response.data;
  // console.log(" axios respons data",data);
  if (data.status === "ok") {
    return data;
  }


  const orginalRequest = response.config; // it gives the orginal request api call
  const statusCode = data.statusCode;
  const error = data.message;
  console.log("backend error", error);
  store.dispatch(showToast({
    type:TOAST_FAILURE , 
    message :error
  })) ; 



  // when refresh token got expire send user on login page
  
  if (statusCode === 401 && !orginalRequest._retry) {
    orginalRequest._retry = true;
    // it means we have to call refresh api
    // here we have to add something
    const response = await axios
      .create({
        withCredentials: true,
      })
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);
     console.log("res from refres if 401",response.data.data.AccessToken);
    
     if (response.status === "ok") {
      setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);

      orginalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data.result.accessToken}`;

      return axios(orginalRequest);
    }
     
     else {
      // it means user ko 1 ssall ho gya
      // this will log out the use
      // remove accesss token from local storage
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login", "_self");
      
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
});

