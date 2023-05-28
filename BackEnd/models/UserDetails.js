const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userdetailsSchema = new Schema({

    username: {
        type: String,
        required: true,
    },
   password: {
        type: String,
        required: true,
    },
    email: {
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
   
    nic:{
        type: String,
        required: true,
    },


})
const UserDetails = mongoose.model('UserDetails', userdetailsSchema);
module.exports = UserDetails;
