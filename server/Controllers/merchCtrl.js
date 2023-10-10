import { Product } from '../model.js'

export default {
  getProduct: async (req, res) => {
    console.log("getProduct");
    res.send("getProducts");
  },
  getAllProducts: async (req, res) => {
    try {
      console.log("getAllProducts");

      const products = await Product.findAll()

      res.status(200).send(products)
    } catch (err) {
      console.log(err)
      res.status(500).send("Something went wrong while getting products!");
    }
  },
};
