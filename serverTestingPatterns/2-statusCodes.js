/*

*/
/****************************************************************************************************************************************************************/

/*
Server tests are slightly faster than browser-driven feature tests.
Since the web browser is cut out of the test, we are not testing how things are rendered for the user.
Instead, we are focused on the server response.

One use of TDD at the server level is to ensure that the HTTP status codes are returned as expected.
Verifying status codes provide the most basic level of confidence that the server is functioning correctly.
Having a test suite that includes status codes provides a quick check when implementing a new feature 
that we haven't accidentally cause a request for valid routes to respond and not authroized (401) 

To verify status codes, 
we are asserting that the response status is equal to the status code integer that out application requires:

assert.equal(response.status, 200);

If we use the "red, green, refactor" approach to implement our server behavior we would start out with an assertion like this and expect it to fail ("red").
We then implement the behavior to pass the test ("green") and continue to refactor if needed, ensuring the test remains passing.
*/
/****************************************************************************************************************************************************************/

/*
//before:
const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

describe('root page', () => {
  describe('GET request', () => {
    it('returns a 200 status', async () => {
      const response = await request(app).
      get('/');
      
    });
  });
});
*/
/****************************************************************************************************************************************************************/

/*
//index-test.js:
const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

describe('root page', () => {
  describe('GET request', () => {
    it('returns a 200 status', async () => {
      const response = await request(app).
      get('/');
      assert.equal(response.status, 200);
    });
  });
});
*/
/****************************************************************************************************************************************************************/

/*
//index.js:
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('');
});

module.exports = router;
*/
/****************************************************************************************************************************************************************/

/*

Instructions
Checkpoint 1 Passed
1.
In index-test.js to the right, we started a server test for verifying the homepage returns a 200 (OK) status code. Add an assertion to check that the status code is indeed 200 and run the test using npm test.

When you are ready to move on, check your work.

Use assert.equal() to verify the response status code is 200. Make sure to use the actual value as the first argument and the expected (200) as the second.

Checkpoint 2 Passed
2.
This test failed, but that’s good news! That means we’ve entered the “red” portion of the red, green, refactor approach. Use res.send() within the server implementation for this route in index.js. It should return an empty string when a request is made to the home route ('/'). Run the test using npm test and verify it now passes.

Add res.send(''); in the response for the '/' route in index.js.
*/
/****************************************************************************************************************************************************************/

/*

*/
/****************************************************************************************************************************************************************/

/*

*/
/****************************************************************************************************************************************************************/