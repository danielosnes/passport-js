/*
we used several technologies to write tests for both happy and sad paths of
Server status codes
server response content
error cases

We also saw how TDD can be userd at the server level to guide the implementation of ther server code


We wrote a failing test
We wrote the minimal required server code to pass the test
When we decided or needed to refactor to meet external requirements
we used the existing tests to make sure our refactored code maintained the same end behavior.
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

describe('when the Message is valid', () => {
    it('creates a new message', async () => {
      const author = 'user name';
      const message ='feature testing with TDD makes me feel empowered to create a better workflow';
      
      //save message
      const response = await request(app)
        .post('/messages')
        .type('form')
        .send({author, message});
      
      //check database to verify message is saved
      assert.ok(await Message.findOne({message, author}), 'Creates a Message record');
    });
});
*/
/****************************************************************************************************************************************************************/

/*
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-patterns-7
> bin/mocha-test



  when the Message is valid
    1) creates a new message


  0 passing (32ms)
  1 failing

  1) when the Message is valid creates a new message:
     ReferenceError: Message is not defined
      at it (test/routes/messages-test.js:28:23)
      at process._tickCallback (internal/process/next_tick.js:109:7)



npm ERR! Test failed.  See above for more details.
$ 
*/
/****************************************************************************************************************************************************************/

/*
Instructions
Checkpoint 1 Passed
1.
In this course we moved from the feature level to the server level for our TDD approach. When working with persistent data, you will need to continue down the stack to the model layer. We’ve updated the test from the initial exercise in messages-test.js to the right.

Again, we are checking that a valid message is saved. However, instead of checking the returned page contains the new message, we are checking the message is saved to the database layer.

Run the test using npm test.

This test fails, since we have not yet implemented the model layer, which is our next step as a developer.
*/
/****************************************************************************************************************************************************************/