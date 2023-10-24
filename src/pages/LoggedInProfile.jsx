import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../shared/AuthContext";
import axios from "axios";
import LogoutButton from "./Logout";
import Admin from "../elements/Admin";
import BandProfile from "../elements/BandProfile";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userContext"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBand, setIsBand] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/getUser").then((res) => {
      setUserData(res.data);
      setIsAdmin(res.data.adminStatus);
      setIsBand(res.data.bandStatus);
    });
    // console.log(user.data);
    !user && navigate("/");
  }, []);
  return (
    <div className="page h-4/5 coggy bg-lightOrange dark:bg-zinc-800 ">
      {isAdmin ? <Admin /> : <BandProfile />}
      <div className="flex items-center justify-center">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Profile;
