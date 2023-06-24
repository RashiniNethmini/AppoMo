var https = require('follow-redirects').https;
var fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });


const API_KEY=process.env.API_KEY;

function sendSms(mobileNumber, message) {
  var options = {
    method: 'POST',
    hostname: 'yrm6dp.api.infobip.com',
    path: '/sms/2/text/advanced',
    headers: {
      Authorization: 'App '+API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    maxRedirects: 20,
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on('error', function (error) {
      console.error(error);
    });
  });

  var postData = JSON.stringify({
    messages: [
      {
        destinations: [
          {
            to: '+94' + mobileNumber,
          },
        ],
        from: 'InfoSMS',
        text: `${message} `,
      },
    ],
  });

  req.write(postData);
  req.end();
}

module.exports = sendSms;