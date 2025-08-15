/*
As mentioned earlier, one of the use cases for server testing is for checking API responses,
especially the "Sad Path" where a user interacts with the server in an unexpected or disallowed manner.
We need to make sure our server properly handles a invalid password, form field errors, etc.

Ensuring the app is designed to withstand these issues and that the error interactions are well bounded is important.

Keep in mind that while there may only be one "happy path" for an interaction (user submits a valid password), 
there can be many corresponding "sad paths" (password too short, doesn't containt a special character, etc).
By testing the majority of these on a server level it saves us from testing at a more resource intensive level including the user view.
*/
/****************************************************************************************************************************************************************/

/*
//before: 
// messages-test.js:
const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');

const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

describe('/messages', () => {
  
  describe('POST', () => {
    describe('when the Message is valid', () => {
      it('redirects to the index', async () => {
        const author = 'Inquisitive User';
        const message = 'Why Test?';

        const response = await request(app)
          .post('/messages')
          .type('form')
          .send({author, message});

        assert.equal(response.status, 302);
        assert.equal(response.headers.location, '/');
      });
    });

    describe('when the author is blank', () => {
      it('renders an error message', async () => {
        const message = 'Server Testing';

        const response = await request(app)
          .post('/messages')
          .send({message});

        });
    });

  });
});

//messages.js:
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const {author, message} = req.body;

  //if (author === undefined) {
  //  res.status(400);
  //  res.setHeader('Content-Type', 'application/json');
  //  res.send(JSON.stringify({ message: '' }));
  //  return
  //}
  
  res.redirect('/');

});

module.exports = router;

*/
/****************************************************************************************************************************************************************/

/*

Instructions
Checkpoint 1 Passed
1.
We’ve added a new route to our application. It allows users to POST a message. After this, the user should be redirected to '/'. There is a passing assertion that handles this “happy path”.

We need to check the “sad path” where a user provides insufficient inputs.

We have started a test in messages-test.js to check the server responds with an error message when a submission does not contain an author.

Add an assertion to verify the server responds to this case with a status code of 400 (Bad Request).

Run the test using npm test.

When you are ready to move on, check your work.

Use assert.equal to check that the response.status is equal to 400. Note that the test will fail - this is ok!

Checkpoint 2 Passed
2.
The test is failing since we have not implemented this behavior yet. Within messages.js uncomment the code block that responds with the 400 response.

Verify the test now passes using npm test.

When you are ready to move on, check your work.

Checkpoint 3 Passed
3.
Let’s make sure the server responds with an appropriate error message as well. Add an assertion to our test to verify the server is responding with a message of ‘Every message requires an author’.

Note that this API is returning JSON, so you will access the message content using:

JSON.parse(response.text).message

Run the test using npm test. This should fail since we have not implemented the correct response.

When you are ready to move on, check your work.

Use assert.equal() to check that JSON.parse(response.text).message is equal to ‘Every message requires an author’.

Checkpoint 4 Passed
4.
The test is in the red. Add the correct string (‘Every message requires an author’) to the response in messages.js.

Run the test again using npm test.

When you are ready to move on, check your work.

Add ‘Every message requires an author’ as the JSON message text within the res.send() in messages.js:

{ message: 'Every message requires an author'}
*/
/****************************************************************************************************************************************************************/

/*
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-6
> bin/mocha-test



  /messages
    POST
      when the Message is valid
        ✓ redirects to the index
      when the author is blank
        1) renders an error message


  1 passing (46ms)
  1 failing

  1) /messages POST when the author is blank renders an error message:

      AssertionError: expected 302 to equal 400
      + expected - actual

      -302
      +400
      
      at it (test/routes/messages-test.js:41:16)
      at process._tickCallback (internal/process/next_tick.js:109:7)



npm ERR! Test failed.  See above for more details.
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-6
> bin/mocha-test



  /messages
    POST
      when the Message is valid
        ✓ redirects to the index
      when the author is blank
        ✓ renders an error message


  2 passing (45ms)

$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-6
> bin/mocha-test



  /messages
    POST
      when the Message is valid
        ✓ redirects to the index
      when the author is blank
        ✓ renders an error message


  2 passing (44ms)

$ 
*/
/****************************************************************************************************************************************************************/

/*
//messages-test.js:
const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');

const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

describe('/messages', () => {
  
  describe('POST', () => {
    describe('when the Message is valid', () => {
      it('redirects to the index', async () => {
        const author = 'Inquisitive User';
        const message = 'Why Test?';

        const response = await request(app)
          .post('/messages')
          .type('form')
          .send({author, message});

        assert.equal(response.status, 302);
        assert.equal(response.headers.location, '/');
      });
    });

    describe('when the author is blank', () => {
      it('renders an error message', async () => {
        const message = 'Server Testing';

        const response = await request(app)
          .post('/messages')
          .send({message});
        assert.equal(response.status, 400);
        assert.equal(JSON.parse(response.text).message, 'Every message requires an author');
        });
    });

  });
});

*/
/****************************************************************************************************************************************************************/

/*
//messages.js:
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const {author, message} = req.body;

  if (author === undefined) {
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: 'Every message requires an author' }));
    return
  }
  
  res.redirect('/');

});

module.exports = router;
*/
/****************************************************************************************************************************************************************/