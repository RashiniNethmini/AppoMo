const https = require('follow-redirects').https;
var fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const API_KEY = process.env.API_KEY;

function sendSMS(finalAmount, ContactNo, AptNumber) {
  const options = {
    method: 'POST',
    hostname: 'yrm6dp.api.infobip.com',
    path: '/sms/2/text/advanced',
    headers: {
      Authorization: 'App ' + API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    maxRedirects: 20,
  };

  const req = https.request(options, (res) => {
    const chunks = [];

    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', (chunk) => {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      console.log('SMS sent successfully');
    });

    res.on('error', (error) => {
      console.error(error);
    });
  });

  const postData = JSON.stringify({
    messages: [
      {
        destinations: [
          {
            to: '+94' + ContactNo,
          },
        ],
        from: 'InfoSMS',
        text: `Dear Customer, we are pleased to inform you that the repairing process of the device you handed over (Appointment Number: ${AptNumber}) has been successfully completed. The final amount for the repair is LKR ${finalAmount}. Please feel free to contact us if you have any further inquiries. Thank you for choosing our services.`,
      },
    ],
  });

  req.write(postData);
  req.end();
}

module.exports = sendSMS;
