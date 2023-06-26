const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signUpSchema = new Schema({
    serviceProviderName : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true,
        // unique: true
    },
    regNo : {
        type : String,
        required: true
    },
    verificationCode :{
        type : Number,
    }

})

const SignUpDetails = mongoose.model("SignUpDetails", signUpSchema);
module.exports = SignUpDetails;