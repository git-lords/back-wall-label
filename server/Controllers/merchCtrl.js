import { Product } from "../model.js";

export default {
  getOneProduct: async (req, res) => {
    console.log("getOneProduct!");

    try {
      const { id } = req.params;

      const foundProduct = await Product.findOne({
        where: { productId: id },
      });
      if (!foundProduct) {
        res.status(400).send("Couldn't find that product!");
      } else {
        res.status(200).send(foundProduct);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },

  getAllProducts: async (req, res) => {
    try {
      console.log("getAllProducts");

      const products = await Product.findAll();

      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong while getting products!");
    }
  },
};
