/**
 * One of the great things about using Passport.js is that a lot of the heavy lifting is taken care of by the module.
 * In order to use it, we need to configure it and implement the cookies and sessions for persistent logins.
 * 
 * To start using teh traditional authentication module.
 * we install [passport] and [passport-local] packages via the terminal
 * $ npm install passport passport-local
 * Once imported, we require the [passport] and [passport-local] packages in our javascript file
 */
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
/**
 * We're importing the [passport-local] package with its [Strategy] instance to authenticate users with a username and password.
 * 
 * Now that we have the package installed, we can initialize it by calling the [initialize()] method
 */
app.use(passport.initialize());
/**
 * [passport] is a #middleware and must be implemented using [app.use()].
 * The [initialize()] method initializes the authentication module across our app.
 * 
 * Next we want to allow for persistent logins,
 * and we do this by calling [session()] on our [passport] module
 */
app.use(passport.session());
/**
 * the [session()] middleware alters the request object and is able to attach a 'user' value that can be retrieved from the session id. 
 */
/****************************************************************************************************************************************************************/
/*
//before:
const express = require("express");
const app = express();
// Import the passport library below:

// Import the passport-local library below:

const session = require("express-session");
const PORT = process.env.PORT || 5000;

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Add the middleware to initialize the passport library below:

// Add the middleware to implement a session with passport below:

app.get("/", (req, res) => {
  res.send("Hello from the homepage!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
 */
/****************************************************************************************************************************************************************/
/**
 ‘user’ value that can be retrieved from the session id.

Instructions
Checkpoint 1 Passed
1.
Import the passport library and store it in a const variable called passport at the top of the app.js file.

Type node app.js into the Terminal to start the node app.

Press the Check Work button to check your work for each checkpoint.

Checkpoint 2 Passed
2.
Import the passport-local library with its Strategy module and store it in a const variable called LocalStrategy.

Checkpoint 3 Passed
3.
Add the middleware necessary to initialize the passport library.

Checkpoint 4 Passed
4.
Add the middleware to implement a session with passport.
 */
/****************************************************************************************************************************************************************/

const express = require("express");
const app = express();
// Import the passport library below:
const passport = require("passport");
// Import the passport-local library below:
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const PORT = process.env.PORT || 5000;

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Add the middleware to initialize the passport library below:
app.use(passport.initialize());
// Add the middleware to implement a session with passport below:
app.use(passport.session());
app.get("/", (req, res) => {
  res.send("Hello from the homepage!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
//$ node app.js
//Server is listening on port: 5000