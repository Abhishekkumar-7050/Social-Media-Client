import React, { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";
function Loginclient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // api call
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axiosClient.post("/auth/login", {
        email,  // passing the email and password in body
        password,
      });
      // console.log("result from login as user",result.result.accessToken);
      setItem(KEY_ACCESS_TOKEN, result.result.accessToken);

         navigate("/");
          // console.log("result is ->", result);
      
      // console.log("Access token ->",result.result.accessToken);

    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div className="Login">
      <div className="login-box">
        <h2 className=" heading">Login</h2>
        <form onSubmit={handleSubmit}>
        
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" className="submit" />
        </form>
        <p className="subhead">
          
          Do not have a account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Loginclient;
