const express = require('express');const fs = require('fs');const https = require('https');
const app = express();
app.get('/', function (req, res) {
  res.send('Welcome to HTTPS');
});
https
  .createServer(
    {
      key: fs.readFile('sshServer.key'),      cert: fs.readFile('sshServer.cert'),
    },
    app
  )
  .listen(3000, function () {    console.log('Server running on HTTPS');  });
