import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../shared/AuthContext";

const LoginButton = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userData = {
        username,
        password,
      };
      login({ userData });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-40 h-screen w-screen items-center flex flex-col">
      <div className="flex flex-col items-center h-1/2 w-3/4 justify-evenly">
        <h1 className="text-3xl">Login</h1>
        <form
          className="flex flex-col w-1/2 justify-evenly items-center h-1/2"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-1/2">
            <label htmlFor="username">Username</label>
            <input
              className="bg-inherit border text-inherit"
              type="text"
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="passwords">Password</label>
            <input
              className="bg-inherit border text-inherit"
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="border w-1/2 p-4 m-4 hover:bg-white hover:text-black duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginButton;
