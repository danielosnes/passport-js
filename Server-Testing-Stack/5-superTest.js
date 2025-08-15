/*

*/
/****************************************************************************************************************************************************************/

/*
As you may have noticed in the previous exercise,
we are using the function [request] to make server calls to support our tests.
This is actually a reference to the SuperTest Library:

const request = require('supertest');

This library was specifically designed for testing Node server Responses
and integrates well with Mocha and Chai.
To use SuperTest, we pass the [app] object from out app into the [request] function.
To make a GET request, we use [.get()] with the desired route as the argument.

await request(app)
        .get('/')
        .send();


It is also possible to perform a POST using superTest.
We chain any desired properties or inpus to the HTTP call, and use [.send()] to make the request:

await request(app)
            .post('/messages')
            .type('form')
            .send({author, message});
*/
/****************************************************************************************************************************************************************/

/*
//before:
//index-test.js:
const request = require('supertest');

const app = require('../../app');

describe('the homepage', () => {
    it('returns the correct content', async () => {
        const response = await request(app);

        console.log(response.text);
    });
});

*/
/****************************************************************************************************************************************************************/

/*
Instructions
Checkpoint 1 Passed
1.
In the pane to the right, there is the start to a server test on the root document of our site. Chain the .get() method at the end of the request. Pass the appropriate argument to get the root object of our app ('/').

Run npm test to verify the server response is being printed to the console.

When you are ready to move on, check your work.

Append .get('/') to the end of .request(app)
*/
/****************************************************************************************************************************************************************/

/*
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-stack-5
> bin/mocha-test



  the homepage
<h1>Hello Testing World!</h1>
    ✓ returns the correct content


  1 passing (43ms)

*/
/****************************************************************************************************************************************************************/
const request = require('supertest');

const app = require('../../app');

describe('the homepage', () => {
    it('returns the correct content', async () => {
        const response = await request(app)
        .get('/');
        console.log(response.text);
    });
});