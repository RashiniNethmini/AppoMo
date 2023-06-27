//assign dependencies to variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();  // to read the ".env" file


const PORT = process.env.PORT || 8070;  //define a port for the server.
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
   //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
   // useFindAndModify:false,

});

const connection = mongoose.connection;  //connect the database
connection.once("open", () => {
    console.log("Mongodb connection successful");
})


const ForgotPwRouter = require('./routes/ForgotPW.js');
app.use("/forgotPw", ForgotPwRouter);

// const validateOTPRouter = require('./routes/ForgotPW.js');
// app.use("/validateOTP", validateOTPRouter);

const advancePaymentRouter = require("./routes/Advpayment.js");
app.use("/Advpayment", advancePaymentRouter);


const loginRouter = require("./routes/Login.js");
app.use("/login", loginRouter);
app.use("/userdetails", loginRouter);

const ConfApntmntsRouter = require("./routes/Appointments.js");
 app.use("/Appointments",ConfApntmntsRouter);

const BrDetailsRouter = require("./routes/BranchDetails.js");
 app.use("/BranchDetails", BrDetailsRouter);
 
// const IssueRouter = require("./routes/Issues.js");
// app.use("/Issues", IssueRouter);
// const smsRouter = require("./APIs/sms.js");
// app.use('/sms', smsRouter);

const UserDetailsRouter = require("./routes/UserDetails.js");
app.use("/UserDetails", UserDetailsRouter);

const serviceproviderRouter = require ("./routes/serviceproviders.js");
app.use("/serviceprovider", serviceproviderRouter);

const ProductRouter = require ("./routes/Products.js");
app.use("/Product", ProductRouter);

const SignUpDetailsRouter = require ("./routes/SignUpDetails.js");
app.use("/SignUpDetails", SignUpDetailsRouter);

const invoiceRoutes = require('./routes/Invoice.js');
app.use('/Invoice', invoiceRoutes);

const appointmentRouter = require('./routes/Appointments.js');
app.use('/Appointments', appointmentRouter);



app.listen(PORT,() =>{
    console.log('Server is running on port '+PORT);
})
