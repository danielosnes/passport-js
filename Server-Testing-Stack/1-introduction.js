/*

*/
/****************************************************************************************************************************************************************/
/*
When testing an application, feature tests expose required tests or implementations at different levels of the application technology stack.
One of those levels in the backend server.

Server tests are used to test the server response only, not any front-end rendering of code or user interactions.
We "disconnect" the browser and interact directly with the server using requests.
The tests define the expected behavior of the interactions and check the actual responses against what we expect.

Server tests are commonly used to test API responses,
but we also use server tests for any server respons that our application relies on.
This can include checking status codes and error messages.

In this lesson, we introduce a suite of technologies and concepts for performing testing on a JavaScript-based server.
These include Chai, jsdom, and SuperTest.
We also review how to use async/await for asynchoronous calls.
When adapting this to your project, it needs to be tailored to match the specific technology stack for your project.
*/
/****************************************************************************************************************************************************************/
/*
//before:
user-visits-root-test.js:

const {assert} = require('chai');

describe('User visits root', () => {

  describe('without existing messages', () => {
    it('starts blank', () => {
      browser.url('/');
      assert.equal(browser.getText('#messages'),'');
    });
  });

  describe('posting a message', () => {
    it('saves the message with the author information', () => {
      
      const message ='feature tests often hit every level of the TDD Testing Pyramid';
      const author = 'username';
      
      browser.url('/');
      browser.setValue('input[id=author]', author);
      browser.setValue('textarea[id=message]', message);
      browser.click('input[type=submit]');

      assert.include(browser.getText('#messages'), message);
      assert.include(browser.getText('#messages'), author);
 
    });
  });
});
*/
/****************************************************************************************************************************************************************/
/*
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-stack-1
> PORT=8001 bin/wdio-test

GET / 200 5.254 ms - 433
GET /stylesheets/style.css 200 1.117 ms - 939
GET / 304 1.084 ms - -
GET /stylesheets/style.css 200 0.836 ms - 939
------------------------------------------------------------------
[phantomjs #0-0] Session ID: 1d700310-77c8-11f0-94d5-3f2633a9203a
[phantomjs #0-0] Spec: /home/ccuser/workspace/tdd-server-stack-1/test/features/user-visits-root-test.js
[phantomjs #0-0] Running: phantomjs
[phantomjs #0-0]
[phantomjs #0-0] User visits root
[phantomjs #0-0]
[phantomjs #0-0] without existing messages
[phantomjs #0-0]   ✓ starts blank
[phantomjs #0-0]
[phantomjs #0-0] posting a message
[phantomjs #0-0]   1) saves the message with the author information
[phantomjs #0-0]
[phantomjs #0-0]
[phantomjs #0-0] 1 passing (1s)
[phantomjs #0-0] 1 failing
[phantomjs #0-0]
[phantomjs #0-0] 1) posting a message saves the message with the author information:
[phantomjs #0-0] expected '' to include 'feature tests often hit every level of the TDD Testing Pyramid'
[phantomjs #0-0] AssertionError: expected '' to include 'feature tests often hit every level of the TDD Testing Pyramid'
[phantomjs #0-0]     at Context.it (/home/ccuser/workspace/tdd-server-stack-1/test/features/user-visits-root-test.js:23:14)
[phantomjs #0-0]

npm ERR! Test failed.  See above for more details.
$ 
*/
/****************************************************************************************************************************************************************/
