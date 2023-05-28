const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const brdetailsSchema = new Schema({

    branchName: {
        type: String,
        required: true,
    },
   managerName: {
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
    },
    
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
  
  
})
const BranchDetails = mongoose.model('BranchDetails', brdetailsSchema);
module.exports = BranchDetails;