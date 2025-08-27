/*
Sometimes we'll want more fine grained permissions that at the table or schema level.
For example, consider a table ([projects]) with the format below:

project_code	project_name	        project_status	budget_target
C001	        Conglomo Consulting	    Active	        100000

If we'd like a role to be able to see all columns from this table except for [budget_target], 
we might consider splitting [projects] into multiple tables.
One table ([projects_budgets]) that contains [project_code] and [budget_target] and another ([budget_names]) that includes [project_code], [project_name] and [project_status].
From there, we could grant permissions on [project_names] and restrict access to [project_budgets].

Luckily we don't need to go through this process.
PostgreSQL offers the ability to write [GRANT] statements that specify specific columsn for a set of permissions to apply to.
Consider the following example:

GRANT SELECT (project_code, project_name, project_status) 
ON projects TO employees;

With these permissions in place when a member of [employees] attempts to [SELECT] on [projects],
the server checks if they have access to all the requested columns. 
For example, if [employees] executes the following, an error would be returned [permission denied for table projects]

SELECT *
FROM projects LIMIT 1;

This is because [*] includes [budget_target],
a column that [employees] doesn't have access to.
When the query is changed to the following, no error is thrown, because the query doesn't request any restricted columns.

SELECT project_code, project_status
FROM projects LIMIT 1;

project_code        project_status
C001                Active
*/

/*
1.
Write the GRANT statement that allows a role named manager to SELECT on the table projects. You can assume manager already has USAGE on the schema, but no permissions defined on projects yet.

To do this you’ll need to write a GRANT statement, fill in the SQL below to grant SELECT on the table:

GRANT SELECT ON <table name> TO <role name>;

Copy to Clipboard
----------------------------------------------------------------------------------------------------
GRANT SELECT ON TABLE projects TO manager;
----------------------------------------------------------------------------------------------------

*/

/*
2.
Write the statement that will allow the role manager to UPDATE on project_name and project_status, but not the other columns of the table.

You can use GRANT and then specify the columns that the permission type, UPDATE, applies to.

GRANT UPDATE (<column name>, <column name>) ON <table name> TO <role name>;

Copy to Clipboard
----------------------------------------------------------------------------------------------------
GRANT UPDATE (project_name, project_status) ON projects TO manager;
----------------------------------------------------------------------------------------------------

*/

/*
3.
Let’s confirm that the update to permissions was effective. Write a query that returns all rows from information_schema.column_privileges where manager is the grantee.

Which columns can a manager UPDATE?

Fill in the SQL below to return all the column permissions for manager.

select rolname 
from <table name>
where grantee = <role name>;

----------------------------------------------------------------------------------------------------
SELECT * 
FROM information_schema.column_privileges
WHERE grantee = 'manager';
----------------------------------------------------------------------------------------------------

*/

/*

----------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------

*/