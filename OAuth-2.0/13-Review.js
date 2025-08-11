/*

*/
/****************************************************************************************************************************************************************/

/*

OAuth 2.0 in Express
Review
<1 min
Great job! You’ve written the OAuth application and tested the endpoints. 
Of course, in a typical application we wouldn’t be using cURL to obtain and use access tokens. 
In the project workspace on the right, you can see a front end to the project we built 
and incorporating the API calls using AJAX.

On the /login page, the login button sends a POST request to /auth with 
the Authorization header already populated with the Client ID. When the 
server eceives the request, 
the Client ID is passed to the obtainToken() callback function where the .token() 
method is called and returns the access token to the client.

Now, when we click the link to /secret the client passes the access token as a URL parameter, 
and the server calls the authorizeHandler() callback function
where the .authorize() method is called to verify whether the access token is valid. 
If the access token is valid, then secret.html is sent to the client, otherwise error.html is sent.

*/
/****************************************************************************************************************************************************************/