const fs = require('fs');
const axios = require('axios');
const https = require('https');

const serverUrl = 'https://localhost:8080/authenticate';

let opts = {
  httpsAgent: new https.Agent({
    cert: fs.readFileSync('../cert/client_cert.pem'),
    key: fs.readFileSync('../cert/client_key.pem'),
    rejectUnauthorized: false
  })
};

axios.get(serverUrl, opts)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err.response.data);
  });