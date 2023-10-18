import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBand, setIsBand] = useState(false);
  const [userData, setUserData] = useState({});
  const [userOrders, setUserOrders] = useState({});

  useEffect(() => {
    axios.get("/getUser").then((res) => {
      console.log(res.data);
      setUserData(res.data);
      setIsBand(res.data.bandStatus);
      setIsAdmin(res.data.adminStatus);
    });
    axios.get("/getOrders").then((res) => {
      console.log(res.data);
      setUserOrders(res.data);
    });
  }, []);

  return isAdmin ? (
    <div>Admin Panel</div>
  ) : isBand ? (
    <>Band Panel</>
  ) : (
    <div className="h-screen pt-40 flex justify-evenly">
      <div className="border h-3/4 w-3/4 flex flex-col justify-evenly items-center">
        <div>{`Welcome ${userData.userName}`}</div>
        <div className="basis-60 w-1/2 h-full">
          <div>
            <h1>Orders</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
