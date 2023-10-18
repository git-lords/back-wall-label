import { User } from "../model.js";

export default {
  getAllUsers: async (req, res) => {
    try {
      console.log("getAllUsers");
      const data = await User.findAll();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
