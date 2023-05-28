const router = require('express').Router();
const express = require('express');
const bodyParser = require('body-parser');
const { Vonage } = require('@vonage/server-sdk');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const SMS_API_KEY = process.env.SMS_API_KEY;
const SMS_API_SECRET_KEY = process.env.SMS_API_SECRET_KEY;

const from = "Vonage APIs"

const vonage = new Vonage({
  apiKey: SMS_API_KEY,
  apiSecret: SMS_API_SECRET_KEY
});

const app = express();
app.use(bodyParser.json());

router.route("/").post(async (req, res) => {
    console.log("Working...");
    const { to, text } = req.body;
    await vonage.sms.send({ to, from, text })
    .then(resp => {
      console.log('Message sent successfully');
      console.log(resp);
      res.status(200).json({ message: 'SMS sent successfully' });
    })
    .catch(err => {
      console.log('There was an error sending the messages.');
      console.error(err);
      res.status(500).json({ message: 'Failed to send SMS' });
    });

})

module.exports = router;

