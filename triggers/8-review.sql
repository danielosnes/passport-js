/*
Database Triggers
Review
3 min
In this lesson on triggers in PostgreSQL we covered how:

Triggers are associated with a specific table, view or foreign table.
Triggers execute a specified function when certain operations are performed on the table (INSERT, UPDATE, DELETE, TRUNCATE).
Triggers can run before, after or instead of the operation attempts to alter the row.
A trigger set FOR EACH ROW is called once for every row modified.
FOR EACH STATEMENT executes once for the entire operation (0 modified rows would still trigger this).
Triggers can specify a boolean WHEN condition to see when they should be fired.
Multiple triggers of the same kind can exist on the same table. If so they are triggered in alphabetical order.
SELECT statements do not modify rows so no trigger can be set on a SELECT statement.
One SQL command can trigger more than one kind of trigger.
Use the DROP TRIGGER command to remove a trigger.
You can query the information_schema.triggers table to get a list of triggers in the system.

Instructions
Checkpoint 1 Passed
1.
You can use the workspace here to experiment with what you have learned about triggers. The tables you have to work with are the customers and customers_log tables. As a tip, for the customers table, when you SELECT * an ORDER BY customer_id might be helpful.

Three functions have been created named function_1, function_2, and function_3. See if you can figure out what each does based on how you set up your triggers to call them.

Note, they were given terrible names on purpose to not give away their purpose and let you discover through experimentation. As a hint, you have used all of these functions during this lesson in previous exercises — the names have just been changed to make them mysterious.

Here’s an example trigger creation as a reminder:

CREATE TRIGGER <trigger_name>
    BEFORE UPDATE ON <table_name>
    FOR EACH ROW
    EXECUTE PROCEDURE <function_name>();

Copy to Clipboard

Don’t forget, if you write a trigger for each function, and those triggers activate on the same action, say an UPDATE, all three functions will run when you update the table.

Have fun! You can check the hint for the answer to what the functions do.

function_1() inserts a new record into the customer table with a very generic first/last name.
function_2() changes the first name of the row modified to ‘HIDDEN’.
function_3() logs the user that made a change to the table in the customers_log table

SELECT * FROM customers ORDER BY customer_id;

CREATE TRIGGER function_2
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE PROCEDURE function_2();

  Query Results
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	82
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	10
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	21
Database Schema
customers_log
name	type
changed_by	character varying
time_changed	timestamp without time zone
Rows: 0
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

/*
1.
Before we get started, take a moment to familiarize yourself with the database. There are two tables we will be working with: customers and customers_log. To make your life easier we would recommend ordering the customers table by customer_id.

SELECT *
FROM <table_1>
ORDER BY <column_1>;

SELECT *
FROM <table_2>;

Copy to Clipboard

Where

<table_1> = customers
<column_1> = customer_id
<table_2> = customers_log
Update Triggers
2.
Your boss has tasked you with creating a trigger to log anytime someone updates the customers table. There is already a procedure to insert into the customers_log table called log_customers_change(). This function will create a record in customers_log and we want it to fire anytime an UPDATE statement modifies first_name or last_name. Give the trigger an appropriate name. Are there other situations you might suggest creating triggers for as well?

To the question: are there other situations you might suggest? Yes, any modification to the records to the table might want to be tracked, so INSERT, DELETE and TRUNCATE should all be considered as well as UPDATE.

Your trigger should look like:

CREATE TRIGGER <trigger_name>
    BEFORE UPDATE ON <table_name>
    FOR EACH ROW
    EXECUTE PROCEDURE <procedure_name>();

Copy to Clipboard

Where

<trigger_name> = customer_updated
<table_name> = customers
<procedure_name> = log_customers_change
3.
Can you confirm your trigger is working as expected? Remember, it should only create a log for changes to first_name and/or last_name. We know what the state of the customers and customers_log tables are from our previous check so we can go directly to testing your trigger.

Your script should look like:

UPDATE <table_1>
SET <column_1> = 'Steve'
WHERE <column_2> = 'Hall';

SELECT *
FROM <table_1>
ORDER BY <column_3>;

SELECT *
FROM <table_2>;

Copy to Clipboard

Where

<table_1> = customers
<column_1> = first_name
<column_2> = last_name
<column_3> = customer_id
<table_2> = customers_log
4.
You should also check when you expect it to NOT create a record in customers_log as well as when you would expect it to. Since we confirmed the state of the two tables at the end of our first task, we don’t need to check the starting state again, we can jump right to the modification. Confirm no log is created when modifying a column not covered by the trigger function.

Your script should look something like this. Notice that we are resetting a value in the years_old column — we expect to not get a new line in the customers_log table since we’re not updating first_name or last_name.

UPDATE <table_1>
SET <column_1> = 10
WHERE <column_2> = 'Hall';

SELECT *
FROM <table_1>
ORDER BY <column_3>;

SELECT *
FROM <table_2>;

Copy to Clipboard

Where

<table_1> = customers
<column_1> = years_old
<column_2> = last_name
<column_3> = customer_id
<table_2> = customers_log
Insert Triggers
5.
You suggested to your boss that INSERT statements should also be included (you had also suggested DELETE and TRUNCATE be covered as well, but legal thought this wasn’t needed for some reason). They agreed, but thought that tracking every row for inserts wasn’t necessary — a single record of who did the bulk insert would be enough. Create the trigger to call the log_customers_change procedure once for every statement on INSERT to the customers table. Call it customer_insert.

If you are interested in how the function works, see the hint.

Your script should look like:

CREATE TRIGGER <trigger_name>
    AFTER INSERT ON <table_name>
    FOR EACH STATEMENT
    EXECUTE PROCEDURE<procedure_name>();

Copy to Clipboard

Where

<trigger_name> = customer_insert
<table_name> = customers
<procedure_name> = log_customers_change
The function log_customers_change has different logic built into it to handle both INSERT and UPDATE statements, and unlike UPDATES where it only logs when the name is changed, every INSERT gets logged. Here is the code:

CREATE OR REPLACE FUNCTION log_customers_change() RETURNS TRIGGER AS $$
    BEGIN
        IF (TG_OP = 'UPDATE') THEN
            IF (NEW.first_name <> OLD.first_name OR NEW.last_name <> OLD.last_name) THEN
                INSERT INTO customers_log (changed_by, time_changed, change_type) VALUES (User, DATE_TRUNC('minute',NOW()), 'UPDATE');
            END IF;
        END IF;
        IF (TG_OP = 'INSERT') THEN
            INSERT INTO customers_log (changed_by, time_changed, change_type) VALUES (User, DATE_TRUNC('minute',NOW()), 'INSERT');
        END IF;
        RETURN NEW;
    END;
$$ LANGUAGE PLPGSQL;

Copy to Clipboard

6.
Add three names to the customers table in one statement. Is your trigger working as expected and only inserting one row per insert statement, not per record? What would the log look like if you had your trigger fire on every row?

To complete these steps you’ll need to do the following:

Use INSERT INTO customers to add three records to the customers table. For example, one record could look like ('Jeffrey','Cook','Jeffrey.Cook@example.com','202-555-0398','Jersey city','New Jersey',66)
SELECT * for the customers table and ORDER BY customer_id
SELECT * for the customers_log table.
INSERT INTO <table_1> (<column_1>,<column_2>,<column_3>)
VALUES
    ('Jeffrey','Cook',66),
    ('Arthur','Turner',49),
    ('Nathan','Cooper',72);

SELECT *
FROM <table_1>
ORDER BY <column_4>;

SELECT *
FROM <table_2>;

Copy to Clipboard

Where

<table_1> = customers
<column_1> = first_name
<column_2> = last_name
<column_3> = years_old
<column_4> = customer_id
<table_2> = customers_log
Conditionals on your Triggers
7.
Your boss has changed their mind again, and now has decided that the conditionals for when a change occurs should be on the trigger and not on the function it calls.

In this example, we’ll be using the function override_with_min_age(). The trigger should detect when age is updated to be below 13 and call this function. This function will assume this was a mistake and override the change and set the age to be 13. Name your trigger something appropriately, we called ours customer_min_age. What will happen with the customers and customers_log tables?

Your script should look like:

CREATE TRIGGER <trigger_name>
    BEFORE UPDATE ON <table_name>
    FOR EACH ROW
    WHEN (NEW.<column_name> < 13)
    EXECUTE PROCEDURE <procedure_name>();

Copy to Clipboard

Where:

<trigger_name> = customer_min_age
<table_name> = customers
<column_name> = years_old
<procedure_name> = override_with_min_age
You should notice that the customers age that was set to under 13 was overridden by your trigger and their age was set to 13. You should also notice that no record was added to the log table, if you remember, the UPDATE trigger for adding to the log is only when the first_name and/or last_name is modified, we did neither here.

8.
Let’s test this trigger — two more changes to the customers table have come in. Modify one record to set their age under 13 and another over 13, then check the results in the customers and customers_log table. Note, setting it to exactly 13 would still work, it would just be harder to confirm your trigger was working as expected. What do you expect to happen and why?

UPDATE <table_1>
SET <column_1> = 12
WHERE <column_2> = 'Campbell';

UPDATE <table_1>
SET <column_1> = 24
WHERE <column_2> = 'Cook';

SELECT *
FROM <table_1>
ORDER BY <column_3>;

SELECT *
FROM <table_2>;

Copy to Clipboard

Where

<table_1> = customers
<column_1> = years_old
<column_2> = last_name
<column_3> = customer_id
<table_2> = customers_log
9.
What would happen if you had an update on more columns at once, say modifications to the first_name and years_old in the same query? Try this now then run your check on customers (with the order we have been using) and customers_log.

Your script should look like:

UPDATE <table_1>
SET <column_1> = 9,
    <column_2> = 'Dennis'
WHERE <column_3> = 'Hall';

SELECT *
FROM <table_1>
ORDER BY <column_4>;

SELECT *
FROM <table_2>;

Copy to Clipboard

Where

<table_1> = customers
<column_1> = years_old
<column_2> = first_name
<column_3> = last_name
<column_4> = customer_id
<table_2> = customers_log
Trigger Cleanup
10.
Though your trigger setting the years_old to never be under 13 is working, a better way to do the same thing would be with a constraint on the column itself. For now, let’s remove the trigger we created to set the minimum age. Ours was called customer_min_age.

To drop a trigger your sql should look like:

DROP TRIGGER IF EXISTS <trigger_name> ON <table_name>;

Copy to Clipboard

Where

<trigger_name> = customer_min_age
<table_name> = customers
Then check the status of the triggers after your change.

SELECT * FROM information_schema.triggers;

Copy to Clipboard

11.
Take a look at the triggers on the system to ensure your removal worked correctly.

Remember, to find the triggers currently on a server you need to SELECT * on the information_schema.triggers table.

Have fun!
12.
Feel free to play around with this data set to practice your trigger knowledge.

/* task 1 part 1 */
SELECT * FROM customers ORDER BY customer_id;
/* task 1 part 2 */
SELECT * FROM customers_log;

/* task 2 part 1 */
CREATE TRIGGER customer_updated
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE PROCEDURE log_customers_change();
/* task 3 part 1 */
UPDATE customers
/* task 4 part 1  to change from Steve to 10 */
SET years_old = 10
WHERE last_name = 'Hall';
/* task 3 part 2*/
SELECT * FROM customers ORDER BY customer_id;
/* task 3 part 3*/
SELECT * FROM customers_log;
/* task 5 part 1 */
CREATE TRIGGER customer_insert
  AFTER INSERT ON customers
  FOR EACH STATEMENT
  EXECUTE PROCEDURE log_customers_change();
/* task 5 part 1 */
INSERT INTO customers (first_name, last_name, email_address, home_phone, city, state_name, years_old) VALUES ('Jeffrey','Cook','Jeffrey.Cook@example.com','202-555-0398','Jersey city','New Jersey', 66), 
('Firstname', 'Lastname', 'email@example.com', '123-456-7890', 'City City', 'State Name', 99), 
('First', 'Last', 'email@emailexample.com', '098-765-4321', 'Town Town', 'State Farm', 33);
/* task 5 part 2 */
SELECT * FROM customers ORDER BY customer_id;
/* task 5 part 3 */
SELECT * FROM customers_log;
/* task 7 part 1 */
CREATE TRIGGER customer_min_age
  BEFORE UPDATE ON customers
  FOR EACH ROW
  WHEN (NEW.years_old < 13)
  EXECUTE PROCEDURE override_with_min_age();
/* task 8 part 1 */
UPDATE customers
SET years_old = 12
WHERE customer_id = 1;
/* task 8 part 2 */
UPDATE customers
SET years_old = 14
WHERE customer_id = 2;
/* task 8 part 3 */
SELECT * FROM customers ORDER BY customer_id;
/* task 8 part 4 */
SELECT * FROM customers_log;
/* task 9 part 1 */
UPDATE customers
SET years_old = 9,
    first_name = 'Dennis'
WHERE last_name = 'Hall';
/* task 9 part 2 */
SELECT * FROM customers ORDER BY customer_id;
/* task 9 part 3 */
SELECT * FROM customers_log;
/* task 10 part 1 */
DROP TRIGGER IF EXISTS customer_min_age ON customers;
/* task 10 part 2 */
SELECT * FROM information_schema.triggers;
/* task 11 part 1 */
SELECT * FROM information_schema.triggers;



Query Results
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	82
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	10
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	21
changed_by	time_changed	change_type
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	82
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	10
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	10
changed_by	time_changed	change_type
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	82
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	10
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	10
4	Jeffrey	Cook	Jeffrey.Cook@example.com	202-555-0398	Jersey city	New Jersey	66
5	Firstname	Lastname	email@example.com	123-456-7890	City City	State Name	99
6	First	Last	email@emailexample.com	098-765-4321	Town Town	State Farm	33
changed_by	time_changed	change_type
ccuser	2025-08-25 23:04:00	INSERT
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	13
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	14
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	10
4	Jeffrey	Cook	Jeffrey.Cook@example.com	202-555-0398	Jersey city	New Jersey	66
5	Firstname	Lastname	email@example.com	123-456-7890	City City	State Name	99
6	First	Last	email@emailexample.com	098-765-4321	Town Town	State Farm	33
changed_by	time_changed	change_type
ccuser	2025-08-25 23:04:00	INSERT
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	13
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	14
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	13
4	Jeffrey	Cook	Jeffrey.Cook@example.com	202-555-0398	Jersey city	New Jersey	66
5	Firstname	Lastname	email@example.com	123-456-7890	City City	State Name	99
6	First	Last	email@emailexample.com	098-765-4321	Town Town	State Farm	33
changed_by	time_changed	change_type
ccuser	2025-08-25 23:04:00	INSERT
trigger_catalog	trigger_schema	trigger_name	event_manipulation	event_object_catalog	event_object_schema	event_object_table	action_order	action_condition	action_statement	action_orientation	action_timing	action_reference_old_table	action_reference_new_table	action_reference_old_row	action_reference_new_row	created
ccuser	cc_user	customer_updated	UPDATE	ccuser	cc_user	customers	 	 	EXECUTE PROCEDURE log_customers_change()	ROW	BEFORE	 	 	 	 	 
ccuser	cc_user	customer_insert	INSERT	ccuser	cc_user	customers	 	 	EXECUTE PROCEDURE log_customers_change()	STATEMENT	AFTER	 	 	 	 	 
trigger_catalog	trigger_schema	trigger_name	event_manipulation	event_object_catalog	event_object_schema	event_object_table	action_order	action_condition	action_statement	action_orientation	action_timing	action_reference_old_table	action_reference_new_table	action_reference_old_row	action_reference_new_row	created
ccuser	cc_user	customer_updated	UPDATE	ccuser	cc_user	customers	 	 	EXECUTE PROCEDURE log_customers_change()	ROW	BEFORE	 	 	 	 	 
ccuser	cc_user	customer_insert	INSERT	ccuser	cc_user	customers	 	 	EXECUTE PROCEDURE log_customers_change()	STATEMENT	AFTER	 	 	 	 	 
Database Schema
customers_log
name	type
changed_by	character varying
time_changed	timestamp without time zone
change_type	character varying
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
Rows: 6


*/