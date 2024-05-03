import React from 'react'
import "./signup.scss"
import { axiosClient } from "../../utils/axiosClient";

import { Link } from 'react-router-dom';
import { useState } from 'react';

function Signup_clint() {
  const[name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axiosClient.post("/auth/signup", {
        name,
        email,  // passing the email and password in body
        password,
      });

      console.log(result);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div className="Signup">
      <div className="signup-box">
        <h2 className=" heading">Signup</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
          <input
            type="name"
            className="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />


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
        <p className="subhead"> Already have a account? <Link to="/login">Login</Link> </p>
      </div>
    </div>
  );
}

export default Signup_clint