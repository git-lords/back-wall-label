import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../shared/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <button
      onClick={async () => {
        logout();
        navigate("/");
      }}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
