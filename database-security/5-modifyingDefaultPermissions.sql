/*
To make managing permissions easier, PostgreSQL introduced a feature called default permissions.
With default permissions, a super user can set permissions to be updated automatically when new objects are created in a schema?

Let's work through an example.
Perhaps we want to allow a role named [analyst] to be able to [SELECT] on all tables in a schema,
[finance], regardless if they're the owner or not.

Default permissions only apply to objects after the defaults are set, 
so we still need to ensure the following [GRANT] statements have given the role access to the schema and the tables that already exist are in the schema.

GRANT USAGE ON finance TO analyst;

GRANT SELECT ON ALL TABLES IN finance TO analyst;

Without default privileges, anytime another user creates a table,
that user or a superuser would need to execute [GRANT SELECT ON <table> TO analyst] before [analyst] could interact with the table.
With default permissions, this process becomes much smoother.
The following statement would allow [analyst] to [SELECT] on all newly-created tables in [finance] immediately after another user has created them.

ALTER DEFAULT PRIVILEGES IN SCHEMA finance GRANT SELECT ON TABLES TO analyst;

Default permissions can be used to set permissions at the database level as well.
For example, replacing [IN SCHEMA finance] with [IN DATABASE <database name>] in the query above would apply default permissions across a whole DB.
In general, any permissions that could otherwise be set with a [GRANT] statement can be applied to newly created objects with [ALTER DEFAULT PRIVILEGES].

However, there is not an equivalent to [ALTER DEFAULT PRIVILEGES] statement in all SQL databased 
- if you're working on an older PostgreSQL system or with another database server you may still need to set permissions manually.
*/

/*
1.
Grant a role named writer the ability to SELECT, DELETE, UPDATE, and INSERT on a table named census.economic_survey. You may assume that the role already has USAGE on the schema.

To add multiple permissions in a single query, you can include all required permissions following GRANT. Fill in the SQL below to grant this user SELECT, DELETE, UPDATE, and INSERT.

GRANT <list of required permissions> ON census.economic_survey TO <role name>;
----------------------------------------------------------------------------------------------------
GRANT SELECT, DELETE, UPDATE, INSERT ON census.economic_survey TO writer;
----------------------------------------------------------------------------------------------------

*/

/*
2.
This schema will soon be populated with many tables containing data from other census surveys. Modify the DEFAULT PRIVILEGES so that SELECT, DELETE, UPDATE, and INSERT are granted to writer on newly created tables in the census schema.

Fill in the blanks in the SQL below to alter the default privileges on this schema.

ALTER DEFAULT PRIVILEGES IN SCHEMA <schema name>
GRANT <list of permissions> ON TABLES TO <role name>;

Copy to Clipboard
----------------------------------------------------------------------------------------------------
ALTER DEFAULT PRIVILEGES IN SCHEMA census GRANT SELECT, DELETE, UPDATE, INSERT ON TABLES TO writer;
----------------------------------------------------------------------------------------------------

*/
/*
3.
Use the SQL given below to create a new table in the census schema. If we’ve set default permissions properly, then the permissions we just defined will automatically apply to this table as well:

CREATE TABLE census.housing_survey (
    area_id int primary key, 
    median_rent int
);

Copy to Clipboard

Run the SQL given in the prompt above to create a new table in census.
----------------------------------------------------------------------------------------------------
CREATE TABLE census.housing_survey (
    area_id int primary key, 
    median_rent int
);
----------------------------------------------------------------------------------------------------

*/

/*
4.
Let’s confirm that altering the default privileges has had the desired effect. Now that census.housing_survey has just been created, run the query below to confirm that all privileges appear in information_schema.table_privileges.

SELECT
    grantee, 
    table_schema,
    table_name,
    privilege_type
FROM information_schema.table_privileges 
WHERE table_schema  = 'census'
AND grantee = 'writer';

Copy to Clipboard

Run the SQL given in the prompt above to confirm that our default privileges have taken effect.
----------------------------------------------------------------------------------------------------
SELECT
    grantee, 
    table_schema,
    table_name,
    privilege_type
FROM information_schema.table_privileges 
WHERE table_schema  = 'census'
AND grantee = 'writer';

----------------------------------------------------------------------------------------------------

*/