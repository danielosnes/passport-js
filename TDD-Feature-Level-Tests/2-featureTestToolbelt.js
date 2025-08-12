/*
To write the most effective feature tests, we are going to employ a few additional tools.
These tools are meant to support JavaScript testing,
We will cover their uses in the scope of building a feature test that drives implementation.

CHAI

Node.js has a default assertion library that provides enough functionality to write basic test code.
The Chai testing library http://chaijs.com/
extends the types of assertions we can make.

Chai is an assertion library for Node.js and browsers that can be paired with any JavaScript testing framework.

HEADLESS BROWSERS

Headless browsers allows us to write tests that mimic user interaction and then evaluate the results.
They do not require us to render the application in a visible browser window.

A browser runs "headless" when it doesn't render anything to the screen but it runs in the background.
NOTE: For the exercises in this lession, we will be using chrome in headless mode.

WEBDRIVER I/O
Webdriver I/O provides methods that allows us to programmitically interact with the user-facing elements of our app in a headless browser.

TOOLBELT HIGH-LEVEL SUMMARY
A headless browser allows us to run test that mimic user interaction with a web application.
WebdriverIO provides the methods to ineract with browser values programmatically.
We can make assertions against these tests using the Chai assertion library.
*/
/****************************************************************************************************************************************************************/
//before:
/*
//index.html:
(blank)
//user-visits-root-test.js:
const {assert} = require('chai');
*/
/****************************************************************************************************************************************************************/

/*
Instructions
In your user-visits-root-test.js file notice the first line of code, which makes Chai’s assertion library available for us to use in our tests.

const {assert} = require("chai")
*/
/****************************************************************************************************************************************************************/
