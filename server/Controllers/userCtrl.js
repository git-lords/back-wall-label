import { Order } from "../model.js";

export default {
  getAllOrders: (req, res) => {
    console.log("getOrders");
    res.send("getOrders");
  },
  getOrders: async (req, res) => {
    try {
      console.log("getOrders");
      if (req.session.user) {
        const { userId } = req.session.user;
        const orders = await Order.findAll({ where: { userId } });
        res.send(orders);
      } else res.send(await Order.findAll({ where: { userId: 3 } }));
    } catch (error) {
      console.log(error);
    }
  },
};
