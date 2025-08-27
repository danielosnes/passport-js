/*
When you create a new PostgreSQL database server there will be a single database and a single user. (both usually named postgres) available.
In PostgreSQL, you can run the following command to check the name of the current user:

SELECT current_user;

The [postgres] user (or any initial user) has the ability to create new databases, tables, users, etc.
In PostgreSQL the term for a user withthese types of permissions is [superuser].
A [superuser] bypasses all permission checks tha tother users face before being allowed to perform an action.
In these Codecademy lessons this user is often named [ccuser].

[superuser] privileges are not restricted to a single user.
In fact, the [superuser] designation can be passed along to any number of other users in the DB.
However, the [superuser] designation is a dangerous privilege and should be used sparingly.
In computing there is a rule called the principle of least privilege that suggest all applications and users should have only the minimum permissions required for their function.

To adhere to this principle in PostgreSQL, you'd want to ensure that:
- Most user's privileges are restricted.
- [superuser]s are not performing routine database tasks
- Specialized roles are not created with only the permissions they require.

In the remainder of the lesson we'll discuss how permissions can be set to enforce these standards in your database.
*/

/*
SELECT current_user;
*/

/*
Query Results
current_user
ccuser
Database Schema
*/