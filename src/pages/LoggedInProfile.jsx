import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Orders from "../elements/Orders";
import LogoutButton from "./Logout";
import Admin from "../elements/Admin";
import BandProfile from "../elements/BandProfile";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBand, setIsBand] = useState(false);
  const [userData, setUserData] = useState({});
  const [userOrders, setUserOrders] = useState({});

  // TODO: create user on login so we can track their orders in db
  // when user creates order it links to their db table

  useEffect(async () => {
    await axios.post("/login", { user });
  }, []);

  const displayName = isAuthenticated
    ? user.name.includes("@")
      ? user.nickname
      : user.name
    : null;

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated && isAdmin ? (
    <Admin />
  ) : isBand ? (
    <BandProfile />
  ) : (
    <div className="page">
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <Orders user={user} />
      <LogoutButton />
    </div>
  );
};

export default Profile;
