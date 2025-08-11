/*
OAuth defines two types of clients
- Public Clients
    Are NOT able to store credentials securely and can only use grant types that do not use ther client secret.
- Confidential Clients
    Are applications that can be registered to an authorization server using credentials.
Those credentials, a client ID and a client secret, can be secured without exposing them to a third party.
They require a backend server to store the credentials.
A client's ability to securely store credentials determines which type of OAuth authorization flows should be used.

We'll be implementing the Client Credential flow to obtain an access token for authentication.
When a developer registers a client in an OAuth application, they'll need:
    - A client ID
        A public identifier for apps that is unique across all clients and the authorization server.
    - A client secret
        A secret key known only to the application and the authorization server.

OAuth 2.0 is flexible which databases to use and the oauth2-server package implicitly allows Postgres, MongoDB and Redis.
For our example application, we use an in-memory database defined in db.js.
inside db.js we use modules.exports to createa a module to hold our confidential client credentials and access tokens.

We can register an application to the list of confidentialClients in db.js.
Inside the module.exports we create an attribute named confidentialClients and set it equal to an array.
Within the array, we create an object with the clientId and clientSecret, and specify 'clident_credentials' in our array of grant types.

module.exports = { 
    confidentialClients: [{ 
        clientId: 'secretapplication',
        clientSecret: 'topsecret',
        grants: [
            'client_credentials'
        ]
    }]
}

In our database, we'll create a location to store access tokens.
Within the module.exports object,
we create another property named tokens and set it equal to an empty array:

module.exports = {
// confidential clients settings
    tokens: []
}
*/
/****************************************************************************************************************************************************************/

/*

Instructions
Checkpoint 1 Passed
1.
Inside module.exports in db.js, add a property named confidentialClients and set its value to an empty array.

Then, add a new client to the confidentialClients array with clientId of 'codecademy'.

Add a new object using curly brackets ({ }) within the array for the the confidentialClients key.

Inside the object, add clientId as a key with a value of 'codecademy'. Refer to sample_database.js for an example.

Checkpoint 2 Passed
2.
Add the clientSecret key with the value 'codec@demy'.

Checkpoint 3 Passed
3.
Add a new key named the grants.

Set it equal to an array with a single element: 'client_credentials'

Checkpoint 4 Passed
4.
Inside module.exports, and outside of the confidentialClients key, create a new property named tokens and set it equal to an empty array.

Set tokens to an empty array using [] inside the module.exports object.

Refer to sample_database.js for an example.

Checkpoint 5 Passed
5.
At the top of model.js import db.js.

Use a let variable named db, and use the require() function.

Import db.js like this:

let module = require('./module.js');

Copy to Clipboard
*/
/****************************************************************************************************************************************************************/
module.exports = {
  // Add confidential clients[]
  confidentialClients: [{
    clientId: 'codecademy',
    clientSecret: 'codec@demy',
    grants: [
      'client_credentials'
    ],
    
  }],
  // Add tokens[]
  tokens: []
}
// model.js
// let db = require('./db.js');