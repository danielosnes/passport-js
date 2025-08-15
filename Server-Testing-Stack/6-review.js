/*
In this lesson we covered a set of technologies used for testing a Node 
server. These included:

Chai - a library for extending the built in Node assertion library
jsdom - a library for interacting and testing the DOM returned by the server (this functionality is encapsulated in our parseTextFromHTML helper function).
async / await - a pattern for making asynchronous code more readable
SuperTest - a library for making Node server requests and testing their responses

*/
/****************************************************************************************************************************************************************/

/*
//before:
//index.js:
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  res.send('<h1 id="page-title">My Page</h1>');
});

module.exports = router;
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

describe('the homepage', () => {
    it('the #page-title element contains the page title', async () => {
        const pageTitle = 'My Page';
        const response = await request(app).
        get('/').
        send();
        assert.include(parseTextFromHTML(response.text, '#page-title'), pageTitle);
    });
    
});

*/
/****************************************************************************************************************************************************************/

/*
Instructions
Checkpoint 1 Passed
1.
In the pane to the right there is a test that makes use of all the technologies. Run the test using npm test and verify it passes. In the next lesson, we’ll use these concepts to further explore testing a Node server.

When you are ready to move on, check your work.

Type npm test in the terminal and press enter
*/
/****************************************************************************************************************************************************************/

/*
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-stack-6
> bin/mocha-test



  the homepage
    ✓ the #page-title element contains the page title (64ms)


  1 passing (70ms)

$ 
*/
/****************************************************************************************************************************************************************/