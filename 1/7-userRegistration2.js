/**
 *Let's use the [createUser()] helper function in our routes.
 We'll add the logic to create uses in a [POST] request to ["/register"].

 Since we're working with promises, we can create an asynchronous route handler by using [async/await].
*/
app.post("/register", async (req, res) => { /**/ });
// We'll retrieve the user data from [req.body] and [await] as we call our helper function to create the new user:
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    // imported helper function:
    // db.users.createUser
    const newUser = await db.users.createUser({ username, password });
});
// if a [newUser] is successfully created, we send a status code of [201] and a [json] response back to the client:
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const newUser = await db.users.createUser({ username, password });
    if (newUser) {
        res.status(201).json({
            msg: "Insert Success Message Here", 
            insertDataHere
        });
    }
})
// Lastly, we want to handle potential errors that might occur.
// In an [else] statement we can return a status code of [500] indicating that there was a relevant error message:
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const newUser = await db.users.createUser({ username, password });
    if (newUser) {
        res.status(201).json({
            msg: "Insert Success Message Here",
            insertDataHere
        })
    } else {
        res.status(500).json({
            msg: "Insert Failure Message Here"
        })
    }
})

// note in a real development environment, passwords would be hashed whenever a new user registers
// With the route completed, user will now be able to register and log in!
/****************************************************************************************************************************************************************/
/*

*/
/****************************************************************************************************************************************************************/
/*
Instructions
Checkpoint 1 Passed
1.
At the moment, the app can’t be run since it’s missing some logic.

Scroll to the bottom of the app.js file where you’ll find a post request to "/register".

Start by making a call to the provided helper function, db.users.createUser(), using the correct arguments.

Store the result in a const variable called newUser.

Type node app.js into the Terminal to start the node app.

Press the Check Work button to check your work for each checkpoint.

Checkpoint 2 Passed
2.
We want to check if a user was successfully created. Add the correct condition to the provided if/else statement.

Checkpoint 3 Passed
3.
If the new user was successfully created, send back a status code of 201 along with a json response object with the following key-value pairs:

msg: A message indicating a user was created.
The newly created user using the object literal shorthand with newUser.
You can send a status code and json using dot notation.

The json function takes in an object with any data of your choosing that you want to send back:

res.status(201).json({
  msg: "New user created!",
  newUser
});

Copy to Clipboard

Checkpoint 4 Passed
4.
Handle the potential error in the else statement by sending back a status code of 500 and a json response with the following information:

msg: A message indicating a user wasn’t created.
Remember that the json reponse takes in an object as an argument:

res.status(500).json({ msg: "Unable to create user!"});

Copy to Clipboard

Checkpoint 5 Passed
5.
If you haven’t already, in the terminal run the command:

node app.js

Copy to Clipboard

Navigate to the http://localhost:8000/register path in the mini-browser and attempt to register a new user.
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

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", (req, res) => {
  res.render("profile", { user: req.user });
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("profile");
  }
);

app.get("/register", (req, res) => {
  res.render("register");
});

// POST REGISTER:
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // Create new user:
  const newUser = await db.users.createUser({ username, password });
  // Add if/else statement with the new user as the condition:
  if (newUser) {
    // Send correct response if new user is created:
    res.status(201).json({
      msg: "New user created!",
      newUser
    });
  } else {
    // Send correct response if new user failed to be created:
    res.status(500).json({
      msg: "Unable to create user!"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
