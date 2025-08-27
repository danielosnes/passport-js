/*
In addition to being used to manage who can login and create new databases and roles, roles are also used to manage what schemas and tables users can see and modify. 
Every table or schema in a PostgreSQL database has an owner that can set the permissions on their tables.

As a superuser or table or schema owner, you may use GRANT and REVOKE statements to modify these permissions at the schema and table level.

To use a schema, a role must have a permission called USAGE. Without USAGE a role cannot access tables within that schema. 
Other schema level permissions include CREATE and DROP, which allow the grantee the ability to create or remove tables in that schema respectively.

To interact with a table, a role must have USAGE on the table’s schema. 
Additionally, a table owner must also grant SELECT, UPDATE, DELETE, INSERT etc. on a specific table to define how that role can interact with the table.

Let’s examine what this looks like in practice. As the owner of the schema finance, 
perhaps you’d like to grant the ability to SELECT and UPDATE a table named finance.revenue to a user named analyst. 
You could accomplish this with the following:

1 - First by granding [USAGE] on the schema.
In this example, [analyst] is also granted the ability to [CREATE] new tables in the schema.

GRANT USAGE, CREATE ON SCHEMA finance TO analyst;

2 - Then by granting the table specific permissions.

GRANT SELECT, UPDATE ON finance.revenue TO analyst;

Notice that when granting permissions,
the specific permissions can be listeed successively as in the statements above.

Any [GRANT] statement can be reversed using quite similiar syntax.
First replacing [GRANT] with [REVOKE] and [TO] to [FROM].
FOr example to revoke the ability to [UPDATE] given above,
the owner of the table could use the following statement:

REVOKE UPDATE ON finance.revenue FROM analyst;
*/

/*
1.
Write the SQL statement that grants the analyst role USAGE and CREATE on the marketing schema.

You can list multiple permissions following GRANT. Try filling out the SQL below to allow this user to access and create tables in marketing.

GRANT CREATE, <permission name> ON SCHEMA <schema name> TO <role name>;
----------------------------------------------------------------------------------------------------
GRANT USAGE, CREATE ON SCHEMA marketing TO analyst;
----------------------------------------------------------------------------------------------------

*/

/*
2.
Write the SQL statement that grants SELECT, INSERT, and DELETE on the table marketing.prospects to analyst.

You can list multiple permissions following GRANT. Try filling out the SQL below to allow this user to select, insert, and delete on marketing.prospects

GRANT <list of permissions> ON <table name> TO <role name>;

Copy to Clipboard
----------------------------------------------------------------------------------------------------
GRANT SELECT, INSERT, DELETE ON marketing.prospects TO analyst;
----------------------------------------------------------------------------------------------------

*/

/*
.
Write the SQL statement that revokes DELETE on the table marketing.prospects from analyst

Revoking permissions can be accomplished by replacing a GRANT with the equivalent REVOKE statement. Complete the SQL below to revoke these permissions.

REVOKE DELETE ON <table name> FROM analyst;

Copy to Clipboard
----------------------------------------------------------------------------------------------------
REVOKE DELETE ON marketing.prospects FROM analyst;
----------------------------------------------------------------------------------------------------

*/

/*
Run the SQL below that SETs your role into analyst and tries to delete from marketing.prospects. Is this query successful?

SET ROLE analyst;

DELETE FROM marketing.prospects WHERE id = 2;

Copy to Clipboard

Use the SQL given in the prompt. If permissions have been set correctly, analyst will not be able to DELETE rows from this table.
----------------------------------------------------------------------------------------------------
DELETE FROM marketing.prospects WHERE id = 2;
----------------------------------------------------------------------------------------------------
ERROR:  permission denied for relation prospects
*/

/*

----------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------

*/

/*

----------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------

*/