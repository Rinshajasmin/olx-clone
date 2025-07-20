import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { auth, db, login, signup, logout  } from "../../firebase"; 
import { toast } from "react-toastify";
import Loader from '../Loading/Loader';
import { userDataContext } from '../Context/authContext';

const AuthModal = ({ isOpen, onClose, mode, setMode, onLoginSuccess }) => {
  const{name,setEmail,password,setPassword,email,setName,loading,setLoding}=useContext(userDataContext)
 
  if (!isOpen) return null;


  const handleSignup = async () => {
    try {
      setLoding(true)
     const data = await signup(name,email,password)
      if(data){
       toast.success('Account created SuccessFull') 
      setLoding(false)
      onLoginSuccess(data); 
      setMode("login");
      setEmail("");
      setPassword("")
      setName("")
      }

    } catch (error) {
      setLoding(false)
      console.log(error.code.split('/')[1].split('-').join(' '));
      toast.error(error.code.split('/')[1].split('-').join(' '));
    }
  };


  const handleLogin = async () => {
    try {
      setLoding(true)
      const data = await login(email,password);
      if(data){
        setLoding(false)
        toast.success('Login successFully')
        onLoginSuccess(data); 
      onClose(); 
      setEmail("");
      setPassword("")
      setName("")
      }
    } catch (error) {
      setLoding(false)
      console.log(error.code.split('/')[1].split('-').join(' '));
      toast.error(error.code.split('/')[1].split('-').join(' '));
    }
  };

  return (
    <div className="fixed inset-0 bg-white/0 backdrop-blur-md flex justify-center items-center">
      {loading?<Loader />:<div className="bg-white rounded-lg w-96 p-6 shadow-lg">
        <div className="flex justify-between items-center">
          {mode === "signup" && (
            <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer text-gray-600" onClick={() => setMode("login")} />
          )}
          <FontAwesomeIcon icon={faTimes} className="cursor-pointer text-gray-600" onClick={onClose} />
        </div>
        <div className="flex justify-center my-4">
          <h1 className="text-3xl font-bold text-gray-800">OLX</h1>
        </div>
        <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
          {mode === "signup" ? "Create an account" : "Login to your account"}
        </h2>

        {mode === "signup" && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border-2 border-gray-300 rounded-md p-2 mb-3 outline-none focus:border-teal-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border-2 border-gray-300 rounded-md p-2 mb-3 outline-none focus:border-teal-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border-2 border-gray-300 rounded-md p-2 mb-3 outline-none focus:border-teal-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-teal-500 text-white font-semibold py-2 rounded-md mt-2"
          onClick={mode === "signup" ? handleSignup : handleLogin}
        >
          {mode === "signup" ? "Sign Up" : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-3">
          {mode === "signup" ? "Already have an account?" : "New to OLX?"}{" "}
          <span className="text-teal-600 font-semibold cursor-pointer" onClick={() => setMode(mode === "signup" ? "login" : "signup")}>
            {mode === "signup" ? "Login" : "Create Account"}
          </span>
        </p>
      </div>}
    </div>
  );
};


export default AuthModal;
