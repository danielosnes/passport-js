/*
The last thing our test needs is an assert statement to verify that the behavior we expect is equal to the actual behavior of our code.

We want to make sure our app is an /empty state/

We can write a test for this behavior by deciding that poems will be listen in an HTML element with an [id] attribute set to [poems].
Then, write an assert statement to verify that the element with the ID [poems] is empty.

We can do this using the Chai [assert.equal] method, whic evaluates if the two arguments are equal.

In the case of our poetry app, the assert statement would look like this:

assert.equal(browser.getText('#poems), '')

Because we will render the poetry onto the page as text,
we can evaluate the contents of the HTML element as a string.

The [.getText()] method, from webdriver io, gets the text content from the selected DOM element.

Here we are using [browser.getText()] to evaluate if teh text in the element with the ID [poems] is equal to an empty string
Our final code for this feature test would look like this:

describe('User visits root', () => {
  describe('without existing messages', () => {
    it('starts blank', () => {
      browser.url('/');
      
      assert.equal(browser.getText('#poems'), '');
    });
  });
});
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
      
    });
  });
});
//index.html:
(blank)
*/
/****************************************************************************************************************************************************************/

/*


Instructions
Checkpoint 1 Passed
1.
Use assert.equal() to evaluate if an element with ID of "messages" has no text in it. For example:

<section id="messages"></section>

Copy to Clipboard

Then run your test suite using npm test to check your work and celebrate being in the red!

The first argument in your assert statement should use browser.getText(), and the selector for a DOM element with the ID messages.

The second argument should be an empty string.
*/
/****************************************************************************************************************************************************************/

/*
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-feature-test-feature-test-i-assert-v2
> PORT=8001 bin/wdio-test

GET / 200 5.292 ms - -
------------------------------------------------------------------
[phantomjs #0-0] Session ID: 6c056150-77a0-11f0-9fdb-3174b00576a7
[phantomjs #0-0] Spec: /home/ccuser/workspace/tdd-feature-test-feature-test-i-assert-v2/test/features/user-visits-root-test.js
[phantomjs #0-0] Running: phantomjs
[phantomjs #0-0]
[phantomjs #0-0] User visits root
[phantomjs #0-0]
[phantomjs #0-0] without existing messages
[phantomjs #0-0]   1) starts blank
[phantomjs #0-0]
[phantomjs #0-0]
[phantomjs #0-0] 1 failing (0s)
[phantomjs #0-0]
[phantomjs #0-0] 1) without existing messages starts blank:
[phantomjs #0-0] An element could not be located on the page using the given search parameters ("#messages").
[phantomjs #0-0] Error: An element could not be located on the page using the given search parameters ("#messages").
[phantomjs #0-0]     at getText("#messages") - at elements("#messages") - getText.js:18:17
[phantomjs #0-0]

npm ERR! Test failed.  See above for more details.
npm WARN Local package.json exists, but node_modules missing, did you mean to install?
$ 
*/
/****************************************************************************************************************************************************************/
const {assert} = require('chai');

describe('User visits root', () => {

  describe('without existing messages', () => {
    it('starts blank', () => {
      browser.url('/');
      
      assert.equal(browser.getText('#messages'), '');
    });
  });
});