/*

*/
/****************************************************************************************************************************************************************/

/*
In general, it is up to the developer to make a judgement call on how in depth to write a test.
Every test written adds time ot the testing cycle and can require maintainence if changed are made to the server behavior.
For example,
extensively testing failure cases at the feature level might be more than is needed if the error behavior can be fully tested and described at the server level.

As you develop an application,
you may realize that you can replace feature tests or reducde them with equal coverage at a lower level.
One question to ask when deciding between full feature test versus a server test is:

"Is it worth trading a slow feature test for a faster server test that doesn't test the UI?"

Based on the context of the different levels of testing,
you should aim the pick to set of tests that gives you the best combination of reliable, complete and fast tests.

In this lesson you will use server-level testing technologies to test-drive the development of an Express server.

Server Tests often provide feedback in terms of HTTP domain concepts like status codes, header keys and values and the content of the response body.
Let's take a look at a feature level test and compare it to a corresponding server test in {messages-test.js} 

// example: 
describe('posting a message', () => {
    it('saves the message with the author information', () => {
    const author = 'user name';
    const message = 'feature testing with TDD makes me feel empowered to create a better workflow';

    browser.url('/');
    browser.setValue('input[id=author]', author);
    browser.setValue('textarea[id=message]', message);
    browser.click('input[type=submit]');

    assert.include(messagesTest(), message);
    assert.include(messagesTest(), author);
    });
});

//from {messages-test.js}:
describe('when the Message is valid', () => {
    it('creates a new message', async () => {
      const author = 'user name';
      const message ='feature testing with TDD makes me feel empowered to create a better workflow';
      
      //save message
      const response = await request(app)
        .post('/messages')
        .type('form')
        .send({author, message});
      
      //check response to verify message is saved
      assert.include(parseTextFromHTML(response, '#messages'), message);
    });
});

When such a test fails due to a non-existent server implementation,
the developer needs to dive into the server level and begin the TDD process to drive the server solution.
*/
/****************************************************************************************************************************************************************/

/*
//before: 
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

describe('when the Message is valid', () => {
    it('creates a new message', async () => {
      const author = 'user name';
      const message ='feature testing with TDD makes me feel empowered to create a better workflow';
      
      //save message
      const response = await request(app)
        .post('/messages')
        .type('form')
        .send({author, message});
      
      //check response to verify message is saved
      assert.include(parseTextFromHTML(response, '#messages'), message);
    });
});
*/
/****************************************************************************************************************************************************************/

/*
Instructions
Checkpoint 1 Passed
1.
In the panel to the right, there is a corresponding server test to illustrate the differences between feature and server level tests. Compare the describe block to the feature test above — what’s different?

When you are ready to move on, check your work.

The main difference is that we are not using the browser component to test anything. Assertions are directly using the server request and responses.
*/
/****************************************************************************************************************************************************************/
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
      
      //check response to verify message is saved
      assert.include(parseTextFromHTML(response, '#messages'), message);
    });
});