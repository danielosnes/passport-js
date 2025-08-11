/*

*/
/****************************************************************************************************************************************************************/


/*
Awesome work!
We have covered a lot regarding password security and how hashing a password works. 

It's extremely important to avoid storing plaintext password in a database and to hash password BEFORE storing them in order to protect users.

In this lesson we covered:
    - What a #hashing algorithm is and how it can be used to protext a plaintext password.
    - What a salt is and how it's used to further secure a hashed password.
    - How Rainbow Table attacks are used to crack password hashes.
    - How to use [bcrypt] in order to generate a salt and hash a plaintext password.
    - How to use [bcrypt] in order to compare a retireved password with a password stored in the database.
    - How to implement [bcrypt] in an actual application and use it via user requests to authenticate users.

bcrypt is an extremely useful package that does a lot of work behind the scenes for us.
By applying it in your application, your users should be safe navigating the authentication process and avoid having their accounts hacked!
*/
/****************************************************************************************************************************************************************/