/*
Sometimes during the reflection of the refactor phase, 
you will realize that you can implement something better or more efficiently.
In the code so far, we have been responding with inline HTML string.
On a project that's large, this could make it difficult for the front end developer to organize and maintain.

An improved approach to this is using a templating library like Handlebars to separate the HTML view from the JavaScript controller.

In the web app you've built in this lesson we've placed the templates in the [/views] folder and have an extension of [.handlebars].
Our controller will now use [render] to create the view and pass in any variables.

const param = 'Foo';
res.render('templateName', {param});

The templates are written like regular HTML but variables can be accessed within the view using double curly braces:

<h1>{{ param }}</h1>

When the view is rendered it will replace {{ param }} with its actual value:

<h1>Foo</h1>
*/
/****************************************************************************************************************************************************************/

/*
//before:
//profile.js:
const express = require('express');
const router = express.Router();


router.get('/:username', (req, res) => {
    const username = req.params.username;
    res.send('<h1 id="welcome-message">Welcome ' + username + '!</h1>');
});

module.exports = router;
//profile.handlebars:
(blank)
//profile-test.js:
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

describe('profile page', () => {
  describe('GET request', () => {
    it('greets user with custom message', async () => {
        const username = 'alice';
        const response = await request(app).
        get('/profile/' + username);
        assert.equal(parseTextFromHTML(response.text, '#welcome-message'), 'Welcome ' + username + '!');
    });
  });
});
*/
/****************************************************************************************************************************************************************/

/*


Instructions
Checkpoint 1 Passed
1.
Consider the previous profile page route implementation in profile.js to the right.

Check the existing code using npm test.

When you are ready to move on, check your work.

Use npm test to run the tests.

Checkpoint 2 Passed
2.
We’ve added a blank view called profile.handlebars in the views folder.

Copy this HTML response into that file: <h1 id="welcome-message">Welcome {{ username }}</h1>.

When you are ready to move on, check your work.

Checkpoint 3 Passed
3.
Update the response in profile.js to use the newly created view and pass in the username. Use res.render() with the name of the view, 'profile' as the first argument, and the username as the second variable, {username}.

Run the test using npm test.

When you are ready to move on, check your work.

Remove the existing res.send() in profile.js and replace it with res.render(), passing 'profile' and {username}.

Checkpoint 4 Passed
4.
It looks like our test caught a small error in our new implementation — can you fix it?

Run npm test to verify it is in the green now.

When you are ready to move on, check your work.

There is an exclamation point missing from the end of the response.
*/
/****************************************************************************************************************************************************************/

/*
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-5
> bin/mocha-test



  root page
    GET request
      ✓ returns a 200 status
      ✓ contains the correct title

  profile page
    GET request
      ✓ greets user with custom message (42ms)


  3 passing (75ms)

$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-5
> bin/mocha-test



  root page
    GET request
      ✓ returns a 200 status
      ✓ contains the correct title

  profile page
    GET request
      ✓ greets user with custom message (44ms)


  3 passing (80ms)

$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-5
> bin/mocha-test



  root page
    GET request
      ✓ returns a 200 status
      ✓ contains the correct title

  profile page
    GET request
      ✓ greets user with custom message (48ms)


  3 passing (91ms)

$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-5
> bin/mocha-test



  root page
    GET request
      ✓ returns a 200 status
      ✓ contains the correct title

  profile page
    GET request
      1) greets user with custom message


  2 passing (101ms)
  1 failing

  1) profile page GET request greets user with custom message:

      AssertionError: expected 'Welcome alice' to equal 'Welcome alice!'
      + expected - actual

      -Welcome alice
      +Welcome alice!
      
      at it (test/routes/profile-test.js:22:16)
      at process._tickCallback (internal/process/next_tick.js:109:7)



npm ERR! Test failed.  See above for more details.
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-5
> bin/mocha-test



  root page
    GET request
      ✓ returns a 200 status
      ✓ contains the correct title

  profile page
    GET request
      ✓ greets user with custom message (63ms)


  3 passing (96ms)

$ 
*/
/****************************************************************************************************************************************************************/

/*
//profile.js:
const express = require('express');
const router = express.Router();


router.get('/:username', (req, res) => {
    const username = req.params.username;
    res.render('profile', {username});
});

module.exports = router;

*/
/****************************************************************************************************************************************************************/

/*
//profile.handlebars:
<h1 id="welcome-message">Welcome {{ username }}!</h1>
*/
/****************************************************************************************************************************************************************/
//profile-test.js:
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

describe('profile page', () => {
  describe('GET request', () => {
    it('greets user with custom message', async () => {
        const username = 'alice';
        const response = await request(app).
        get('/profile/' + username);
        assert.equal(parseTextFromHTML(response.text, '#welcome-message'), 'Welcome ' + username + '!');
    });
  });
});


