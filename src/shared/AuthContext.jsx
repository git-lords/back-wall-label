import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const expiration = new Date().getTime() + 36000000;

  const login = async (userData) => {
    try {
      const response = await axios.post("/login", { ...userData });
      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem(
          "userContext",
          JSON.stringify({ data: response.data, expiration })
        );
        console.log("AuthContext: logged in successfully");
        navigate("/Profile");
      } else {
        console.log("AuthContext: login failed");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  const logout = async () => {
    await axios.delete("/logout");
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
