/*
Inside app.js where we have included the oauth2-server package,
we'll create an instance of the of the OAuth2Server object and store it in a variable named oauth.

const oauth = new OAuth2Server();

The 0Auth2Server object requires a model object which contains functions to access, store and validate our access tokens.
We'll be writing them separately in a file named model.js

Inside the constructor of OAuth2Server, pass an object with an attribute named model,
and we'll import model.js using the require function as the value

const oauth = new OAuth2Server({
    model: require('./model.js')
});

OAuth2Server can be supplied with additional options in the constructor,
To pass tokens inside the url we'll set the allowBearerTokensInQueryString attribute to true.

const oauth = new OAuth2Server({
    model: require('./model.js'),
    allowBearerTokensInQueryString: true
});

The access token lifetime can also be configured as an option using the accessTokenLifetime attribute.
The lifetime is set in seconds and we can set the access lifetime to one hours like this

const oauth = new OAuth2Server({
    model: require('./model.js'),
    allowBearerTokensInQueryString: true,
    accessTokenLifetime: 60 * 60
]});
*/
/****************************************************************************************************************************************************************/
/*
//before:
const express = require('express');
const path = require('path');
const OAuth2Server = require('oauth2-server');

const app = express();

// Create oauth instance here

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 4001;

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
Create a new OAuth2Server instance and store it in a variable named oauth.

Checkpoint 2 Passed
2.
Inside the OAuth2Server constructor, include the model in model.js using the require() function.

Checkpoint 3 Passed
3.
Set allowBearerTokensInQueryString to true inside the constructor options.

Checkpoint 4 Passed
4.
Set the lifetime of the access token to one hour.
*/
/****************************************************************************************************************************************************************/
const express = require('express');
const path = require('path');
const OAuth2Server = require('oauth2-server');

const app = express();

// Create oauth instance here
const oauth = new OAuth2Server({
  model: require('./model.js'),
  allowBearerTokensInQueryString: true,
  accessTokenLifetime: 60 * 60
});
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 4001;

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
