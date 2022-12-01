const express = require('express');
// const http = require('https');
const { http, https } = require('follow-redirects');
const querystring = require('querystring');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

const port = 1122;

const params = {
  response_type : "token",
  client_id : "2616568C",
  redirect_uri : "",
  state : ""
};

//https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize

const get_request_args = querystring.stringify(params);

const options = {
    "method": "GET",
    "hostname": "betaapi.digilocker.gov.in",
    "port": null,
    "path": "/public/oauth2/1/authorize"  + get_request_args,
    "headers": {
      'Content-Type': 'application/json',
    }
};

let data = [];

const getData = () => {
  console.log("working");
  const request = https.request(options, function(res) {
    const chunks = [];
    console.log(res.statusCode);

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      data += body.toString();
      console.log(data);
    });
  });

  request.on('error', (error) => {
    console.log(error);
  });
};

//getData();

router.get("/", (req, res) => {
    res.send("test");
});

router.get("/callback", (req, res) => {
  res.send("callback");
  //console.log(req);
});

// router.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
