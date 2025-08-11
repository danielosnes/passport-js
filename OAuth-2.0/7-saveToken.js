/*

*/
/****************************************************************************************************************************************************************/

/*
The saveToken() function must be implemented for all grant types in the model used by OAuth2Server.
This functions stores the access token as an object to a database when an access token is obtained.

The saveToken() function is implemented when three arguments:
token / client / user
We set the token.client equal an object in which the id attribute is equal to the passed client's clientId.
The client is formatted like this:

const saveToken = (token, client, user) => {
    token.client = {
        id: client.clientId
    }
}

the token.user is set equal to an object with the username attribute.
we set the username attribute equal to the username of the passed user object.
The username is formatted like below.

token.user = {
    username: user.username
}

With the token formatted we can save the token to our database by pushing the token to our db.tokens array and returning the token

db.tokens.push(token);
return token;

Our final saveToken() function looks like:

const saveToken = (token, client, user) => {
    token.client = {
        id: client.clientId
    }
    token.user = {
        username: user.username
    }
    db.tokens.push(token);
    return token;    
}

We'll also export the saveToken() function from models.js using module.exports


module.exports = {
    getClient: getClient
}
*/
/****************************************************************************************************************************************************************/
/*

Instructions
Checkpoint 1 Passed
1.
Declare a function expression named saveToken() that has three parameters: token, client, and user using ES6 Arrow function expressions..

Checkpoint 2 Passed
2.
Set token.client equal to an object in which the id attribute is equal to client.clientId.

We can set a new key in a JavaScript object like this:

foo = {
  key: "value"
}

Copy to Clipboard

Checkpoint 3 Passed
3.
Set token.user equal to an object in which the username attribute is equal to user.username.

Checkpoint 4 Passed
4.
Add token to the tokens array in db.

Then, return the token from the function.

We can use the .push() method to add items to an array.

Checkpoint 5 Passed
5.
Export the saveToken() from model.js using the module.exports object.

Export saveToken() as saveToken.
*/
/****************************************************************************************************************************************************************/
let db = require('./db.js');

// Write getClient() function here
const getClient = (clientId, clientSecret) => {
  let confidentialClients = db.confidentialClients.filter((client) => {
    return client.clientId === clientId && client.clientSecret === clientSecret
  });
  return confidentialClients[0];
}

// Write saveToken() function here
const saveToken = (token, client, user ) => {
  token.client = {
    id: client.clientId
  }
  token.user = {
    username: user.username
  }
  db.tokens.push(token);
  return token;
}
// Export saveToken() function here
module.exports = {
  getClient: getClient,
  saveToken: saveToken
}
