import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const LoginButton = () => {
  const { loginWithRedirect, user } = useAuth0();

  const handleLogin = async () => {
    try {
      loginWithRedirect();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleLogin}>Log In</button>
    </>
  );
};

export default LoginButton;
