const passport = require("passport");

/**
 * If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.
 * However, if a user logs in and refreshes the page, the user data won't persist across HTTP requests.
 * We can fix this by #serializing and #deserializing users.
 * #serializing a user determines which data of the user object should be stored in the session, usually the user [id].
 * The #[serializeUser()] function sents an [id] as the cookie in the user's browser,
 * and the [deserializeUser()] function uses the [id] to look up the user in the database and retrieve the user object with data.
 * 
 * When we serialize a user, Passport takes that user [id] and stores it internally on [req.session.passport] which is Passport's internal mechanism to keep track of things.
 */
passport.serializeUser((user, done) => {
    done(null, user.id);
});
/**
 * in the code example above, we pass a [user] object and a callback function called [done] after successful authentication.
 * 
 * The first argument in the [done()] function is an error object.
 * In this case, since there was no error we pass [null] as the argument.
 * For the second argument, we pass in the value that we want to store in our Passport's internal session, the user [id].
 * Once configured, the user [id] will then be stored in Passport's Internal Session:
 */
req.session.passport.user = {id: 'xyz'}
/**
 * For any subsequent request, 
 * the user object can be retrieved from the session via the [deserializeUser()] function,
 * We can implement the [deserializeUser] function as follows:
 */
passport.deserializeUser((id, done) => {
    //look up user id in database
    db.users.findById(id, function (err, user) {
        if (err) return done(err);
        done(null, user);
    });
});
/**
 * For the [deserializeUser()] function, we pass the kay that was used when we initially serialized a user ([id]).
 * the [id] is used to look up the user in storage, and the fetched object is attached to the request object as [req.user] across our whole application.
 * 
 * This way we're able to access the logged-in user's data in [req.user] on every subsequent request.
 */

/****************************************************************************************************************************************************************/
/*
//before:
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

// Complete the serializeUser function below:
passport.serializeUser((user, done) => {

});

// Complete the deserializeUser function below:
passport.deserializeUser(
  
);

passport.use(
  new LocalStrategy(function (username, password, done) {
    db.users.findByUsername(username, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

app.get("/", (req, res) => {
  res.send("Hello from the homepage!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

*/
/****************************************************************************************************************************************************************/
/*
Instructions
Checkpoint 1 Passed
1.
Complete the serializeUser() function by making a call to the done() callback. NO error was found, and we can use the user’s ID property in order to serialize a user.

Type node app.js into the Terminal to start the node app.

Press the Check Work button to check your work for each checkpoint.

Checkpoint 2 Passed
2.
Add a callback arrow function with the correct arguments to the deserializeUser() function.

Checkpoint 3 Passed
3.
A function to look up users in the database using an id has been provided, db.users.findById(). Add it to the deserializeUser() function body.

Provide an id as the first argument, and an anonymous callback function with err and user as its arguments.

Checkpoint 4 Passed
4.
Within the function body of findById(), add an if statement that checks if an error is found.

In that if statement, return the done() callback with one argument showing that an error was found.

Checkpoint 5 Passed
5.
At this point, we have found NO errors and have successfully retrieved a user.

At the end of the function body, make a call to the done() callback with the correct arguments.
*/
/****************************************************************************************************************************************************************/
// $ node app.js
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

// Complete the serializeUser function below:
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Complete the deserializeUser function below:
passport.deserializeUser((id, done) => {
  db.users.findById(id, function (err, user) {
    if (err) return done(err);
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(function (username, password, done) {
    db.users.findByUsername(username, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

app.get("/", (req, res) => {
  res.send("Hello from the homepage!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
