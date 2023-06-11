const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceproviderSchema = new Schema({
    providerType :{
        type : Boolean,
        // required: true
    },
    logo :{
        type : String,
    
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
        // required: true
    },
    regNo : {
        type : String,
        required: true
    },
    workingDates : {
        type : String,
        required: true
    },
    workingHours : {
        type : String,
        required: true
    },
    noOfAppoinments : {
        type : String,
        required: true
    },
    
    

})

const ServiceProvider = mongoose.model("ServiceProvider", serviceproviderSchema);
module.exports = ServiceProvider;