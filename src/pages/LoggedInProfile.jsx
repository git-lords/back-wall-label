import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../shared/AuthContext";
import axios from "axios";
import LogoutButton from "./Logout";
import Admin from "../elements/Admin";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userContext"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/getUser").then((res) => {
      setUserData(res.data);
      setIsAdmin(res.data.adminStatus);
    });
    !user && navigate("/");
  }, []);
  return (
    <div className="page h-full coggy bg-lightOrange dark:bg-zinc-800 ">
      <Admin />
      <div className="flex items-center justify-center">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Profile;
