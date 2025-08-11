/*
Great job! We've implemented the Client Credentials OAuth 2.0 flow into our application!
The handling of access tokens is done with HTTP requests.
We can make an HTTP POST request to the [/auth] route to obtain an access token.

POST http://localhost:4001/auth
Content-Type: application/x-www-form-urlencoded
Authorization: Basic Y29kZWNhZGVteTpjb2RlY0BkZW15

grant_type=client-credentials

In the HTTP header we set [Authorization] to [Basic] and the base64 encoded Client ID/Client Secret
In the POST request data,
we provide [grant-type=client_credentials]
The server will respond with an access token that looks like this;

{
  "accessToken":"<access token>",
  "accessTokenExpiresAt":"2021-06-17T01:02:37.272Z",
  "client": {
    "id": "codecademy",
    "user":{}
  }
}

To use the access token while requesting authenticated content,
we pass the bearer token in the Authentication request header,
replacing [<Access Token>] with the token returned from the request to [/auth] like so:

GET http://localhost:4001/secret
Authorization: Bearer <Access Token>

*/
/****************************************************************************************************************************************************************/


/*
//before;

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

const authenticateRequest = (req, res, next) => {
 
  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res);
 
  return oauth.authenticate(request, response)
    .then(()=>{
      next();
    })
    .catch((err) => {
      res.send('You are not allowed')
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

app.get('/secret', authenticateRequest, (req, res)=>{
    res.send('Welcome to the secret area.');
})

app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`));

a05d5ade9a64df90c64df1eaee70982029ac6607

*/
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

const authenticateRequest = (req, res, next) => {
 
  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res);
 
  return oauth.authenticate(request, response)
    .then(()=>{
      next();
    })
    .catch((err) => {
      res.send('You are not allowed')
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

app.get('/secret', authenticateRequest, (req, res)=>{
    res.send('Welcome to the secret area.');
})

app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`));


/****************************************************************************************************************************************************************/


/*
$ node app.js
Listening on port 4001

*/
/****************************************************************************************************************************************************************/


/*
$ curl --request POST \
> --url http://localhost:4001/auth \
> --header 'authorization: Basic Y29kZWNhZGVteTpjb2RlY0BkZW15' \
> --header 'content-type: application/x-www-form-urlencoded' \
> --data grant_type=client_credentials
{"accessToken":"4bfee51ef4f73807148adafc2e4e83639e231098","accessTokenExpiresAt":"2025-08-11T23:26:13.087Z","clien
$ curl --request GET \
> --url http://localhost:4001/secret \
> --header 'authorization: Bearer 4bfee51ef4f73807148adafc2e4e83639e231098'
Welcome to the secret area.$ curl localhost:4001/secret
You are not allowed$ 
$ curl localhost:4001/secret
$ 
*/
/****************************************************************************************************************************************************************/
