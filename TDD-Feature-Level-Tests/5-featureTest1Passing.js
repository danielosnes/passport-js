/*
Now that we have written our first test with an assert statement,
we will run the test and use the error message to drive the next step in our development process.

When excecuting a feature test that fails, error will have messages that discuss the failure in terms of HTML 
(i.e. that text button that you said would be on the page isn't on the page) 
or HTTP 
(i.e. the request that this page made resulted in a 404 HTTP status because the route you requested didn't exist.)

Considering our poetry app example,
if we ran our test suite we would get an error message that included:

[phantomjs #0-0] 1 failing (0s)
[phantomjs #0-0]
[phantomjs #0-0] 1) without existing poems page starts blank:
[phantomjs #0-0] An element could not be located on the page using the given search parameters ("#poems").
[phantomjs #0-0] Error: An element could not be located on the page using the given search parameters ("#poems").
[phantomjs #0-0]     at getText("#poems") - at elements ("#poems") - getText.js:18:17

That error message describes the issue in terms of HTML elements and tells us that the element we are expecting does not exist on our page.
Tha tis because we have not yet created the HTML in our {index.html} file.

Using a strict TDD approach,
we would just write enough HTML code to make our tests pass.
Let's do that now:

<section id="poems"></section>

When we run our test we get a message confirming that it is passing

[phantomjs #0-0] without existing poems
[phantomjs #0-0] ✓ page starts blank
[phantomjs #0-0]
[phantomjs #0-0]
[phantomjs #0-0] 1 passing (0s)
[phantomjs #0-0]

We have written our first feature test and moved from the red to the green using a TDD approach.

We expected this test to pass because we haven't created poems as part of our test's set up.
Each test is discrete and isolated from the other parts of the project,
so we know that the list of poems will be empty.
*/
/****************************************************************************************************************************************************************/
/*
//before:
// user-visits-root-test.js:
const {assert} = require('chai');

describe('User visits root', () => {

  describe('without existing messages', () => {
    it('starts blank', () => {
      browser.url('/');

      assert.equal(browser.getText('#messages'),'');
    });
  });
});
// index.html:
(blank)
*/
/****************************************************************************************************************************************************************/
/*
Instructions
Checkpoint 1 Passed
1.
Run your test suite in the terminal using npm test.

Go to index.html and create a <section> element with an id="messages" to respond to the error message you received when running your test suite.

Run your test suite again in the terminal to make sure you are in the green.
*/
/****************************************************************************************************************************************************************/

/*
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-feature-test-pass-feature-test-i
> PORT=8001 bin/wdio-test

GET / 200 5.198 ms - 33
------------------------------------------------------------------
[phantomjs #0-0] Session ID: 9bdf37f0-77a2-11f0-a437-196210649374
[phantomjs #0-0] Spec: /home/ccuser/workspace/tdd-feature-test-pass-feature-test-i/test/features/user-visits-root-test.js
[phantomjs #0-0] Running: phantomjs
[phantomjs #0-0]
[phantomjs #0-0] User visits root
[phantomjs #0-0]
[phantomjs #0-0] without existing messages
[phantomjs #0-0]   ✓ starts blank
[phantomjs #0-0]
[phantomjs #0-0]
[phantomjs #0-0] 1 passing (0s)
[phantomjs #0-0]

$ 
*/
/****************************************************************************************************************************************************************/
// index.html:
// <section id="messages"></section>