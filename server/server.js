const fs = require('fs');
const https = require('https');
const express = require('express');


const options = {
  key: fs.readFileSync('../cert/server_key.pem'),
  cert: fs.readFileSync('../cert/server_cert.pem'),
  ca: [
    fs.readFileSync('../cert/server_cert.pem')
  ],
  requestCert: true,
  rejectUnauthorized: false
};

const app = express();


app.get('/authenticate', (req, res) => {
  const cert = req.socket.getPeerCertificate();

  if (req.client.authorized) {
    res.send(`Hello ${cert.subject.CN}, your certificate was issued by ${cert.issuer.CN}!`);

  } else if (cert.subject) {
    res.status(403)
      .send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`);

  } else {
    res.status(401)
      .send(`Sorry, but you need to provide a client certificate to continue.`);
  }
});

app.listen(8000);

https.createServer(options, app).listen(8080);