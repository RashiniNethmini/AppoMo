const router = require("express").Router();
const Product = require("../models/Product");

router.route("/add").post((req, res) => {
  const productData = req.body;

  const MobilePhone = Array.isArray(productData.MobilePhone) ? productData.MobilePhone : [productData.MobilePhone];
  const Laptop = Array.isArray(productData.Laptop) ? productData.Laptop : [productData.Laptop];
  const Desktop = Array.isArray(productData.Desktop) ? productData.Desktop : [productData.Desktop];
  const WashingMachine = Array.isArray(productData.WashingMachine) ? productData.WashingMachine : [productData.WashingMachine];
  const Television = Array.isArray(productData.Television) ? productData.Television : [productData.Television];
  const Company=req.body.Company;


  const newProduct = new Product({
    MobilePhone,
    Laptop,
    Desktop,
    WashingMachine,
    Television,
    Company,
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


router.route("/get/Relevant").get((req, res) => {
  Product.findOne()
    .then((product) => {
      if (product.length === 0) {
        res.status(404).json({ error: "No products found" });
      } else {
        res.json(product);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({
          error: "Failed to fetch product details",
          message: err.message,
        });
    });
});

router.route("/update").put((req, res) => {
  const productData = req.body;

  const MobilePhone = Array.isArray(productData.MobilePhone) ? productData.MobilePhone : [productData.MobilePhone];
  const Laptop = Array.isArray(productData.Laptop) ? productData.Laptop : [productData.Laptop];
  const Desktop = Array.isArray(productData.Desktop) ? productData.Desktop : [productData.Desktop];
  const WashingMachine = Array.isArray(productData.WashingMachine) ? productData.WashingMachine : [productData.WashingMachine];
  const Television = Array.isArray(productData.Television) ? productData.Television : [productData.Television];

  Product.findOneAndUpdate(
    {},
    {
      MobilePhone,
      Laptop,
      Desktop,
      WashingMachine,
      Television,
    },
    { new: true }
  )
    .then((updatedProduct) => {
      console.log('Product Updated');
      res.json('Product Updated');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Failed to update product', message: err.message });
    });
});


router.route("/first/:companyId").get((req, res) => {
  const companyId = req.params.companyId;
  Product.findOne({ Company: companyId })
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
