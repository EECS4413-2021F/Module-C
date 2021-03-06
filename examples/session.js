#!/usr/bin/env node

const express = require('express');
const session = require('express-session');

const app  = express();
const port = process.argv[2] || 3000;

app.enable('trust proxy');

// Use the session middleware
app.use(session({ 
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  proxy: true,
  cookie: {
    maxAge: 60000
  }
}));

// Access the session as req.session
app.get('/views', function (req, res) {
  console.log(`From ${req.ip}, Request ${req.url}`);
  if (req.session.views) {
    req.session.views += 1;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + req.session.views + '</p>');
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
    res.end();
  } else {
    req.session.views = 1;
    res.end('welcome to the session demo. refresh!');
  }
});

const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`server listening to ${host}:${port}`);
});
