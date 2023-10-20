import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../shared/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <button className="border-2 border-solid p-3 mt-4 bg-lightOrange dark:bg-burntOrange text-lg font-bold rounded-md"
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
