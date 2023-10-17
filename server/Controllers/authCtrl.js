import { User } from "../model.js";

export default {
  login: (req, res) => {
    console.log("login");
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
