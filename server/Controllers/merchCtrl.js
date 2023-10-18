import { Product, Band } from "../model.js";

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
  createProduct: async (req, res) => {
    try {
      console.log("createProduct");
      const { productName, category, price, description, bandId, imgUrls } =
        req.body;

      await Product.create({
        productName,
        category,
        price,
        description,
        bandId,
        imgUrls,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  editProduct: async (req, res) => {
    try {
      console.log("editProduct");
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      console.log("deleteProduct");
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
