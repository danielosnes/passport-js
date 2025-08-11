/*

*/
/****************************************************************************************************************************************************************/

/*
Bcrypt uses a salt and salt rounds to secure a password.
 - a salt value that is concatenated to a password before hashing in order to make it less vulnerable to a rainbow table and brute-force attacks
 - a salt round can be described as the amount of time needed to calculate a single bcrypt hash. 
 The higher the salt rounds, the more time is necessary to crack a password.

In this asynchronous implementation. we'll generate a sald and hash in the same function call. This involves 3 steps:
1 - Generate a salt
2 - Hash the password
3 - return [null] if there's an error

We'll make use of [async/await] and [try/catch] blocks to create an asynchronous function. We'll pass in a password string and salt rounds:

const passwordHash = async (password, saltRounds) => {
    try {
        //...
    } catch (err) {
        //...
    }
};
/**
 * the built in [genSalt()] function automatically generates a salt for us.
 * Since we're using an asynchronous function we can [await] this function call:
 

const salt = await bcrypt.genSalt(saltRounds);

/**
 * Once we have a salt generated, we make a call to [bcrypt.hash()].
 * [bcrypt.hash()] takes in a password string and a salt.
 * We [await] and return this function call since it will return the hashed password.
 * Now our [try] block will look like:
 */
/*
try {
    // generate salt:
    const salt = await bcrypt.genSalt(saltRounds);
    // hash password using generated salt:
    return await bcrypt.hash(password, salt);
};
/*
/**
 * We also want to handle potential errors.
 * In the [catch] block,
 *  we can print out the error with [console.log()].
 * Lastly, we return [null] if there's an error with [bcrypt] and we're unable to hash a password.
 * The final code might look like:
 
const passwordHash = async (password, saltRounds) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (err) {
        console.log(err);
    }
    return null;
};

/****************************************************************************************************************************************************************/
const bcrypt = require("bcrypt");

// Create password hashing function below:
const passwordHash = async (password, saltRounds) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.log(err);
  }
  return null;
};