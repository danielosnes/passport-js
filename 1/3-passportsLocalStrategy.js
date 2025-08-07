const passport = require("passport");

/**
 * With Passport configured we can now set up the [passport-local] strategy for authenticating with a username and password.
 * 
 * First we can configure the local strategy by creating a new instance of it and passing it as #middleware into [passport].
 */
passport.use(new LocalStrategy(
    function(username, password, done) {
        //...
    }
));
/**
 * The new [LocalStrategy] object will take in an anonymous function with the following parameters:
 * - username
 * - password
 * - a callback function called done
 * 
 * The purpose of the done callback is to supply an authenticated user to Passport if a user is authenticated.
 * The logic within the anonymous function follows this order:
 * 
 * 1 - Verify login details in the callback function
 * 2 - If login details are valid, the done callback function is invoked and the user is authenticated.
 * 3 - if the user is not authenticated, pass false into the callback function.
 * 
 * The done callback function takes two arguments:
 * - an error or Null if no error is found
 * - a user or false if no user is found
 * 
 * With those steps implemented our updated strategy should look like this:
 */
passport.use(new LocalStrategy(
    function (username, password, done) {
        // look up user in the db
        db.users.findByUsername(username, (err, user) => {
            // if there's an error in db look up,
            // return err callback function
            if(err) return done(err);

            // if user not found,
            // return null and false in callback
            if(!user) return done(null, false);

            // if user found, but password not valid,
            // return err and false in callback
            if(user.password != password) return done(null, false);

            // if user found and password valid,
            // return the user object in callback
            return done(null, user);
        });
    }
));

/**
 * We're looking for potential errors during the authentication process and addressing them before the next request handler is reached.
 * Once the local strategy is configured.
 * the Express application will have user authentication implemented.
 */
/****************************************************************************************************************************************************************/
/*
Instructions
Checkpoint 1 Passed
1.
Add a new LocalStrategy instance with an anonymous callback function using username, password, and done as its parameters.

Type node app.js into the Terminal to start the node app.

Press the Check Work button to check your work for each checkpoint.

Checkpoint 2 Passed
2.
A db lookup function has been provided.

Within the LocalStrategy function, make a call to db.users.findByUsername(). Provide username as the first argument. For the second argument, give it an arrow callback function using err and user as its parameters.

Checkpoint 3 Passed
3.
Within the db lookup function, add an if statement that checks if an error is found.

In that if statement, return the done() callback with one argument showing that an error was found.

Checkpoint 4 Passed
4.
Add another if statement if NO user is found.

Return the done() callback with arguments showing that there was NO error and NO user was found.

Checkpoint 5 Passed
5.
Add one last if statement that checks if a user was found but the password was invalid. You can do this by comparing user.password to password.

Return the done() callback with arguments showing that there was NO error and NO user was found.

Checkpoint 6 Passed
6.
Return the done() callback function with arguments showing that there was NO error and a user was found.
*/
/****************************************************************************************************************************************************************/
const express = require("express");
const app = express();
const passport = require("passport");
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

app.use(passport.initialize());
app.use(passport.session());

// Add your passport local strategy below:
passport.use(new LocalStrategy(
  function (username, password, done) {
    db.users.findByUsername(username, (err, user) => {
      if(err) return done(err);
      if(!user) return done(null, false);
      if(user.password != password) return done(null, false);
      return done(null, user);
    });
  }
));
app.get("/", (req, res) => {
  res.send("Hello from the homepage!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
