require('dotenv').config();

// Fix silent errors
'use strict';

// Import web app framework
const express = require('express');

// Import middleware (function for processing a request) for checking previous requests from clients using cookies
const session = require('express-session');

// Import authentication middleware
const passport = require('passport');

// Import module for authentication
const auth = require('./auth.js')

// Import router object
const router = require('./router')

// Create an Express application
const app = express();

// Set template engine
app.set('view engine', 'pug');

// Set up web server with path for static files
app.use(express.static("public"));

// Enable middleware to parse request objects as JSON Object
app.use(express.json());

// Enable middleware to parse request objects as strings or arrays
app.use(express.urlencoded({ extended: true }));

// Enable middleware for session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Initialize passport
app.use(passport.initialize());

// Tell passport to use session
app.use(passport.session());

app.use("/", router);

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port ' + process.env.PORT);
});

// Make Express app available for testing
module.exports.app = app;
