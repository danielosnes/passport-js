/*

*/
/****************************************************************************************************************************************************************/

/*
Now that we have written our second test,
it is time to write the minimal implementation code to move us forward in the TDD process.

Running the test suite for our poetry web app at this point would give us this error message:

[phantomjs #0-0] 1 failing (0s)
[phantomjs #0-0]
[phantomjs #0-0] 1) demo poetry web app saves the user poem and title:
[phantomjs #0-0] An element could not be located on the page using the given search parameters ("input[id=title]").


The error message tells us we are missing a <textarea> element with the ID [poem].
We can address this by adding the following to our {index.html}

<label for="poem">Your Poem:</label>
<textarea id="poem"></textarea>

Running the test again would give us a similar error message concerning the input element with the [type] equal to [submit].
This is the submit button referenced in our test code, 
and we can address this error by adding the following code to our {index.html} file:

<input type="submit">

The complete {index.html} file now looks like:

<section id="poems">
</section>

<label for="title">Title</label>
<input id="title">

<label for="poem">Your poem:</label>
<textarea id="poem"></textarea>

<input type="submit">

Running the test suite now would give us an error message like this:

[phantomjs #0-0] 1 failing (0s)
[phantomjs #0-0]
[phantomjs #0-0] 1) demo poetry web app saves the user poem and title:
[phantomjs #0-0] expected '' to include 'Words Birth Worlds'
[phantomjs #0-0] AssertionError: expected '' to include 'Words Birth Worlds'

While this error looks similar to the ones we have been seeing,
it is a different type of error message.
and it signals the need for a shift in our TDD process.

What's different here is that the failure comes from the /verification phase/ instead of the /exercise phase/.
While this isn't always the case, 
that means that we've changed the implementation code enough to get the pard of the test where we're specifying behavior, 
not just the existence of elements.

The kind of test we need to write in response to this error will force us to drop levels in the TDD Testing Pyramid.
*/
/****************************************************************************************************************************************************************/

/*
//before:
// index.html:
<section id="messages">
  
</section>
//user-visits-root-test.js
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
      
      const author = 'user name';
      const message ='feature testing with TDD makes me feel empowered to create a better workflow';

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

Instructions
Checkpoint 1 Passed
1.
Run your test using npm test and follow the error messages to address one issue at a time, until you receive an error concerning the verification phase of your test. That error that will force you to drop down to a server level test.

Use the error messages to find details about the missing <input> element
Create the missing <input> element with the correct id
Run your test suite using npm test to see the next missing element
Make sure to add a new <input> element with an id of "author" in the index.html file.

Checkpoint 2 Passed
2.
After running npm test, use the error messages to find details about a missing <textarea> element.

Add the missing <textarea> element with the correct id
Run your test suite using npm test to see the next missing element
Make sure to add a new <textarea> element with an id of "message" in the index.html file.

Checkpoint 3 Passed
3.
After running npm test, use the error messages to find details about a second missing <input> element.

Add the missing <input> element with the correct type
Run your test suite using npm test
Now the error should have a different type of message. It will not say that any elements are missing, but that there is unexpected behavior. 
This means that future testing will be in the verification phase instead of the exercise phase!
*/
/****************************************************************************************************************************************************************/

/*
<section id="poems">
</section>

<label for="author">author:</label>
<input id="author">

<label for="message">Your message:</label>
<textarea id="message"></textarea>

<input type="submit">

*/
/****************************************************************************************************************************************************************/
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
      
      const author = 'user name';
      const message ='feature testing with TDD makes me feel empowered to create a better workflow';

      browser.url('/');
      browser.setValue('input[id=author]', author);
      browser.setValue('textarea[id=message]', message);
      browser.click('input[type=submit]');

      assert.include(browser.getText('#messages'), message);
      assert.include(browser.getText('#messages'), author);
 
    });
  });
});