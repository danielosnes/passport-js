/*
Let's finally look into that [FOR EACH ROW] part of our trigger.
When using [FOR EACH ROW], 
the trigger will fire and call the function for every row that is impacted by the related query.
The other option is to have it set to [FOR EACH STATEMENT].
[FOR EACH STATEMENT] calls the function in the trigger once for each query, not for each record.

This option might seem simplistic depending on the situation,
it could have large impacts on effeciency and data integrity.
For instance,
let's say you want ot put in a new column on all your sales records to account for inflation.
You have their historical [order_value] but you want [order_values_inflation_adjusted]
Depending on your table, this could be thousands or millions of records. 
If you have a trigger set as [FOR EACH ROW] and calls a small function, this could add up fast.

Aside from speed consideration,
there are very real possible logical differences.
Say your function is tracking the number of modifications for an audit purpose.
If you use [FOR EACH ROW] and deleted 10 records, 
your counter at the end would be 10 since it would increment your counter once for every row deleted.
However, if your function was set to [FOR EACH STATEMENT] then your counter would be at 1 and the end since it would only be called once your query finished.
This was a basic example for illustration,
but if you have cases where rows depend on each other,
then this option can have a very real logical impact.

Instructions
Checkpoint 1 Passed
1.
Start by SELECT * on customers table so we can confirm the starting state of our data.

Checkpoint 2 Passed
2.
Create a trigger called each_statement_trigger for the customers table that calls a function statement_function() on AFTER UPDATE. This time, however, use FOR EACH STATEMENT rather than FOR EACH ROW. This will make the trigger fire only once per query no matter how many rows you update.

statement_function() will insert a new row into our customers table. We’ll soon see this in action once we activate our trigger.

Checkpoint 3 Passed
3.
Let’s activate the trigger you just created to see what happens when we use FOR EACH STATEMENT. Let’s say someone forgot to update everyone’s ages last year. Let’s fix that by updating all of the records in your customers table by adding 1 to the years_old column.

Your script should look like:

UPDATE <table_name>
SET <column_name> = <column_name> + 1;

Copy to Clipboard

where

<table_name> = customers
<column_name> = years_old
Checkpoint 4 Passed
4.
Do a final SELECT * on the customers table and notice what happened.

A new record is created by the trigger! This is a great example of an audit trail. Normally this would go into a separate table identifying who did the change and when, but for simplicity, we simply added a dummy row to this table to show what can happen.

Your query should look like

SELECT *
FROM <table_name>;

Copy to Clipboard

where

<table_name> = customers
Checkpoint 5 Passed
5.
As a bonus (we won’t grade your code), try changing the FOR EACH STATEMENT to a FOR EACH ROW and run the script again and notice the change to the customers table. Why did this happen?

SELECT * FROM customers;

CREATE TRIGGER each_statement_trigger
AFTER UPDATE ON customers
FOR EACH STATEMENT
EXECUTE PROCEDURE statement_function();


UPDATE customers 
SET years_old = years_old + 1;

SELECT * FROM customers;


Query Results
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	82
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	10
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	21
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	83
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	11
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	22
4	statement	run	 	 	 	 	 
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
Rows: 4

SELECT * FROM customers;

CREATE TRIGGER each_statement_trigger
AFTER UPDATE ON customers
FOR EACH ROW
EXECUTE PROCEDURE statement_function();

UPDATE customers 
SET years_old = years_old + 1;

SELECT * FROM customers;

Query Results
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	82
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	10
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	21
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	83
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	11
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	22
4	statement	run	 	 	 	 	 
5	statement	run	 	 	 	 	 
6	statement	run	 	 	 	 	 
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
Rows: 6
*/