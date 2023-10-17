import React from "react";
import { AdminHeroForm } from "./adminHeroForm";
import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get("/getAllUsers").then((res) => {
      console.log(res.data);
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
    <div className="h-screen flex flex-col items-center justify-evenly">
      <div className="h-3/4 border w-1/2 flex flex-col items-center justify-evenly">
        <h1 className="basis-10">Admin Dashboard</h1>
        <AdminHeroForm />
        <div>
          <h1>Users:</h1>
          <table className="border">
            <thead>
              <tr className="border">
                <td>User Id</td>
                <td>Username</td>
                <td>User adminStatus</td>
                <td>User bandStatus</td>
              </tr>
            </thead>
            <tbody>{users}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
