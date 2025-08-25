/*
According to Wikipedia, "a database trigger is a procedural code that is automatically executed in response to certain events on a particular table or view in a database.
The trigger is mostly used for maitaining the integrity of the information on the database."

In practical terms, what does that mean for you though?
What that means is that when you want something to happen every time, someone makes a specific change to a table or biew,
a trigger is placed on that table or view.
That trigger will call a function when the conditions for the trigger are met.

You may be asking yourself,
why would you want to have something happen without the caller specifically asking for it and possible happenign without their knowledge?
In short,
adding a trigger saves people from forgetting to do that action,
and ensures consistent rules are applied.

Of course nothing comes without a cost.
Triggers have overhead and there might be time when you don't want  it to fire and you have to work around it.
But if properly designed,
these situations should be rare
- often in very specific situations there is a valid reason to make the exception.

Instructions
Checkpoint 1 Passed
1.
A trigger has already been built in this exercise behind the scenes for you. What you are going to do in this exercise is activate this trigger and see the impact it has on your data.

First check the starting state of the customers table before we make any changes. A SELECT * on this table will be good.

Your script should look like:

SELECT * FROM <table_name>;

Copy to Clipboard

where <table_name> = customers

Checkpoint 2 Passed
2.
Write an UPDATE statement on the customers table to SET the years_old column to 42 for any customer with a last_name of Hall.

Your script should look like:

UPDATE <table_name>
SET <target_column_name> = 42
WHERE <column_name> = 'Hall';

Copy to Clipboard

where

<table_name> = customers
<target_column_name> = years_old
<column_name> = last_name
Checkpoint 3 Passed
3.
Write your SELECT statement again after your UPDATE statement and notice that more changed than what you had in your UPDATE statement. A trigger made this additional change.

You want to do a SELECT * on the customers table, before and after your UPDATE statement. You will need all three, SELECT, UPDATE, and SELECT for the test to confirm your work.

Your script should look like:

SELECT * FROM <table_name>;

Copy to Clipboard

where <table_name> = customers

//task 1
SELECT * FROM customers;

//task 2
UPDATE customers SET years_old = 42 WHERE last_name = 'Hall';

//task 3
SELECT * FROM customers;

Query Results
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	82
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	10
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	21
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	82
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	10
3	HIDDEN	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	42
Database Schema
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