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
    // <div className="pt-40 h-screen w-screen items-center flex flex-col">
    //   <div className="flex flex-col items-center h-1/2 w-3/4 justify-evenly">
    //     <h1 className="text-3xl">Login</h1>
    //     <form
    //       className="flex flex-col w-1/2 justify-evenly items-center h-1/2"
    //       onSubmit={handleSubmit}
    //     >
    //       <div className="flex flex-col w-1/2">
    //         <label htmlFor="username">Username</label>
    //         <input
    //           className="bg-inherit border text-inherit"
    //           type="text"
    //           name="username"
    //           id="username"
    //           onChange={(e) => setUsername(e.target.value)}
    //         />
    //       </div>
    //       <div className="flex flex-col w-1/2">
    //         <label htmlFor="passwords">Password</label>
    //         <input
    //           className="bg-inherit border text-inherit"
    //           type="password"
    //           name="password"
    //           id="password"
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>
    //       <button className="border w-1/2 p-4 m-4 hover:bg-white hover:text-black duration-200">
    //         Login
    //       </button>
    //     </form>
    //   </div>
    // </div>

    // <div className="pt-8 sm:pt-20 h-screen w-screen items-center flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
    //   <div className="flex flex-col items-center h-1/2 w-3/4 justify-evenly">
    //     <h1 className="text-3xl sm:text-4xl">Login</h1>
    //     <form
    //       className="flex flex-col w-full sm:w-1/2 justify-evenly items-center h-1/2"
    //       onSubmit={handleSubmit}
    //     >
    //       <div className="flex flex-col w-full">
    //         <label htmlFor="username">Username</label>
    //         <input
    //           className="bg-inherit dark:bg-gray-800 border text-inherit dark:text-white rounded-md p-2"
    //           type="text"
    //           name="username"
    //           id="username"
    //           onChange={(e) => setUsername(e.target.value)}
    //         />
    //       </div>
    //       <div className="flex flex-col w-full">
    //         <label htmlFor="passwords">Password</label>
    //         <input
    //           className="bg-inherit dark:bg-gray-800 border text-inherit dark:text-white rounded-md p-2"
    //           type="password"
    //           name="password"
    //           id="password"
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>
    //       <button className="border w-full sm:w-1/2 p-4 m-4 hover:bg-white hover:text-black dark:hover:bg-gray-800 dark:hover:text-white duration-200 rounded-md">
    //         Login
    //       </button>
    //     </form>
    //   </div>
    // </div>


    <div className="pt-40 h-screen w-screen items-center flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white md:pt-80">
      <div className="max-w-md border p-10 rounded-md shadow-md dark:border-slate-500 dark:shadow-cyan-700/50">
        <h1 className="text-3xl sm:text-4xl font-semibold">Login</h1>
        <form
          className="flex flex-col justify-evenly items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full py-4">
            <label htmlFor="username" className="text-xl">Username</label>
            <input
              className="w-full bg-inherit dark:bg-gray-800 border text-inherit dark:text-white dark:border-slate-500 rounded-md p-2"
              type="text"
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-full pt-4 pb-6">
            <label htmlFor="passwords" className="text-xl">Password</label>
            <input
              className="w-full bg-inherit dark:bg-gray-800 border text-inherit dark:text-white dark:border-slate-500 rounded-md p-2"
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* <button className="border w-full p-4 m-4 hover:bg-white hover:text-black dark:hover:bg-gray-800 dark:hover:text-white duration-200 rounded-md">
            Login
          </button> */}
          <button className="dark:border-none border w-full p-4 m-4 hover:bg-green-50 hover:text-black dark:hover:bg-cyan-800 dark:hover:text-white duration-200 rounded-md shadow-md dark:bg-gray-800 dark:shadow-cyan-600/50 text-xl">
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginButton;
