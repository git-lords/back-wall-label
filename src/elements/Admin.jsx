import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import MerchForm from "./MerchForm";

import { AdminHeroForm } from "./adminHeroForm";
import { AdminNewsForm } from "./AdminNewsForm";
import PhotoForm from "./PhotoForm";

const Admin = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get("/getAllUsers").then((res) => {
      // console.log(res.data);
      setUserData(res.data);
    });
  }, []);

  const users = userData.map((user) => {
    return (
      <tr key={user.userId}>
        <td>{user.userId}</td>
        <td>{user.username}</td>
        <td>{user.adminStatus.toString()}</td>
        <td>{user.bandStatus.toString()}</td>
      </tr>
    );
  });

  return (
    <div className=" h-[80%] flex flex-col items-center justify-evenly">
      <div className="h-full border w-3/4 flex flex-col items-center justify-evenly mt-4 overflow-scroll bg-zinc-200 dark:bg-zinc-600 dark:bg-opacity-70 bg-opacity-70">
        <h1 className="basis-10 text-lg ">Admin Dashboard</h1>
        <AdminHeroForm />

        <AdminNewsForm />

        <MerchForm />
        <PhotoForm />
        <div className="flex flex-col w-4/5 my-2 bg-zinc-300 border border-zinc-400">
          <h1 className="border border-zinc-400 dark:bg-zinc-700 pl-2">
            Users:
          </h1>
          <table className="border border-zinc-400 dark:bg-zinc-700 ">
            <thead>
              <tr className=" border-b-2 border-zinc-400 dark:bg-zinc-700 w-full">
                <td className="w-1/4 text-center ">User Id</td>
                <td className="w-1/4 text-center ">Username</td>
                <td className="w-1/4 text-center ">adminStatus</td>
                <td className="w-1/4 text-center ">bandStatus</td>
              </tr>
            </thead>
            <tbody className="text-center">{users}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
