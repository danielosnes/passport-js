/*

*/
/****************************************************************************************************************************************************************/

/*
A server typically handles many requests at a time,
but may be only capable of processing a subset of the requests concurrently.
One side effect of this is that the server response time is neither instant or predictable.
If no other processes are occuring on the server,
requests are handled wuickly,
but if the server is close to full capacity,
the requests can take a few seconds or even time out.

We need a way to reeive asynchronous responses from the server and act on them.
The Async/Await pattern was introduced in Node 8 and helps us write readable descriptions of the behavior of our application
which is an important part of writing good tests.

To use this pattern, define the function with the [async] keyword.
Then, within the function, use the [await] keyword in front of the asynchronous function you are calling. For example:

const foo = async () => {
    console.log(await someAsyncThing());
    return true;    
}

foo();

Here, we are waiting for [someAsyncThing()] to return before logging the result to the console.
*/
/****************************************************************************************************************************************************************/

/*
//before:
// index-test.js

const request = require('supertest');

const app = require('../../app');

describe('the homepage', () => {
  it('returns the correct content', () => {
    const response = request(app)
      .get('/')
      .send();
      console.log(response.text);
    });
});

*/
/****************************************************************************************************************************************************************/
const request = require('supertest');

const app = require('../../app');

describe('the homepage', () => {
  it('returns the correct content', async () => {
    const response = await request(app)
      .get('/')
      .send();
      console.log(response.text);
    });
});
/*
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-stack-4
> bin/mocha-test



  the homepage
undefined
    ✓ returns the correct content


  1 passing (16ms)
$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-stack-4
> bin/mocha-test



  the homepage
<h1>Hello Testing World!</h1>
    ✓ returns the correct content


  1 passing (41ms)

$ npm test

> calculator-js@0.0.0 test /home/ccuser/workspace/tdd-server-stack-4
> bin/mocha-test



  the homepage
<h1>Hello Testing World!</h1>
    ✓ returns the correct content


  1 passing (41ms)

$ 

Instructions
Checkpoint 1 Passed
1.
In index-test.js to the right, there is the start of a server test on the root document of our site. There are no assertions yet, but we are attempting to log the server response to the console. Run the test as is and note that we see an “undefined” response logged to the console. (The request method is covered in the next exercise)

When you are ready to move on, check your work.

Use npm test in the terminal to run the test.

Checkpoint 2 Passed
2.
Update the function to use async in the function definition and await for the call to request. Run the tests again using npm test and note the logged response in the console.

When you are ready to move on, check your work.

Add async ahead of the () on the line starting with it... And add await before request(app).
*/
/****************************************************************************************************************************************************************/