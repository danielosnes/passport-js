/*
Today we'll be looking at how to protect and hash passwords through [bcrypt] WITHOUT the use of a database.

When creating an authentication flow, we should never store passwords as plaintext.
Instead we can take the password retrieved from the user's input and hash it using [bcrypt].
Once it's hashed THEN we can store it in a database.

A typical [POST] request for registering a user might look like this:

app.post("/register", (req, res) => {
    const { email, password } = req.body;

    // create a new user object to store in the database:
    user = new User({
        email,
        password
    });
    // save user in database:
    await user.save();
    res.redirect("login");
});

 * in the above example. passwords are not being hashed and are therefore stored as plaintext in the database.
 * 
 * Before creating a new user object, we must first hash the password and store that value
 * 
 * 
const salt = await bcrypt.genSalt(10);

const hash = await bcrypt.hash(password, salt);

const newUser = {
  email,
  password: hash
};

await user.save();
 // once hashed, that value will be stored in our databse and protect the password from brute-force attacks.
 // In order to log that registered user back in, a request without hashed passwords might look something like this:

 app.post("/login", (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: email });
  // If passwords don't match, redirect client back to the login page:
  if (user.password !== password) return res.redirect("login");

  // If passwords match, redirect client along with the user object:
  res.render("profile", { user });
});

The issue above is, once again, plaintext passwords are being compared.
Instead, [bcrypt] should be used to hash the user's password input and compare it to the hash stored in the database:

const { email, password} = req.body;
let user = await User.findOne({ email: email });

// use bcrypt to hash the retrieved password and compare it to hash stored in the database:
const matchedPassword = await bcrypt.compare(password, user.password);

using [bcrypt.compare()] pulls the salt out of stored hash in the database and uses it to hash the retireved password and perform the comparison.
The function will then return [true] if the passwords match and [false] if they don't.

With that in place, we have safely secured the endpoints in order to protect our user's passwords when registering and logging in!

We have provided you with a basic application in order to register and log in users.
Since we're not using a database, we're manually updating a [JSON] file and adding a new user whenever someone registers.
Feel free to explore the app further before starting the exercises in order to get a better understanding of how it works
 */
/****************************************************************************************************************************************************************/

/*
//before:

const express = require("express");
const router = express.Router();
const helper = require("../helpers/helpers");
let users = require("../data/users.json");
const filename = "./data/users.json";
const bcrypt = require("bcrypt");

// Register a user 
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const id = { id: helper.getNewId(users) };

  try {
    const user = await helper.findUser(users, email);

   if (user) {
      console.log("User already exists!");
      return res.redirect("login");
    }
    // Generate salt

    // Hash password

    const newUser = {
      ...id,
      email,
      password: hashedPassword,
    };

    await users.push(newUser);
    await helper.writeJSONFile(filename, users);

    res.redirect("login");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Log in user
router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await helper.findUser(users, email);

    if (!user) {
      console.log("User does not exist!");
      return res.redirect("login");
    }

    // Compare passwords:
    

    if (!matchedPassword) {
      console.log("Passwords did not match!");
      return res.redirect("login");
    }
    // return res.status(401).json({
    //   token: null,
    //   message: "Invalid password",
    // });

    res.render("profile", { user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

module.exports = router;

*/
/****************************************************************************************************************************************************************/

/*
Instructions
Checkpoint 1 Passed
1.
In the users.routes.js file you’ll find a POST request to register new users. The flow is almost complete but the passwords still need to be hashed before storing them in the local database.

Add the missing code in order to generate a salt using 10 salt rounds, and store the value in a const variable called salt.

A salt can be generated using bcrypt‘s built-in method, bcrypt.genSalt(). The number of salt rounds can be passed in as a parameter.

Since we’re using asynchronous code, make sure to add the keyword await as well:

const salt = await bcrypt.genSalt(10);

Copy to Clipboard

Checkpoint 2 Passed
2.
Now that a salt has been generated, use it in order to hash the retrieved password.

Store the value in a const variable called hashedPassword.

A plaintext password can be hashed using bcrypt‘s built-in method, bcrypt.hash(). A plaintext password and a salt are used as parameters in order to hash it.

Since we’re using asynchronous code, make sure to add the keyword await as well:

const hashedPassword = await bcrypt.hash(password, salt);

Copy to Clipboard

Checkpoint 3 Passed
3.
Under the POST request to log in a user, app.post("/login"), the password input must be compared to the hashed password in the database.

Use bcrypt to compare the user’s input password and the stored hashed password.

Store the value in a const variable called matchedPassword.

Checkpoint 4 Passed
4.
In the terminal run the command:

node app.js

Copy to Clipboard

Press the circular arrow button in the mini-browser to load the webpage.An image showing a cursor pressing the refresh button to refresh the iframe which contains a mini-browser.

Within the mini-browser, navigate to /users/register and attempt to register a new user.

If successful, try to log in with the same credentials.
*/
/****************************************************************************************************************************************************************/
const express = require("express");
const router = express.Router();
const helper = require("../helpers/helpers");
let users = require("../data/users.json");
const filename = "./data/users.json";
const bcrypt = require("bcrypt");

/* Register a user */
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const id = { id: helper.getNewId(users) };

  try {
    const user = await helper.findUser(users, email);

   if (user) {
      console.log("User already exists!");
      return res.redirect("login");
    }
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      ...id,
      email,
      password: hashedPassword,
    };

    await users.push(newUser);
    await helper.writeJSONFile(filename, users);

    res.redirect("login");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* Log in user */
router.post("/login", async (req, res) => {
  const { password, email } = req.body;
  const matchedPassword = await bcrypt.compare(password, user.password);
  try {
    const user = await helper.findUser(users, email);

    if (!user) {
      console.log("User does not exist!");
      return res.redirect("login");
    }

    // Compare passwords:
    

    if (!matchedPassword) {
      console.log("Passwords did not match!");
      return res.redirect("login");
    }
    // return res.status(401).json({
    //   token: null,
    //   message: "Invalid password",
    // });

    res.render("profile", { user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

module.exports = router;


// $ node app.js
// Server listening on port: 4001