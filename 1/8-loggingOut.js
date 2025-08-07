/****************************************************************************************************************************************************************/
/*

*/
/****************************************************************************************************************************************************************/
/*
Now let's take a look at how to log users out.
Passport.js exposes a [logout] function within the request object [req.logout].
The function can be called from any route handler in order to terminate a login session.
It essentially removes the [req.user] property and clears the login session (if any).
*/
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});
// By terminating this session, the user will have to re-authenticate in order to create a new session
/****************************************************************************************************************************************************************/
/*
//before:
const express = require("express");
const app = express();
const session = require("express-session");
const store = new session.MemoryStore();
const db = require("./db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "f4z4gs$Gcg",
    cookie: { maxAge: 300000000, secure: false },
    saveUninitialized: false,
    resave: false,
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
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

// Complete the logout handler below:
app.get("/logout", (req, res) => {


});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("profile");
  }
);

app.get("/profile", (req, res) => {
  res.render("profile", { user: req.user });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const newUser = await db.users.createUser({ username, password });
  if (newUser) {
    res.status(201).json({
      msg: "New user created!",
      newUser,
    });
  } else {
    res.status(500).json({ msg: "Unable to create user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

*/

/****************************************************************************************************************************************************************/
/*
Instructions
Checkpoint 1 Passed
1.
A "/logout" request has been provided.

Add the missing code to log out a user and redirect them back to the login path, "/login".

Type node app.js into the Terminal to start the node app.

Press the Check Work button to check your work for each checkpoint.

Checkpoint 2 Passed
2.
If you haven’t already, in the terminal run the command:

node app.js

Copy to Clipboard

Press the circular arrow button in the mini-browser to load the webpage.An image showing a cursor pressing the refresh button to refresh the iframe which contains a mini-browser.

Within the mini-browser attempt to log in with the following credentials:

Username: sam
Password: codec@demy10
Once logged in, click on the logout button to ensure that you can log out successfully.
*/
/****************************************************************************************************************************************************************/
const express = require("express");
const app = express();
const session = require("express-session");
const store = new session.MemoryStore();
const db = require("./db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "f4z4gs$Gcg",
    cookie: { maxAge: 300000000, secure: false },
    saveUninitialized: false,
    resave: false,
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
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

// Complete the logout handler below:
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("profile");
  }
);

app.get("/profile", (req, res) => {
  res.render("profile", { user: req.user });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const newUser = await db.users.createUser({ username, password });
  if (newUser) {
    res.status(201).json({
      msg: "New user created!",
      newUser,
    });
  } else {
    res.status(500).json({ msg: "Unable to create user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
