const router = require("express").Router();
const Product = require("../models/Product");

router.route("/add").post((req, res) => {
  const productData = req.body;

  const MobilePhone = Array.isArray(productData.MobilePhone) ? productData.MobilePhone : [productData.MobilePhone];
  const Laptop = Array.isArray(productData.Laptop) ? productData.Laptop : [productData.Laptop];
  const Desktop = Array.isArray(productData.Desktop) ? productData.Desktop : [productData.Desktop];
  const WashingMachine = Array.isArray(productData.WashingMachine) ? productData.WashingMachine : [productData.WashingMachine];
  const Television = Array.isArray(productData.Television) ? productData.Television : [productData.Television];


  const newProduct = new Product({
    MobilePhone,
    Laptop,
    Desktop,
    WashingMachine,
    Television,
  });

  newProduct
    .save()
    .then(() => {
      console.log('Product Added');
      res.json('Product Added');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Failed to add product', message: err.message });
    });
});

router.route("/first").get((req, res) => {
  Product.findOne()
    .then((product) => {
      if (!product) {
        res.status(404).json({ error: 'No products found' });
      } else {
        res.json(product);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Failed to fetch product details', message: err.message });
    });
});

module.exports = router;
