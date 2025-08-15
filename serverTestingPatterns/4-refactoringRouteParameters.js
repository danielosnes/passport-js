/*
In the previous exercise,
we checked that the server responded with a specific message.
On our home page, the title is a contant for everyone, "Messaging App".

What if we wanted to create a profile page that is customized for each user?

A straightforward implementation would be to generate hardcoded routes 
for every single user of our app.
Think: 
'welcome/alice' => '<h1>Your Name is alice</h1>', 'welcome/bob' => '<h1>Your Name is '+ req.params.username + '</h1>'

If you are using the red, green, refatctor approach,
you will start with a set of passing ("green") assertions for the section of code 
you are looking to improve.
With the current behavior captured,
you can begin refactorting,
knowing that your tests will "catch" you before turning red
if you miss something in your approach.
*/
/****************************************************************************************************************************************************************/

/*
//before:
// profile-test.js:
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
    it('greets alice', async () => {
        const response = await request(app).
        get('/profile/alice');
        assert.equal(parseTextFromHTML(response.text, '#welcome-message'), 'Welcome alice!');
    });
    it('greets bob', async () => {
        const response = await request(app).
        get('/profile/bob');
        assert.equal(parseTextFromHTML(response.text, '#welcome-message'), 'Welcome bob!');
    });
  });
});


//profile.js:
const express = require('express');
const router = express.Router();


router.get('/alice', (req, res) => {
    res.send('<h1 id="welcome-message">Welcome alice!</h1>');
});

router.get('/bob', (req, res) => {
    res.send('<h1 id="welcome-message">Welcome bob!</h1>');
});

module.exports = router;

*/
/****************************************************************************************************************************************************************/

/*
Instructions
Checkpoint 1 Passed
1.
In profile.js to the right, we have an implementation to provide customized profile messages for each of our users (alice and bob). Through TDD, we also have a set of assertions in profile-test.js to verify we are providing the correct messages to each user.

Run npm test to verify we are green.

When you are ready to move on, check your work.

Checkpoint 2 Passed
2.
In profile.js, replace the string '/alice' in the first profile route with '/:username' to make the username available as a variable.

Run npm test to see how this affected our test.

When you are ready to move on, check your work.

Checkpoint 3 Passed
3.
Our test is now failing. Edit the welcome message in the route to use the username variable (req.params.username) instead of the hard-coded “alice”.

Run npm test to verify we’re back in the green.

When you are ready to move on, check your work.

Checkpoint 4 Passed
4.
Remove the second profile route for bob now that we have a variable route doing the work for us.

Run npm test to verify we are still green.

When you are ready to move on, check your work.

Checkpoint 5 Passed
5.
At this point, you may decide to delete one of the tests (alice, bob), since the implementation is now dependent on the name as a variable only. This decision depends on the balance between the time your tests take and the cost of missing a potential corner case.

When you are ready to move on, check your work.
*/
/****************************************************************************************************************************************************************/

/*
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-4
> bin/mocha-test



  root page
    GET request
      ✓ returns a 200 status
      ✓ contains the correct title

  profile page
    GET request
      ✓ greets alice (42ms)
      ✓ greets bob


  4 passing (96ms)

$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-4
> bin/mocha-test



  root page
    GET request
      ✓ returns a 200 status
      ✓ contains the correct title

  profile page
    GET request
      ✓ greets alice (48ms)
      1) greets bob


  3 passing (104ms)
  1 failing

  1) profile page GET request greets bob:

      AssertionError: expected 'Welcome alice!' to equal 'Welcome bob!'
      + expected - actual

      -Welcome alice!
      +Welcome bob!
      
      at it (test/routes/profile-test.js:26:16)
      at process._tickCallback (internal/process/next_tick.js:109:7)



npm ERR! Test failed.  See above for more details.
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-4
> bin/mocha-test



  root page
    GET request
      ✓ returns a 200 status
      ✓ contains the correct title

  profile page
    GET request
      ✓ greets alice (43ms)
      ✓ greets bob


  4 passing (96ms)

$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-4
> bin/mocha-test



  root page
    GET request
      ✓ returns a 200 status
      ✓ contains the correct title

  profile page
    GET request
      ✓ greets alice (42ms)
      ✓ greets bob


  4 passing (94ms)

$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-4
> bin/mocha-test



  root page
    GET request
      ✓ returns a 200 status
      ✓ contains the correct title

  profile page
    GET request
      ✓ greets alice (43ms)


  3 passing (77ms)

$ 
*/
/****************************************************************************************************************************************************************/

/*
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
    it('greets alice', async () => {
        const response = await request(app).
        get('/profile/alice');
        assert.equal(parseTextFromHTML(response.text, '#welcome-message'), 'Welcome alice!');
    });
  });
});



*/
/****************************************************************************************************************************************************************/

/*
const express = require('express');
const router = express.Router();


router.get('/:username', (req, res) => {
    res.send('<h1 id="welcome-message">Welcome ' + req.params.username + '!</h1>');
});

module.exports = router;
*/
/****************************************************************************************************************************************************************/