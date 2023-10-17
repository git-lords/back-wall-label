import { Order, User, Product } from "../model.js";

export default {
  getAllOrders: (req, res) => {
    console.log("getOrders");
    res.send("getOrders");
  },
  getOrders: async (req, res) => {
    try {
      console.log("getOrders");
      const { user } = req.body;
      const userId = await User.findOne({ where: { email: user.email } });
      const orders = await Order.findAll({ where: { userId: userId.userId } });
      if (orders) {
        const orderData = await Promise.all(
          orders.map(async (order) => ({
            product: await Product.findOne({
              where: { productId: order.productId },
            }),
            orderId: order.orderId,
            time: order.time,
          }))
        );
        res.send(orderData);
      } else res.send("no orders yet for this user");
    } catch (error) {
      console.log(error);
    }
  },
};
