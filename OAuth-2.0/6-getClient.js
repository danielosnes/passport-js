/*
0Auth2Server requires certain functions implemented in the model regardless of the authorization flow used.
The getClient() function is an example of a required model function for all flows.
The function is used to retrieve a client using a Client ID and/or a Client Secret combination.

The getClient() function takes two arguments - clientId and clientSecret.
We must write a database query to match the provided arguments and its implementation will vary depending on the type of database used.
Since we are using JavaScript as our in-memory database, we can use the .filter() methode to evaluate if the clientId and clientSecret match any 
confidential clients in db.js and return the matching client.

const getClient = (clientId, clientSecret) => {
    let confidentialClients = db.confidentdialClients.filter((client) => { 
        return client.clientId === clientId && client.clientSecret === clientSecret
    });
    return confidentialClients[0];
}

In the above code example we iterate over each element in the confidentialClients array inside db.js.
Each element's clientId and clientSecret is tested to match against the clientId and clientSecret of the client that is passed and will return the client
that matches both values in an array.
Finally, the get Client() function returns the first element in confidentialClients.

Finally, we export the function from model.js so that it can be used from other files.
We can do this using module.exports object.

module.exports = {
getClient: getClient
}
*/
/****************************************************************************************************************************************************************/
/*
//before: 
let db = require('./db.js');

// Write getClient() function here
*/
/****************************************************************************************************************************************************************/
/*


Instructions
Checkpoint 1 Passed
1.
Within model.js, declare a function, using ES6 Arrow function expressions, named getClient() that takes clientId and clientSecret as arguments.

Checkpoint 2 Passed
2.
Inside the getClient() function, declare a variable named confidentialClients and set it to equal to clients that match both the clientId and the clientSecret to confidentialClients inside db using the .filter() method.

Checkpoint 3 Passed
3.
Return the first value in confidentialClients from the getClient() function.

Checkpoint 4 Passed
4.
We’ll have to export the function from model.js using the module.exports object. Export getClient() as getClient.
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

module.exports = {
  getClient: getClient
}