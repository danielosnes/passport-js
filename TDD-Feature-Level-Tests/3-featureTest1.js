/*
Feature tests exercise behavior by simulating a user navigating the application in a web browser.

Imagine we wanted to create a simple web-based poetry writing application.

The first feature we would want to write is to check out application's /empty state/
The functionality we want to test is:
- when a [user visits the homepage], the [poems section is empty]
We want to make sure that when there are no poems in the database,
there are no poems rendered on the homepage.
This is the application's /empty state/

The testing suite for our poetry app would begin with nested describe blocks like this

describe('Poetry web app', () => {
    describe('user visits root', () => {
    
    });
});

The term 'root' refers to our application's entry point,
which in this example is the home page that users will visit in their browser.

Next we add an [it] block to describe the behavior we want to test in our app:

describe('Poetry web app', () => {
    describe('user visits root', () => {
        it('page starts blank', () => {
        
        });
    });
});

When a user visits the root of our app,
they should have a blank page to write their own poem.

THE PLUMBING

Next, we reach for our feature testing toolbelt.
We start by using the global [browser] variable that is provided by Webdriver IO.

The [browser] variable is powerful because it gives us access to the browser that Phantom is running in the background.
We can simulate a user interacting with our website by calling different methods on the global [browser] variable in our test suite.

For example,
we can user [browser.url()] to simulate a user visiting the home page of our application,
which is the first behavior we want to test.

The [.url] method navigates to the URL that is passed to it as an argument.
The following line of code would navigate to the Codecademy website in the Phantom browser.

browser.url('https://www.codecademy.com')

In this case of our poetry web app, 
we will pass in ['/'] as the argument,
which will point the browser to the root of our project,
which in this case, is our {index.html}

The code would look like this:

describe('Poetry web app', () => {
    describe('user visits root', () => {
        it('page starts blank', () => {
            browser.url('/');    
        })
    });
});


*/
/****************************************************************************************************************************************************************/
/*
//before:
//index.html:
(blank)
//user-visits-root-test.js:
const {assert} = require('chai');

describe('User visits root', () => {
  describe('without existing messages', () => {

  });
});
*/
/****************************************************************************************************************************************************************/
/*
Instructions
Checkpoint 1 Passed
1.
Imagine you are a developer working on a project that includes creating a web application with a message feature.

The first feature you want to test in your web app is that no messages appear on the page when a user visits the project root.

Inside the describe blocks in user-visits-root-test.js file, write an it block with the string: starts blank, and an empty callback function.
Checkpoint 2 Passed
2.
Inside the it block, call the .url() method on the global browser variable and pass '/' as the argument.

In the terminal, execute the command npm test, you should see a passing test!
*/
/****************************************************************************************************************************************************************/
/*
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-feature-test-feature-test-i
> PORT=8001 bin/wdio-test

GET / 200 5.695 ms - -
------------------------------------------------------------------
[phantomjs #0-0] Session ID: f4de8fd0-779e-11f0-8501-c37efefd2bef
[phantomjs #0-0] Spec: /home/ccuser/workspace/tdd-feature-test-feature-test-i/test/features/user-visits-root-test.js
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
const {assert} = require('chai');

describe('User visits root', () => {
  describe('without existing messages', () => {
    it('starts blank', () => {
      browser.url('/');
    });
  });
});