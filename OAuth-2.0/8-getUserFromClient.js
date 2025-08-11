/*
Certain grant types  have specific functions that must be implemented for them to work.
The Client Credentials grant type must have the getUserFromClient() function implemented to be used.

The getUserFromClient() function is invoked to retrieve the user associated with the specified client.
We are not using a user in our application so we can return an empty object.
However, leaving out this function declaration will throw an error when using
the Client Credentials grant type!

const getUserFromClient = (client) => {
    return {};
}

Finally we export the function from {model.js} so that it can be used from other files.
We can do this using [module.exports] object.

module.exports = {
// other modules to export
getUserFromClient: getUserFromClient
}
*/
/****************************************************************************************************************************************************************/
/*
//before;

let db = require('./db.js');

const getClient = (clientId, clientSecret) => {
  let confidentialClients = db.confidentialClients.filter((client) => {
    return client.clientId === clientId && client.clientSecret === clientSecret
  });
  return confidentialClients[0];
}

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


// Write getUserFromClient() function here

// Export getUserFromClient() function here
module.exports = {
  getClient: getClient,
  saveToken: saveToken
}
*/
/****************************************************************************************************************************************************************/
/*
Instructions
Checkpoint 1 Passed
1.
Within model.js define a function expression named getUserFromClient() that takes one argument, client using ES6 Arrow function expressions.

Checkpoint 2 Passed
2.
Return an empty object from the getUserFromClient() function.

Checkpoint 3 Passed
3.
We’ll have to export the function from model.js using the module.exports object. Export getUserFromClient() as getUserFromClient.
*/
/****************************************************************************************************************************************************************/
let db = require('./db.js');

const getClient = (clientId, clientSecret) => {
  let confidentialClients = db.confidentialClients.filter((client) => {
    return client.clientId === clientId && client.clientSecret === clientSecret
  });
  return confidentialClients[0];
}

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


// Write getUserFromClient() function here
const getUserFromClient = (client) => {
  return {};
}

// Export getUserFromClient() function here
module.exports = {
  getClient: getClient,
  saveToken: saveToken,
  getUserFromClient: getUserFromClient
}