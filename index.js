#!/usr/bin/env node

import express from 'express';
import session from 'express-session';
import routes  from './routes.js';

const app  = express();
const port = process.argv[2] || 3000;

// Use the session middleware
app.enable('trust proxy');
app.use(session({ 
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  proxy: true
}));

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
