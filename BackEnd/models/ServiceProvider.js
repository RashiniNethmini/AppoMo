const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceproviderSchema = new Schema({
    providerType :{
        type : String,
        required: true
    },
    logo :{
        type : String,    
    },
    username : {
        type : String,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true
    },
    serviceProviderName : {
        type : String,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true,
        unique: true
    },
    ceoName : {
        type : String,
        // required: true
    },
    // regNo : {
    //     type : String,
    //     required: true
    // },

    starRating: {
        type: Number,
        // required: true,
      },
    
    

})

const ServiceProvider = mongoose.model("ServiceProvider", serviceproviderSchema);
module.exports = ServiceProvider;


