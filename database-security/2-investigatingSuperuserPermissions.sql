/*
As a superuser you may want to check the permissions of users in your database to ensure that they have access to only what they need.
The following tables and columns are particularly useful for understanding the stand of any user's permissions:

[pg_catalog.pg_roles] 
    - A listing of all users in the database and a description of what special permissions these users have

Column Name	    Description
usename	        role name
usecreatedb	    Does the user have `CREATEDB` privileges?
usesuper	    Does the user have `SUPERUSER` privileges?

[information_schema.table_privileges]
    - description of the permissions a user (grantee) has on a table
    This table can be used to answer questions about who can [SELECT], [INSERT], [UPDATE], etc values on a table.

You don't need all the columns in this table to understand what permissions apply to a user on the table.
To illustrate how to interpret this table, let's look at an example below.

SELECT grantor, grantee, table_schema, table_name, privilege_type
FROM information_schema.table_privileges
WHERE grantee = 'userB';

grantor	grantee	table_schema	table_name	privilege_type
userA	userB	finance	        sales	    SELECT
userA	userB	finance	        sales	    UPDATE

Each row of this response corresponds to a single permission.
The name of the privilege is shown in the [privilege_type] column.
The [grantor] column tells us name of that role that originally granted the privilege.
Overall, this output tells us that [userB] has been given the ablility to [SELECT] and [UPDATE] on a table named [finance.sales] by [userA].

Alternatively, as a superuser, you can use [SET ROLE] to mimic thr permissions of other users.
For example, if a superuser runs [SET ROLE <test role>]  and then attempts to perform an action that role couldn't,
they'd receive the following message indicating tha tthey don't have permission:

ERROR:  permission denied for schema <schema name>

This behavior is identical to connected to the database with that role from the start.
As superuser, you can run [SET ROLE <superuser role>] to regain all superuser privileges.
*/

/*
1.
Several users have been created in the database. Write a query on pg_catalog.pg_roles that returns the names (column: rolname) of all the roles in the database.

pg_catalog.pg_roles contains a row for each role in a database. To get each role’s name, fill the SELECT statement below that pulls the rolname column from pg_catalog.pg_roles.

SELECT ____
FROM pg_catalog.pg_roles;

----------------------------------------------------------------------------------------------------

SELECT * FROM pg_catalog.pg_roles;

----------------------------------------------------------------------------------------------------

Query Results
rolname	rolsuper	rolinherit	rolcreaterole	rolcreatedb	rolcanlogin	rolreplication	rolconnlimit	rolpassword	rolvaliduntil	rolbypassrls	rolconfig	oid
pg_signal_backend	f	t	f	f	f	f	-1	********	 	f	 	4200
analyst	f	t	f	f	t	f	-1	********	 	f	 	16386
ccuser	t	t	t	t	t	t	-1	********	 	t	 	10
pg_read_all_stats	f	t	f	f	f	f	-1	********	 	f	 	3375
pg_monitor	f	t	f	f	f	f	-1	********	 	f	 	3373
pg_read_all_settings	f	t	f	f	f	f	-1	********	 	f	 	3374
pg_stat_scan_tables	f	t	f	f	f	f	-1	********	 	f	 	3377
Database Schema
event_log
name	type
id	integer
event_date	date
description	text
Rows: 1
*/

/*
2.
Let’s test the permissions of the user named analyst. Set your current session to the role analyst.

You can use the statement below to switch your current session to another role.

SET ROLE <role name>;

Copy to Clipboard
----------------------------------------------------------------------------------------------------
/* task 2 */
SET ROLE analyst;
----------------------------------------------------------------------------------------------------

Query Results
rolname	            rolsuper	rolinherit	rolcreaterole	rolcreatedb	rolcanlogin	rolreplication	rolconnlimit	rolpassword	    rolvaliduntil	rolbypassrls	rolconfig	oid
pg_signal_backend	f	        t	            f	        f	        f	        f	            -1	            ********	 	                f	 	                    4200
analyst	f	t	f	f	t	f	-1	********	 	f	 	16386
ccuser	t	t	t	t	t	t	-1	********	 	t	 	10
pg_read_all_stats	f	t	f	f	f	f	-1	********	 	f	 	3375
pg_monitor	f	t	f	f	f	f	-1	********	 	f	 	3373
pg_read_all_settings	f	t	f	f	f	f	-1	********	 	f	 	3374
pg_stat_scan_tables	f	t	f	f	f	f	-1	********	 	f	 	3377
Database Schema
event_log
name	type
id	integer
event_date	date
description	text
Rows: 1
*/
/*
3.
Write a query that returns grantee, table_name, and privilege_type from table information_schema.table_privileges where grantee is 'analyst'. This will show all permissions that analyst has on tables in this DB. Can analyst select from event_log?

The column grantee of information_schema.table_privileges can be used to filter permissions by role. Try completing the SQL below to filter the table to see analyst‘s permissions.

SELECT <list of columns> 
FROM information_schema.table_privileges 
WHERE grantee = <role name>;
----------------------------------------------------------------------------------------------------
/* task 3 */
SELECT grantee, table_name, privilege_type
FROM information_schema.table_privileges
WHERE grantee = 'analyst';
----------------------------------------------------------------------------------------------------
rolname	rolsuper	rolinherit	rolcreaterole	rolcreatedb	rolcanlogin	rolreplication	rolconnlimit	rolpassword	rolvaliduntil	rolbypassrls	rolconfig	oid
pg_signal_backend	f	t	f	f	f	f	-1	********	 	f	 	4200
analyst	f	t	f	f	t	f	-1	********	 	f	 	16386
ccuser	t	t	t	t	t	t	-1	********	 	t	 	10
pg_read_all_stats	f	t	f	f	f	f	-1	********	 	f	 	3375
pg_monitor	f	t	f	f	f	f	-1	********	 	f	 	3373
pg_read_all_settings	f	t	f	f	f	f	-1	********	 	f	 	3374
pg_stat_scan_tables	f	t	f	f	f	f	-1	********	 	f	 	3377
grantee	table_name	privilege_type
analyst	event_log	SELECT
Database Schema
event_log
name	type
id	integer
event_date	date
description	text
Rows: 1
*/
/*
4.
Still using the role, analyst, run the following statement SELECT * FROM event_log WHERE id = 1;. What does the database return? Does this match your expectation?

Run the SQL statement given above, can analyst access event_log?
----------------------------------------------------------------------------------------------------
/* task 4 */
SELECT * FROM event_log WHERE id = 1;
----------------------------------------------------------------------------------------------------

Query Results
rolname	rolsuper	rolinherit	rolcreaterole	rolcreatedb	rolcanlogin	rolreplication	rolconnlimit	rolpassword	rolvaliduntil	rolbypassrls	rolconfig	oid
pg_signal_backend	f	t	f	f	f	f	-1	********	 	f	 	4200
analyst	f	t	f	f	t	f	-1	********	 	f	 	16386
ccuser	t	t	t	t	t	t	-1	********	 	t	 	10
pg_read_all_stats	f	t	f	f	f	f	-1	********	 	f	 	3375
pg_monitor	f	t	f	f	f	f	-1	********	 	f	 	3373
pg_read_all_settings	f	t	f	f	f	f	-1	********	 	f	 	3374
pg_stat_scan_tables	f	t	f	f	f	f	-1	********	 	f	 	3377
grantee	table_name	privilege_type
analyst	event_log	SELECT
id	event_date	description
1	2020-01-01	Test Event
Database Schema
event_log
name	type
id	integer
event_date	date
description	text
Rows: 1
*/
/*

----------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------

*/