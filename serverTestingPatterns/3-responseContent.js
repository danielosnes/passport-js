/*
In the previous exercise we checked that the server responded with specific status code.
Now we need to make sure that the server is responding with the correct content.
Specifically, we are looking at the HTML responses that are rendered by the front-end.

Many servers return dynamic HTML content based on the user,
the URL access, headervalue, and more.
We use TDD to ensure the server response correctly for each case.
When designing our test,
it is important to consider both the intended and unintended user behavior.

We can organize our tests into two categories:
    - Tests that exercise the "Happy Path" - expected use cases of our application
    - Tests that exercise the "Sad Path" - unexpected or invalid use of our application.

For our test,
once we retrieve the response from the server we use [assert.include()] from the Chai library to check the response.

As an example, after requesting a valid profile page for "My Name", you may receive the following response content:

response.text = '<div><div id="my-name">My Name</div></div>';

You can retrieve the content of [#my-name] and check it using the following:

assert.include(parseTextFromHTML(response.text, '#my-name'), "My Name"); // true

We could also write a separate test to check the corresponding "sad path".
Perhaps there is not yet a page for "Your Name" so you should not receive a response containing similar HTML.
We use [.notInclude()] to verify that the response is NOT including "Your Name".

assert.notInclude(parseTextFromHTML(response.text, '#my-name'), "Your Name"); // true

Note that here we are identifying the HTML elements by their ID using our [parseTextFromHTML] helper but you can use any selectors supported by the jsdom library.
This helper is returning the text content of the corresponding html htlement only but you could write a separate helper for accessing other attributes.
*/
/****************************************************************************************************************************************************************/

/*
//before:
// index-test.js:
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

describe('root page', () => {
  describe('GET request', () => {
    it('returns a 200 status', async () => {
      const response = await request(app).
      get('/');
      assert.equal(response.status, 200);
    });
    
    it('contains the correct title', async () => {
      const response = await request(app).
      get('/');

    });
  });
});
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
We want our home page (at '/') to contain an <h1> element with an id of #page-title. It should say ‘Messaging App’. Add an assertion within the “correct title” test using the parseTextFromHTML() helper to check the response.

Run the test with npm test. It will fail, but that’s what we want!

When you are ready to move on, check your work.

Use assert.equal to check the text returned from parseTextFromHTML().

Make sure to use response.text to access the text of the response for the first argument.

Checkpoint 2 Passed
2.
Within index.js, implement the correct response using res.send() and the intended content ('<h1 id="page-title">Messaging App</h1>') to change this test from red to green.

Run the test with ‘npm test’.

When you are ready to move on, check your work.

Pass the intended content as the argument to res.send().
*/
/****************************************************************************************************************************************************************/

/*
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-3
> bin/mocha-test



  root page
    GET request
      ✓ returns a 200 status
      1) contains the correct title


  1 passing (69ms)
  1 failing

  1) root page GET request contains the correct title:
     Error: No element with selector #page-title found in HTML string
      at parseTextFromHTML (test/routes/index-test.js:12:11)
      at it (test/routes/index-test.js:27:20)
      at process._tickCallback (internal/process/next_tick.js:109:7)



npm ERR! Test failed.  See above for more details.
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-3
> bin/mocha-test



  root page
    GET request
      ✓ returns a 200 status
      ✓ contains the correct title (42ms)


  2 passing (74ms)

$ 
*/
/****************************************************************************************************************************************************************/

/*
//index.js:
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('<h1 id="page-title">Messaging App</h1>');
});

module.exports = router;
*/
/****************************************************************************************************************************************************************/

/*
//index-test.js:
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

describe('root page', () => {
  describe('GET request', () => {
    it('returns a 200 status', async () => {
      const response = await request(app).
      get('/');
      assert.equal(response.status, 200);
    });
    
    it('contains the correct title', async () => {
      const response = await request(app).
      get('/');
      assert.equal(parseTextFromHTML(response.text, '#page-title'), 'Messaging App');
    });
  });
});
*/
/****************************************************************************************************************************************************************/