/*
With the model function for checking access tokens implemented, 
let's create a middleware function to handle authenticating access tokens inside our application.
Inside {app.js}  we will create a function named [authenticateRequest()] that takes three 
arguments: [req], [res], and [next].

Inside the function, 
we create a new variable named [request] and set it to a new instance of
[OAuth2Server.Request()] taking in the HTTP request, [req] as the argument.

let request = new OAuth2Server.Request(req);

We'll create a new variable named [response] and set it to a new instance of
[OAuth2Server.Response()] passing in the HTTP response [res]

let response new OAuth2Server.response(res);

We then return [.authenticate()] method, that is provided by [OAuth2Server] object on [oauth],
passing in [response] and [request]. 
The method returns a [Promise] that resolves to the access token object returned from the 
[.getAccessToken()] model we defined in {model.js}.
We'll use a promise chain to handle the flow.

We use the [.then()] method,
and if the access token is valid, 
we can call the [.next()] function to call the next function.
We'll chain the [.catch()] method to handle an error or if the access token is invalid.
Inside [.catch] method, we can send a response back to the client using the [.send()] method.

const authenticateRequest = (req, res, next) => {
    
    let request = new OAuth2Server.Request(req);
    let response = new OAuth2Server.Response(res);

    return oauth.authenticate(request, response)
        .then(()=>{
            next();    
        })
        .catch((err) => {
            res.send(err);
        })
    
}

Finally, we can add [authenticateRequest] as a middleware function to a route to restrict access.
Now the client must include the bearer token in the header when making the request to the route to
gain authenticated access

app.get('/secret', authenticateRequest, function(req, res){
    res.send("Welcome to the secret area!");
})
*/
/****************************************************************************************************************************************************************/
/*
//before:

const express = require('express');
const path = require('path');
const OAuth2Server = require('oauth2-server');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 4001;

const oauth = new OAuth2Server({
  model: require("./model"),
  allowBearerTokensInQueryString: true
})

// Write authenticateRequest() here

const obtainToken = (req, res) => {
  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res);

  return oauth.token(request, response)
    .then((token) => {
      res.json(token);
    })
    .catch((err) => {
      res.json(err);
    })
}

app.all('/auth', obtainToken);

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/home.html'));
})
app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/login.html'));
})

// Add authenticateRequest as middleware to '/secret' here
app.get('/secret', (req, res)=>{
    res.send('Welcome to the secret area.');
})

app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`));

*/
/****************************************************************************************************************************************************************/

/*


Instructions
Checkpoint 1 Passed
1.
Declare authenticateRequest() with three parameters: req, res, and next above the Express route declarations using ES6 Arrow function expressions..

Checkpoint 2 Passed
2.
Create a new variable named request and set it equal to a new instance of an OAuth2Server.Request taking req as an argument and create a new instance of an OAuth2Server.Response taking res as an argument and set it equal to response.

Checkpoint 3 Passed
3.
Return oauth.authenticate() passing request and response.

Checkpoint 4 Passed
4.
Use the .then() method to return next().

Checkpoint 5 Passed
5.
Use the .catch() to handle if the promise is rejected because of an error obtaining the token. Use the .send() Express method to send “You are not allowed” to the client.

Checkpoint 6 Passed
6.
Add authenticateRequest middleware to the /secret route and if it exists send "Welcome to the secret area!" back to the client.
*/
/****************************************************************************************************************************************************************/
const express = require('express');
const path = require('path');
const OAuth2Server = require('oauth2-server');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 4001;

const oauth = new OAuth2Server({
  model: require("./model"),
  allowBearerTokensInQueryString: true
})

// Write authenticateRequest() here
const authenticateRequest = (req, res, next) => {

  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res);

  return oauth.authenticate(request, response)
    .then(()=>{
      next();
    })
    .catch((err) => {
      res.send("You are not allowed");
    })
}
const obtainToken = (req, res) => {
  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res);

  return oauth.token(request, response)
    .then((token) => {
      res.json(token);
    })
    .catch((err) => {
      res.json(err);
    })
}

app.all('/auth', obtainToken);

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/home.html'));
})
app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/login.html'));
})

// Add authenticateRequest as middleware to '/secret' here
app.get('/secret', authenticateRequest, function(req, res){
    res.send('Welcome to the secret area.');
});

app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`));
