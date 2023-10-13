import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { user } = useAuth0();
  useEffect(() => {
    if (user) {
      axios.post("/login", user);
    }
  }, []);

  return <div className="page dark:text-[#9EBC9F]">Home</div>;
}
