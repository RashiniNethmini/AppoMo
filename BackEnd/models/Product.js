const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productType: {
    type: String,
    required: true,
  },
  models: [
    {
      type: String,
      required: true,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const typeSchema = new Schema({
//     productType: {
//         type: String,
//         required: true,
//       },
//     models: [
//         {
//           type: String,
//           required: true,
//         },
//       ],
//     });

// const productSchema = new Schema({
//   product: [typeSchema]
  
// });

// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;