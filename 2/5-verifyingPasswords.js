/*
Now that we know how to hash a password, let's explore how we can verify a stored password hash against one sent from a request.

Remember that a generated hash should be stored in our database, since we'll be comparing that hash to the retrieved password after it's hashed.
The process of comparing passwords should look like this:
1 - Retrieve plain text password
2 - Hash the password
3 - Compare the hash password with the one stored in our DB.
(Since we're using the same hash, it should return the same value if the password is correct.)

[bcrypt] provides us with a handy function called [compare()],
which takes in a plaintext password, [password] and a hashed password [hash].

bcrypt.compare(password, hash);

[bcrypt.compare()] deduces the salt from the provided hash and is able to then hash the provided password correctly for comparison.

We can include a function that verifies if the password entered is valid.
We'll use an asynchronous function and pass in [password] and [hash] as the parameters

const comparePassword = async (password, hash) => {
    try{
    ...
    } catch (err) {
     ...
    }
};

Within our [try] block we can use built in function and compare the provided password with the stored hashed password:

const comparePasswords = async (password, hash) => {
    try {
    const matchFound = await bcrypt.compare(password, hash);
    } catch (err) {
    console.log(err);
    } 
    return false;
};

the return value will be [true] if the password provided, when matched matches the stored hash.
Outside the [try/catch] block we can return [false] in order to end the execution of the code if there were any other errors 
or if [bcrypt] did not execute correctly.
*/
/****************************************************************************************************************************************************************/
/*
//before:
const bcrypt = require("bcrypt");

// Create your password comparison function below:
*/
/****************************************************************************************************************************************************************/
/*
Instructions
Checkpoint 1 Passed
1.
Create an asynchronous function with password and hash for its parameters.

Store the function in a const variable called comparePasswords and add a try/catch block in the function body.

Checkpoint 2 Passed
2.
Compare the password with the stored hash using the correct built-in function. Store the value of the function call in a const variable called matchFound.

Return the variable on the following line.

Checkpoint 3 Passed
3.
Handle any potential errors by printing out the err variable.

Outside of the try/catch block, return a value to indicate the comparison failed.
*/
/****************************************************************************************************************************************************************/
const bcrypt = require("bcrypt");

// Create your password comparison function below:
const comparePasswords = async (password, hash) => {
  try {
    const matchFound = await bcrypt.compare(password, hash);
    return matchFound;
  } catch (err) {
    console.log(err);
  }
  return false;
};
