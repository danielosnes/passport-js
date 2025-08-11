/*
OAuth describes a protocol for authentication,
and there are many open source and commercial libraries for various programming languages to help implement it.
We will use the oauth2-server module to implement an OAuth 2.0 provider in Node.js utilizing the 
client credentials grant type to demonstrate obtaining an access token and using it in request.

The package can be installed in the terminal using npm with the command

npm install oauth2-server

From here we instantiate the oauth2-server module and store it in a variable like below:

const OAuth2Server = require ('oauth2-server');
*/
/****************************************************************************************************************************************************************/
/*
//before: 
const express = require('express');
const path = require('path');
// Import oauth2-server here

const app = express();

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
Install the oauth2-server package using npm.

Checkpoint 2 Passed
2.
Import the oauth2-server package in app.js and set it to a variable named OAuth2Server using require().
*/
/****************************************************************************************************************************************************************/
const express = require('express');
const path = require('path');
// Import oauth2-server here
const OAuth2Server = require('oauth2-server');
const app = express();

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
