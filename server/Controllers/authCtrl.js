import { User } from "../model.js";
import { useAuth0 } from "@auth0/auth0-react";

export default {
  login: (req, res) => {
    console.log("login");
    const { user } = useAuth0;
    res.send(user);
  },
  register: (req, res) => {
    console.log("register");
    res.send("register");
  },
  updateUser: (req, res) => {
    console.log("updateUser");
    res.send("updateUser");
  },
  logout: (req, res) => {
    console.log("logout");
    res.send("logout");
  },
  getUser: async (req, res) => {
    try {
      console.log("getUser");
      if (req.session.user) {
        res.send(req.session.user);
        const user = await User.findByPk(user.userId);
      } else res.send(await User.findByPk(4));
    } catch (error) {
      console.log(error);
    }
  },
};
