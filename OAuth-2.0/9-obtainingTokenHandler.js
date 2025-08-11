/*

*/
/****************************************************************************************************************************************************************/

/*
Now that our model functions for generating and saving access tokens are implemented in {model.js},
we need to create a callback function to handle obtaining the access token whenever a URL
is requested in our application.
Within {app.js} we create a function named [obtainToken()] that takes the HTTP request
and the HTTP response as arguments - [req] and [res].

Inside [obtainToken()] we create a new variable named [request] and set it to a new instance of 
[0Auth2Server()],
passing the HTTPrequest, [req] as the argument:

let request = new 0Auth2Server.Request(req);

We'll also create a new variable named [request] and set it to a new instance of 
[0Auth2Server.Request()], taking in [res] as the argument.

let response = new 0Auth2Server.Response(res);

The [.token()] method of the [oauth] object returns the access token.
The method passes the [0Auth2Server]'s request and response stores in the [response] and [request].
We use the [.then()] method to return a promise.
If the token method is successful, we will send the access token back to the client using .json().

const obtainToken = (req, res) => {
    let request = new 0Auth2Server.Request(req);
    let response = new 0Auth2Server.Response(res);

    return 0auth.token(request, response)
        .then((token) => {
            res.json(token);
            })
}

We'll chain the [.catch()] method to handle any errors if the [.token()] method fails.
If the [.token()] method returns an error code or an HTTP 500 status,
the error can be sent back to the client using the [.json()] method.

.catch((err) => {
    res.status(err.code || 500).json(err);
});

Note, Must declare our function expressions before they can be used.
To make use of our [obtainToken()] function, we can defind a new route and pass [obtainToken()]
as a callback function.
We use the [.all()] method to handle all types of HTTP requests since we will eventually use 
a POST request on the route.
The route name can be anything we'd like - we'll use [/auth] for our example.

app.all('/auth', obtainToken);

Now the client can make an HTTP request with the client secret to [/auth] and receive 
an access token.
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

// Write obtainToken() here


// Write '/auth' route here




// Do not change below this line
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/home.html'));
})
app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/login.html'));
})

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
Declare obtainToken() function with two parameters: req and res.

Checkpoint 2 Passed
2.
Create a new variable named request and set it equal to a new instance of an OAuth2Server.Request object taking req as an argument.

Then create a new instance of an OAuth2Server.Response object taking res as an argument and set it equal to response.

Checkpoint 3 Passed
3.
Return oauth.token() passing request and response.

Checkpoint 4 Passed
4.
Use the .then() method to return a promise that sends a JSON response of the token using res.json().

Checkpoint 5 Passed
5.
Use the .catch() method to return the JSON response of the error if the promise is rejected because of an error obtaining the token.

Checkpoint 6 Passed
6.
Create a new route to /auth and call the obtainToken() function.
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

// Write obtainToken() here
const obtainToken = (req, res) => {
  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res);

  return oauth.token(request, response)
    .then((token) => {
        res.json(token);
    })
    .catch((err) => {
      res.json(err);
    });
    
}

// Write '/auth' route here
app.all('/auth', obtainToken);



// Do not change below this line
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/home.html'));
})
app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/login.html'));
})

app.get('/secret', (req, res)=>{
    res.send('Welcome to the secret area.');
})

app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`));

