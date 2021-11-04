#!/usr/bin/env node

const express = require('express');
const session = require('express-session');
const routes  = require('./routes.js');
const config  = require('./config.json');

const app  = express();
const port = process.argv[2] || config.port;

// Use the session middleware
app.enable('trust proxy');
app.use(session(config.session));

// Use middleware to parse request body as JSON.
// bodyParser is deprecated and now merged into express itself.
app.use(express.json());

// Configure routes
routes.configureRoutes(app);

const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`server listening to ${host}:${port}`);
});
