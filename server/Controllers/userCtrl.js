import { Order, User } from "../model.js";

export default {
  getAllOrders: (req, res) => {
    console.log("getOrders");
    res.send("getOrders");
  },
  getOrders: async (req, res) => {
    try {
      console.log("getOrders");
      const { user } = req.body;
      const orders = await Order.findAll({ where: { userId: 5 } });
      console.log(orders);
      res.send(orders);
    } catch (error) {
      console.log(error);
    }
  },
};
