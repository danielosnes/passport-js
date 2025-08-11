/****************************************************************************************************************************************************************/
/*
[bcrypt] is hashing #algorithm.
This means that you cannot easily retrieve the plaintext password without already knowing the salt, rounds, and key (password).

A hash function only works one-way, which means that once a value is hashed, it can't be unhashed.
This is different from encryption because, if you know which algorithm was used to encrypt a value,
you can use that same algorithm to decrypt it.

On a typical website, when a user first signs up, we retrieve their password and run it through a hashing algorithm.
The hashed password is then stored in the database.
Whenever the same user logs in, we hash the password they tried to log in with and compare it to the already stored hash value.
If the values match, the user is authenticated.

/*
  ================================
        Encryption & Decryption
  ================================

  +-------------+        +-------------+        +-------------+        +-------------+        +-------------+      
  |  Plain Text | --->   |    key      | --->   |  Encrypted  | --->   |    key      | --->   |  Plain Text | ---> 
  |             |        |             |        |     Text    |        |             |        |             |      
  +-------------+        +-------------+        +-------------+        +-------------+        +-------------+      



  ================================
           Hashing Algorithm
  ================================

  +-------------+     +----------------+     +-------------------------------+
  |  Plain Text | --> |  Hash Function  | --> |  Hashed Text                  |
  |             |     | (e.g. SHA256)   |     |  56857cfc709d3996f057252c16e  |
  +-------------+     +----------------+     |  c4656f529                     |
                                              +-------------------------------+


*/