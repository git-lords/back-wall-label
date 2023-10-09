export default {
  login: (req, res) => {
    console.log("login");
    res.send("login");
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
};
