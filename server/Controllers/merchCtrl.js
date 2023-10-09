export default {
  getProduct: (req, res) => {
    console.log("getProduct");
    res.send("getProducts");
  },
  getAllProducts: (req, res) => {
    console.log("getAllProduct");
    res.send("getAllProducts");
  },
};
