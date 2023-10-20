import { User } from "../model.js";
import bcrypt from "bcryptjs";

export default {
  login: async (req, res) => {
    try {
      console.log("login");
      const { username, password } = req.body.userData;

      const currentUser = await User.findOne({ where: { username } });
      if (currentUser) {
        const loggedIn = bcrypt.compareSync(password, currentUser.password);
        if (loggedIn) {
          req.session.user = {
            userId: currentUser.userId,
            username: currentUser.username,
            adminStatus: currentUser.adminStatus,
            bandStatus: currentUser.bandStatus,
          };
          // console.log(req.session.user);
          res.send({
            userId: currentUser.userId,
            username: currentUser.username,
            adminStatus: currentUser.adminStatus,
            bandStatus: currentUser.bandStatus,
          });
        } else res.status(401).send("Incorrect Password");
      } else res.status(401).send("There is no user with that username");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
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
    try {
      console.log("logout");
      req.session.destroy();
      res.status(200).send("there is no user on the session");
    } catch (error) {
      console.log(error);
    }
  },
  getUser: async (req, res) => {
    try {
      console.log("getUser");
      if (req.session.user) {
        res.send(req.session.user);
        // console.log(req.session.user);
      } else res.send("There is no user logged in");
    } catch (error) {
      console.log(error);
    }
  },
};
