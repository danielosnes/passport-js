/*
As a superuser, 
one of the permissions you have is the ability to create new roles.
In postgreSQL, roles can either be /login roles/ or /group roles/
Login roles are used for most routine database activity.
Group roles typically do not have the ability to login themselves,
but can hold other roles as "members" and allow access to certain shared permissions.

The [CREATE ROLE] statement takes a series of arguments that modify the specific parameters around the newly-created user's permissions.
You can create a new login role using 
CREATE ROLE <name> WITH <list of permissions>;

For example:
CREATE ROLE sampleusr WITH NOSUPERUSER LOGIN;

Some of the most commonly used permissions are described below.
You can reference a full list of permissions available for [CREATE ROLE] here -> https://www.postgresql.org/docs/10/sql-createrole.html

Permission Name	Function
SUPERUSER	    Is the role a superuser?
CREATEROLE	    Is the role permitted to create additional roles?
CREATEDB	    Is the role able to create databases?
LOGIN	        Is the role able to login?
IN ROLE	        List of existing roles that a role will be added to as a new member.

Just like tables or schemas, roles can be altered.
As a superuser, you can use the same syntax as [CREATE ROLE] to [ALTER] an existing role.
The following statement alters a role [miriam], and gives them the ability to create new databases with [CREATEDB].

ALTER ROLE miriam WITH CREATEDB;

Sometimes, you may see [CREATE USER] on older versions of PostgreSQL,
[CREATE USER] is equivalent to [CREATE ROLE] except [CREATE USER] assumes [WITH LOGIN] while [CREATE ROLE] does not.
It's a better practice to use the more up to date syntax,
[CREATE ROLE] when using more recent PostgreSQL versions.
*/

/*
1.
Create a new role analyst that has the ability to login and no superuser privileges.

You can use the following SQL to create a new role; fill in the blanks to create the role described above.

CREATE ROLE <role name> WITH <list of permissions>;

Copy to Clipboard
----------------------------------------------------------------------------------------------------
CREATE ROLE analyst WITH NOSUPERUSER LOGIN;
----------------------------------------------------------------------------------------------------

*/

/*
2.
Create a new role named analyst_mgmt. This role should have the ability to login and create new roles, but should not be a superuser.

Fill in the SQL below to grant analyst_mgmt the correct permissions. The ability to create a new role can added with the permission CREATEROLE.

CREATE ROLE <role name> WITH <list of permissions>;

----------------------------------------------------------------------------------------------------
CREATE ROLE analyst_mgmt WITH NOSUPERUSER CREATEROLE LOGIN;
----------------------------------------------------------------------------------------------------

*/

/*
3.
Alter the role you just created, analyst_mgmt, to have the ability to create databases.

Fill in the SQL below to grant analyst_mgmt the correct permissions. The ability to create a new database can added with the permission CREATEDB.

ALTER ROLE <role name> WITH <name of permission>;

Copy to Clipboard
----------------------------------------------------------------------------------------------------
CREATE ROLE analyst_mgmt WITH NOSUPERUSER CREATEROLE LOGIN CREATEDB;
----------------------------------------------------------------------------------------------------

*/

/*
4.
Use the SQL below to confirm that analyst_mgmt has the elevated permissions we expect. If successful, we should see a new database user named wilson in the result of this query.

SET ROLE analyst_mgmt;

CREATE ROLE wilson WITH LOGIN;

SELECT * FROM pg_catalog.pg_roles 
ORDER BY rolname;

Copy to Clipboard

Run the SQL given in the prompt above. After running this code do you see a new user, wilson in the database?
----------------------------------------------------------------------------------------------------
SET ROLE analyst_mgmt;

CREATE ROLE wilson WITH LOGIN;

SELECT * FROM pg_catalog.pg_roles
ORDER BY rolname;
----------------------------------------------------------------------------------------------------
Query Results
rolname	rolsuper	rolinherit	rolcreaterole	rolcreatedb	rolcanlogin	rolreplication	rolconnlimit	rolpassword	rolvaliduntil	rolbypassrls	rolconfig	oid
analyst	f	t	f	f	t	f	-1	********	 	f	 	16399
analyst_mgmt	f	t	t	t	t	f	-1	********	 	f	 	16400
ccuser	t	t	t	t	t	t	-1	********	 	t	 	10
pg_monitor	f	t	f	f	f	f	-1	********	 	f	 	3373
pg_read_all_settings	f	t	f	f	f	f	-1	********	 	f	 	3374
pg_read_all_stats	f	t	f	f	f	f	-1	********	 	f	 	3375
pg_signal_backend	f	t	f	f	f	f	-1	********	 	f	 	4200
pg_stat_scan_tables	f	t	f	f	f	f	-1	********	 	f	 	3377
wilson	f	t	f	f	t	f	-1	********	 	f	 	16401
Database Schema
*/
/*

----------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------

*/

/*

----------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------

*/