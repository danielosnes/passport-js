/*
In the previous exercise, we discussed how column level security can be used to manage permission on specific columns in a table.
PostgreSQL has a feature called Row-Level Security (RLS) that allows developers to define permissions on individual rows.

Row Level permissions act as an additional later of security beyond schema and table level permissions.
To access (or modify) information from a table with RLS, a row-specific condition must be met.

For example, let's say we wanted to create a system where all salespeople (in a group role [sales]) can view their contracts in a table called [contracts].
Without RLS, any user can [SELECT] contracts belonging to another salesperson.

salesperson	client	    contract_start	contract_end	contract_amt
alice	    conglomo	2021-01-01	    2022-12-31	    100000
bob	        mega co.	2020-03-01	    2021-06-30	    140000

There are a few steps required to enable RLS.
First, we create a policy using a [CREATE POLICY] statement.
The syntax can be a bit tricky  - Here's the full reference for the [CREATE POLICY] -> https://www.postgresql.org/docs/10/sql-createpolicy.html

CREATE POLICY emp_rls_policy ON accounts FOR SELECT TO sales USING (salesperson=current_user);

The statement above does the following:
- Creates RLS policy [ON] a table ([accounts]) and specifies the permissions type the policy applies to.
- Specifies the role ([sales]) this policy applies to using [TO <role_name>].
- Specifies the condition to check before permitting a user to carry out an action.
    In this example, the policy is that the [current_user] must equal the value in that row's [salesperson] column.

The result of this statement is now we have an inactive policy named "emp_rls_policy" .
Next we need to enable RLS on the table the policy refers to.

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

With RLS enabled, if [bob] where to [SELECT * FROM accounts], they'd see only the row(s) where they're listed as the [salesperson].

salesperson	client	    contract_start	contract_end	contract_amt
bob	        mega co.	2020-03-01	    2021-06-30	    140000
*/

/*
1.
Create a policy on accounts for group role sales that enforces that the current user must match the salesperson before being able to DELETE rows. The name of the policy is not important.

Fill in the SQL below to create a new RLS policy.

CREATE POLICY sales_rls_policy ON <table name> FOR <permission type>
TO <role name> USING (salesperson = current_user);

----------------------------------------------------------------------------------------------------
CREATE POLICY emp_rls_policy ON accounts FOR SELECT TO sales USING (salesperson = current_user);
----------------------------------------------------------------------------------------------------

*/

/*
2.
ENABLE this policy on the table.

To enable RLS on a table you must write an ALTER TABLE statement. Fill in the SQL below to apply this rule to accounts

ALTER TABLE <table name> ENABLE ROW LEVEL SECURITY;

----------------------------------------------------------------------------------------------------
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
----------------------------------------------------------------------------------------------------

*/

/*
3.
Set role of the current session to alice

Recall from earlier in the lesson that the role of the current session can be changed using SET ROLE <role name>.
----------------------------------------------------------------------------------------------------
SET ROLE alice;
----------------------------------------------------------------------------------------------------

*/

/*
4.
As alice, run the SQL give below. Which rows do you think this query will effect? Does the table contain any rows with a contract_amt under 10000? Who is listed as the salesperson for these rows?

DELETE FROM accounts 
WHERE contract_amt < 10000;

SELECT * FROM accounts;

Copy to Clipboard

Run the SQL given in the prompt.

Bob’s rows weren’t deleted because Alice can only delete her own rows!
----------------------------------------------------------------------------------------------------
DELETE FROM accounts 
WHERE contract_amt < 10000;

SELECT * FROM accounts;
----------------------------------------------------------------------------------------------------

*/

/*

----------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------

*/

/*

----------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------

*/