/*
As with many security measures, hashing isn't foolproof. 
How can an attacker discover what users' passwords are?

One common way to attempt cracking hashed passwords is through the use of rainbow tables.

#rainbowTables are large lookup databases that consist of pre-computed password-hash combinations which correlate plaintext passwords and their hashes.

Rainbow Tables are complex and consist of two different types of functions:
- A Hashing Function:
    Used by the table must match the hashed password you want to recover.
= A Reduction Function:
    Transform a hash into something usable as a password.
    However, its importable to understand that the reduction function doesn't reverse the hash value,
    so it doesn't output the original plaintext (the password),
    because this isn't possible,
    but instead outputs a completely new one.

In essence, rainbow tables are massive lookup tables that can crack complex passwords significantly faster than using traditional password cracking methods.

So what are some measure we can take to protect ourselves from rainbow table attacks?
One common technique is  the use of salts.
A salt is a random value that is added to the input of a hashing function 
in order to making each password hash unique even in the instance of two users choosing the same passwords.
Salts help us mitigate hash table attacks by forcing attackers to re-compute them using the salts for each user.

/*
================================================================================================================
|         Without a Salt                                |               With a Salt                            |
================================================================================================================
| Password: "p@ssw0rd"                                  | Password: "p@ssw0rd" + Salt: "abc"                   |
|                                                       |                                                      |
|      +-------------+                                  |      +-------------+                                 |
|      | Hash        |                                  |      | Hash        |                                 |
|      | Function    |                                  |      | Function    |                                 |
|      +------+------+                                  |      +------+------+                                 |
|             |                                         |             |                                        |
|             v                                         |             v                                        |
|  Hash in Database:                                    |  Hash in Database:                                   |
|  0f359740bd1cda994f8b55330c86d845                      |  91ef19df6bc9c88c5d99c9584797adee                   |
|                                                       |                                                      |
|       Rainbow Table                                   |       Rainbow Table                                  |
|       MATCH                                           |       NO MATCH                                       |
|  +--------------+   +--------------------------------+|  +--------------+   +--------------------------------+
|  | "p@ssw0rd"   |   | 0f359740bd1cda994f8b55330c86d845|   | "p@ssw0rd"   |   | 0f359740bd1cda994f8b55330c86d845|
|  +--------------+   +--------------------------------+|  +--------------+   +--------------------------------+
================================================================================================================

*/
/****************************************************************************************************************************************************************/