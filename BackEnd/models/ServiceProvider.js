const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceproviderSchema = new Schema({
    providerType :{
        type : String,
        required: true
    },
    logo :{
        // data: Buffer,
        // contentType: String,
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
        required: true,
        unique: true
    },
    ceoName : {
        type : String,
        // required: true
    },
    regNo : {
        type : String,
        required: true
    },

    // starRating: {
    //     type: Number,
    //     // required: true,
    //   },
    // workingDates : {
    //     type : String,
    //     required: true
    // },
    // workingHours : {
    //     type : String,
    //     required: true
    // },
    // noOfAppoinments : {
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

// // AppointmentSchedule Schema
// const appointmentSchema = new Schema({
//     timeSlot: {
//       type: Date,
//       required: true,
//     },
//     serviceCenterId: {
//       type: Schema.Types.ObjectId,
//       ref: 'ServiceProvider',
//       required: true,
//     },
//     appointmentCount: {
//       type: Number,
//       default: 0,
//     },
//   });
  
  
//   const AppointmentSchedule = mongoose.model('AppointmentSchedule', appointmentSchema);
//   module.exports = AppointmentSchedule;
