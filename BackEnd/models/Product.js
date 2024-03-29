const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  
  MobilePhone: {
    type: [String],
    default:[]
  },
  Laptop: {
    type: [String],
    default:[]
  },
  Desktop: {
    type: [String],
    default:[]
  },
  WashingMachine: {
    type: [String],
    default:[]
  },
  Television: {
    type: [String],
    default:[]
  },
  Company: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ServiceProvider' 
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
