var https = require('follow-redirects').https;
var fs = require('fs');
// const dotenv = require('dotenv');
// dotenv.config({ path: '../.env' });


const API_KEY=process.env.API_KEY;

function sendSms(mobileNumber, message) {
  var options = {
    method: 'POST',
    hostname: 'yrm6dp.api.infobip.com',
    path: '/sms/2/text/advanced',
    headers: {
      Authorization: 'App 33bdf594d26cf68b56c2d4e58b4dfd8e-6b3bb07b-e614-4afc-96c8-972ea5593169 ',
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
        text: `Your payment (${issueNumber}) has been ${message}. `,
      },
    ],
  });

  req.write(postData);
  req.end();
}

module.exports = sendSms;