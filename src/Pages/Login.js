import React, { useState } from "react";
import axios from "axios";
import baseURL from '../utils/Config.js';
import Success from "../components/Success.js";
import Dialog from '@mui/material/Dialog';
// import { Navigate } from "react-router-dom";

const Login = () => {
  // const [isLoggedIn, setisLoggedIn] = useState(null);
  const [spin, setSpin] = useState(false);
  const [fail, setFail] = useState(false);
  const [userData, setUserData] = useState({
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpin(true);
    const loginData = {
      phone_number: userData.phone_number,
      password: userData.password,
    };
    axios
      .post(`${baseURL}v1/auth/login`, loginData)
      .then((response) => {
        console.log(response.data);
        
        setSpin(false);
        // response.data.users.role_id === "1"
        //   ? console.log("authorised") 
        //   : console.log("Not Authorised");

          if (response.data.user.role_id === 2) {
            document.cookie = `token=${response.data.accessToken}`
            document.cookie = `userId=${response.data.user.user_id}`
            document.cookie = `roleId=${response.data.user.role_id}`
            window.location.href = "/"
            console.log("authorised") 
          } else if(response.data.user.role_id !== 2) {
            console.log(response.data.user.role_id );
            console.log("Not Authorised")
          }
      });
  };

  const [success, setSuccess] = useState(false);

  const handleSuccessClose = () => {
    setSuccess(false);
  }; 

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src={require("../carhire.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12  flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

          <form className="mt-6" action="#" method="POST">
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone_number" // Changed from "nu" to something more descriptive
                value={userData.phone_number} // Assuming your state has a phoneNumber field
                onChange={handleChange} // Make sure handleChange updates the phoneNumber in your state
                placeholder="Enter Phone Number" // Updated placeholder
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" // Optional: Adds a pattern for validation (US phone number format)
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete="true"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="text-right mt-2">
              <a href="/" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                Forgot Password?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              disabled={spin}
            >
              {spin && (
                <div>
                  <svg className="animate-spin h-5 w-5 mr-3 bg-white" viewBox="0 0 20 20"/>
                </div>
              )}
              {spin && <span>Logging In</span>}
              {!spin && <span>Log In</span>}
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          {/* <p className="mt-8">
            Need an account?{" "}
            <a
              href="/"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create an account
            </a>
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default Login;
