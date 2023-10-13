import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Orders from "../elements/Orders";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBand, setIsBand] = useState(false);
  const [userData, setUserData] = useState({});
  const [userOrders, setUserOrders] = useState({});

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated && isAdmin ? (
    <>Admin page</>
  ) : isBand ? (
    <>Band Page</>
  ) : (
    <div className="page">
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <Orders user={user} />
    </div>
  );
};

export default Profile;
