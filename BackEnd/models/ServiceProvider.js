const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceproviderSchema = new Schema({
    type :{
        type : Boolean,
        required: true
    },
    username : {
        type : String,
        required: true
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
        required: true
    },
    ceoName : {
        type : String,
        required: true
    },
    regNo : {
        type : String,
        required: true
    },
    logo :{
        type : String,
    
    }

})

const ServiceProvider = mongoose.model("ServiceProvider", serviceproviderSchema);
module.exports = ServiceProvider;