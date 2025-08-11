/*
Now that we've written the code to obtain an access token, we can use it to restrict access 
to content unless a user is authenticated with a valid access token.
Inside {model.js}, we implement the [getAccessToken()] function to retrieve existing tokens that
were previously saved when the saveToken() function is invoked.

The [getAccessToken()] function is required when the [.authenticate()] method is used on an
[OAuth2Server] instance.
[getAccessToken()] is declared with on parameter: [accessToken].

When the function is invoked the [accessToken] is checked against the tokens stored in the {db.js}
to see if there is a match.
We can use JavaScript's [.filter()] method to each token in the database against the access
token that is passed.
If there is a match, the access token can be returned.
The resulting [getAccessToken()] will look something like this:

const getAccessToken = (accessToken) => {
    let tokens = db.tokens.filter((savedToken) => {
        return savedToken.accessToken === accessToken;
    })
    return tokens[0];    
}

In the above example code, the [getAccessToken()] function expression is called with an access 
token as an argument.
The [.filter()] method is used to check each token saved in the tokens array in the database
to match with the access token passed to the function.
Finally, we return the matching access token from the array.

We export the function from {model.js} so that it can be used from other files.
We can do this using [module.exports] object

module.exports = {
//exported functions
getAccessToken: getAccessToken
}
*/
/****************************************************************************************************************************************************************/

/*

*/
/****************************************************************************************************************************************************************/

/*


Instructions
Checkpoint 1 Passed
1.
Inside model.js, declare a getAccessToken() function with a parameter, accessToken using ES6 Arrow function expressions.

Checkpoint 2 Passed
2.
Inside the getAccessToken() function declare a variable named tokens and set it to equal to access tokens inside db.tokens that match the accessToken that is passed to .getAccessToken() using the .filter() method.

Checkpoint 3 Passed
3.
Return the first element in tokens.

Checkpoint 4 Passed
4.
We’ll have to export the function from model.js using the module.exports object. Export getAccessToken() as getAccessToken.
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

const getUserFromClient = (client) => {
  return {}
}

// Write getAccessToken() function here
const getAccessToken = (accessToken) => {
  let tokens = db.tokens.filter((savedToken)=> {
    return savedToken.accessToken === accessToken;
  })
  return tokens[0];
}


// Export getAccessToken() function here
module.exports = {
  getClient: getClient,
  saveToken: saveToken,
  getUserFromClient: getUserFromClient,
  getAccessToken: getAccessToken
}