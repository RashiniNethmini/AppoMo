const router = require("express").Router();
const Product = require("../models/Product");

router.route("/add").post((req, res) => {
  const products = req.body;

  Product.insertMany(products)
    .then(() => {
      res.json("Products Added");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Error occurred while adding the products");
    });
});

module.exports = router;