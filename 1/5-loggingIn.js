/**
 * In order to log in a user we first need a [POST] request that takes in user credentials.
 * We can add passport middleware in order to process the authentication and, if successful, serialize the user for us:
 */
app.post("/login", 
    passport.authenticate("insertStrategyHere", {
        failureRedirect : "/insertPathHere"
    }), 
    (req, res) => {
        res.redirect("profile");
    }
);
/**
 * We're passing in [passport.authenticate()] as middleware.
 * Using the middleware allows Passport.js to take care of the authentication process behind the scenes and creates a user session for us.
 * [passport.authenticate()] takes in:
 * - a string specifying which strategy to employ. in this case we should use a [local] strategy.
 * = an optional object as the second argument. In this case we should set the [failureRedirect] key to ["/login"]
 *      this will redirect the user to the [/login] page if the login process fails.
 * 
 * Once implemented we can update the ["/profile"] endpoint to make use of the serialized user found in the request object, [req.user]:
 */
app.get("/profile", (req, res) => {
    res.sender("insertDashboardNameHere", { user: req.user });
});
/**
 * This will render our [profile] view page along with the user data stored in the session!
 */

/****************************************************************************************************************************************************************/
/*
// before:
const express = require("express");
const app = express();
const session = require("express-session");
const store = new session.MemoryStore();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db");
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Look up user id in database.
  db.users.findById(id, function (err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(function (username, password, cb) {
    db.users.findByUsername(username, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", (req, res) => {
  // Pass user object stored in session to the view page:
  res.render("profile");
});

// Add the passport middleware below:
app.post(
  "/login",
  (req, res) => {
    res.redirect("profile");
  }
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
*/
/****************************************************************************************************************************************************************/
/*

Instructions
Checkpoint 1 Passed
1.
A POST request to log in has been provided, app.post("/login"...), but it’s missing the Passport middleware. Add the proper middleware to authenticate a user.

You can leave the parameters empty for now.

Type node app.js into the Terminal to start the node app.

Press the Check Work button to check your work for each checkpoint.

In order for the passport middleware to be executed, you must make a call to authenticate():

passport.authenticate(),

Copy to Clipboard

Checkpoint 2 Passed
2.
Provide the right parameters to authenticate a user and redirect them to the "/login" page if login is not successful.

The first parameter provided to passport is the strategy you’re using. To redirect a user, you can provide an object as a second parameter with failureRedirect as the key and the path redirect as the value "/login":

passport.authenticate("local", { failureRedirect: "/login" })

Copy to Clipboard

Checkpoint 3 Passed
3.
Update the "/profile“ endpoint to pass in the user object found in the request object.

Once a user is serialized the user will be stored in req.user.

From there, data can be passed into a view page as an object:

app.get("/profile", (req, res) => {
  // Pass user object stored in session to the view page:
  res.render("profile", { user: req.user});
  res.render("profile");
});

Copy to Clipboard

Make sure you’re updating the correct endpoint!

Checkpoint 4 Passed
4.
If you haven’t already, in the terminal run the command:

node app.js

Copy to Clipboard

Press the circular arrow button in the mini-browser to load the webpage.An image showing a cursor pressing the refresh button to refresh the iframe which contains a mini-browser.

Within the mini-browser attempt to log in with the following credentials:

Username: sam
Password: codec@demy10
If the log in page is not rendering, refresh the mini-browser.
*/
/****************************************************************************************************************************************************************/
const express = require("express");
const app = express();
const session = require("express-session");
const store = new session.MemoryStore();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db");
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Look up user id in database.
  db.users.findById(id, function (err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(function (username, password, cb) {
    db.users.findByUsername(username, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", (req, res) => {
  // Pass user object stored in session to the view page:
  res.render("profile", { user: req.user });
});

// Add the passport middleware below:
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("profile");
  }
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});