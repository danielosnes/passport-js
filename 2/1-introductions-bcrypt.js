/****************************************************************************************************************************************************************/
/*
When practicing new concepts, we might store plaintext passwords in a local database, but this is INCREDIBLY insecure.
One should never do this in a production environment. 
Sensitive Data Exposure is one of the OWASP's Top Ten security risks to web applications for a reason!
Instead, you should hash passwords before storing them in order to protect your users from being hacked.

There are plenty of cryptographic hashing functions to choose from:
such as the SHA-3, or MD-5 algorithms.
SHA-3 and MD-5 algos are known to be quite fast.
Unfortunately, the faster the function, the faster a hacker can retrieve a hashed password through brute force attacks.
So, using a function that is slower at hashing passwords can actually protect your users.

We can accomplish this by using the [bcrypt] #algorithm and library.
Using [bcrypt], we can protect our users by hashing and salting passwords.
Using multiple rounds of hashing ensures that an attacker must deploy massive funds and hardware to be able to crack your passwords.

/*
          +------------------+
          |   Credentials    |
          |------------------|
          | username:        |
          |  "bob1990"       |
          | password:        |
          |  "p@ssw0rd"      |
          +--------+---------+
                   |
                   v
               +--------+
               | Bcrypt |
               +--------+
               | Plain text password
               | is hashed through
               | an algorithm and
               | a "Salt".
               |
               | "p@ssw0rd"
               v
  91ef19df6bc9c88c5d99c9584797adee
                   |
                   v
       +-----------------------+
       |       Database        |
       +-----------------------+
       | id | username | password                         |
       |----|----------|----------------------------------|
       | 1  | "bob1990"| 91ef19df6bc9c88c5d99c9584797adee |
       +--------------------------------------------------+



*/