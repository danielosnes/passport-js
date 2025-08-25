/*
Now that you have been introduced to the concept,
let's get out hands dirty and dive right in to creating out first trigger!
Triggers are very customizable.
You hav econtrol over when they get called,
when they run,
along with what happens when they are called.
For now we will keep things simple and go with a trigger that calls a function when a table is updated.

CREATE TRIGGER <trigger_name>
BEFORE UPDATE ON <table_name>
FOR EACH ROW 
EXECUTE PROCEDURE<function>;

As a note here,
you may see newer versions of PostgreSQL use [EXECUTE FUNCTION] rather than [EXECUTE PROCEDURE].
These are logically equivalent and both call a trigger function
(we will refer to this as calling a function throughout the lesson.)
but you should be aware that we will be using [EXECURE PROCEDURE] for our triggers.
If you are workong on another system you may need to switch to [EXECUTE FUNCTION].

For a specific example,
say you had your own trigger function you (or someone else) created called [check_account_update] that might be written like:

CREATE OR REPLACE FUNCTION check_account_update()
RETURNS TRIGGER AS $$
    BEGIN
        NEW.active:= 1;
        RETURN NEW:
    END;
$$ LANGUAGE PLPGSQL;

You could set this function as the target of your trigger like this:

CREATE TRIGGER check_account_update
    BEFORE UPDATE ON accounts
    FOR EACH ROW 
    EXECUTE PROCEDURE check_account_update();

So in this case, no matter what your [UPDATE] statement did to the [accounts] table,
the modified rows would have their [active] column set to 1 (presumably indicating true)

You are not limited to setting a trigger only on an [update],
it can be set for [UPDATE], [INSERT], [DELETE] and [TRUNCATE].

Let's get some practice with some basic [TRIGGERS].
In future exercises, we will go over the [BEFORE] and [FOR EACH ROW] options,
so for now, you can leave them just like they are in the example.

Instructions
Checkpoint 1 Passed
1.
Using the examples, create a trigger on the table customers called insert_trigger that will call the function insert_function() that will be activated on an INSERT statement for that table.

Note that we’ve written insert_function() behind the scenes.

Do not delete your query after completing this step.

Your script should look like

CREATE TRIGGER <trigger_name>
  BEFORE INSERT ON <table_name>
  FOR EACH ROW
  EXECUTE PROCEDURE <function_name>();

Copy to Clipboard

where

<trigger_name> = insert_trigger
<table_name> = customers
<function_name> = insert_function
Checkpoint 2 Passed
2.
Now to test your new trigger, start with doing a SELECT * on the customers table.

Note: Do not delete the previous query.

Checkpoint 3 Passed
3.
Insert a record into the customers table. The only required fields are first_name and last_name, so to keep things simple on your insert use first_name = John and last_name = Doe.

Note: Do not delete the previous queries.

Your script should look like

INSERT INTO <table_name> (first_name, last_name)
VALUES ('John', 'Doe');

Copy to Clipboard

where

<table_name> = customers
Checkpoint 4 Passed
4.
Run your select statement again after the insert and take note that more than what you inserted has changed (specifically notice last_name). This is due to the trigger you created being called when you did your insert.

Note: Do not delete the previous queries.

What do you think the insert_function() that we wrote behind the scenes does? Check out the hint to see that function.

put a final SELECT * FROM <table_name> where <table_name> is customers to confirm what happened with your INSERT.

insert_function() is defined as

CREATE OR REPLACE FUNCTION insert_function() RETURNS TRIGGER AS $$
    BEGIN
        NEW.last_name := 'UNKNOWN';
        RETURN NEW;
    END;
$$ LANGUAGE PLPGSQL;

Copy to Clipboard

CREATE TRIGGER insert_trigger
  BEFORE INSERT ON customers
  FOR EACH ROW
  EXECUTE PROCEDURE insert_function();

  SELECT * FROM customers;

  INSERT INTO customers (first_name, last_name) VALUES ('John', 'Doe');

  SELECT * FROM customers


Query Results
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	82
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	10
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	21
customer_id	first_name	last_name	email_address	home_phone	city	state_name	years_old
1	Edward	Lewis	Edward.Lewis@example.com	202-555-0264	Pittsburgh	Pennsylvania	82
2	Frances	Campbell	Frances.Campbell@example.com	202-555-0073	North Las Vegas	Nevada	10
3	Dennis	Hall	Dennis.Hall@example.com	202-555-0424	Chula Vista	California	21
4	John	UNKNOWN	 	 	 	 	 
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
*/