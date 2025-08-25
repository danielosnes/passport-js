/*
Let's take a look at when a trigger can be activated in relation to the query that activates it.
There are two common options: [BEFORE] and [AFTER].

We have already used [BEFORE] - this calls your trigger before the query that fired the trigger runs,
allowing you to apply the actions in the function previous to the query.
Specifically letting you modify the row that is being modified when using an [INSERT] or [UPDATE] like we did before.

[AFTER] occurs once the query finishes its work.
This allows your trigger to activate once the query it was activated by has finished its work.
This will not let you modify the row that is being modified as the process has already finished.
This is quite useful for logging purposes such as inserting into an audit table to track who did a change and when.

Instructions
Checkpoint 1 Passed
1.
Start by SELECT * on customers table so we can confirm the starting state of our data. Also do an ORDER BY on customer_id to ensure ease of comparison at the end.

Your query should look like

SELECT *
FROM <table_name>
ORDER BY <column_name>;

Copy to Clipboard

where

<table_name> = customers
<column_name> = customer_id
Checkpoint 2 Passed
2.
Let’s put into practice the example and create an AFTER trigger. Create one for the customers that will fire on UPDATE calling log_customers_change(). Name this trigger you are creating after_trigger.

log_customers_change() is a function that we wrote behind the scenes that will log the time a change is made to the customers table.

The trigger you are creating should look like:

CREATE TRIGGER <trigger_name>
AFTER UPDATE ON <table_name>
FOR EACH ROW
EXECUTE PROCEDURE <function_name>();

Copy to Clipboard

where

<trigger_name> = after_trigger
<table_name> = customers
<function_name> = log_customers_change
Checkpoint 3 Passed
3.
Let’s activate our trigger by writing an UPDATE. Let’s say the database had a customer’s age wrong. Run an UPDATE command on the customers table to increase the age (years_old) by 10 of the customer with customer_id = 1.

Your update script should look like:

UPDATE <table_name>
SET <column_name> = <column_name> + 10
WHERE <column_name_clause> = 1;

Copy to Clipboard

where

<table_name> = customers
<column_name> = years_old
<column_name_clause> = customer_id
Checkpoint 4 Passed
4.
Do a final SELECT * on customers table, notice what happened. Don’t forget to ORDER BY on customer_id. Add another SELECT * on customers_log so you can see the log that was created on your change.

As a note, the name of the change is the user id given in this tool (ccuser). In a production environment, you would have more specific user information on who made the change.

Your query should look like

SELECT *
FROM <table_name>
ORDER BY <column_name>;

SELECT *
FROM <log_table>

Copy to Clipboard

where

<table_name> = customers
<column_name> = customer_id
<log_table> = customers_log

SELECT * FROM customers ORDER BY customer_id;

CREATE TRIGGER after_trigger
  AFTER UPDATE ON customers
  FOR EACH ROW
  EXECUTE PROCEDURE log_customers_change();

UPDATE customers
SET years_old = years_old + 10
WHERE customer_id = 1;

SELECT * FROM customers ORDER BY customer_id;
SELECT * FROM customers_log;

Query Results
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	82
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	10
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	21
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	92
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	10
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	21
changed_by	time_changed
ccuser	2025-08-25 18:47:00
Database Schema
customers_log
name	type
changed_by	character varying
time_changed	timestamp without time zone
Rows: 1
customers
name	type
customer_id	integer
first_name	character varying
last_name	character varying
email_address	character varying
home_phone	character varying
city	character varying
state_name	character varying
years_old	integer
Rows: 3

*/