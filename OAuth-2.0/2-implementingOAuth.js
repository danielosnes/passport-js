/*
Throughout this lesson, we'll implement an OAuth application using Node.js.
In the workspace to the right, there is a simple website built using Express framework.
The application has three routes.
/ - a public home page that has links to /secret and /login
/login - a public page that has a button to login in and recieves an access token
/secret - a protected route that will require an access token to view.

Inside the root directory, there is db.js our in-memory database that we will use for our application.
In the workspace on the right, we have a basic expression application
*/
/****************************************************************************************************************************************************************/
/*
//before:
const express = require('express');
const path = require('path');

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
Explore the project in the workspace to the right. You can run the web app by typing in the terminal:

node app.js

Copy to Clipboard

Then, press the “Check Work” button to load the website.


*/
/****************************************************************************************************************************************************************/
const express = require('express');
const path = require('path');

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
