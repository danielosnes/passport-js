/*
Now that we have covered the basic structure of triggers, let us cover some of the nuances to keep in mind.
For instance, 
in PostgreSQL, multiple triggers of the same kind can exist on the same table.
If a statement causes multiple triggers to fire, they are triggered in alphabetical order.
We have seen this by implication in our previous exercise where we had more than one trigger for [UPDATE] and [INSERT].
In that example, 
because of the logic of the [WHERE] clauses,
only one trigger called its function, but with different [WHERE] clause logic, 
both could have been fired.
We will play around with this idea in more detail in the ecervises.

Another point to be aware of is that in PostgreSQL since [SELECT] statements do not modify rows,
no trigger can be set on [SELECT] statements.

Finally, let's consider the concept that one SQL command can trigger more than one kind of trigger.
For example, an [INSERT] can fire a trigger that calls a function that updates another record(s), firing an [UPDATE] trigger.

Let's look at a hypothetical example on how this might work.
Say you have a [DELETE] trigger on your [customers] table.
The function associated with this trigger inserts a record into the [customers_deleted] table.
Additionally, the [customers_deleted] table has an [INSERT] trigger on it.
So when this record is inserted it calls its associated function for the trigger that updates a record in the [security] table setting the date for next review due to the current date.

Instructions
Checkpoint 1 Passed
1.
Create two update triggers, one called update_alpha that calls the function update_first() and the other trigger call update_bravo which calls update_second(). Both on the orders table, both set for BEFORE UPDATE and FOR EACH ROW.

update_first() and update_second() are two functions we wrote that will add some text to the notes column of our table. We’re going to investigate the order in which these notes are written. Remember, the order is based on the name of the triggers in this case.

Your scripts should look like:

CREATE TRIGGER <trigger_name_1>
  BEFORE UPDATE ON <table_name>
  FOR EACH ROW
  EXECUTE PROCEDURE <function_name_1>();

CREATE TRIGGER <trigger_name_2>
  BEFORE UPDATE ON <table_name>
  FOR EACH ROW
  EXECUTE PROCEDURE <function_name_2>();

Copy to Clipboard

where

<trigger_name_1> = update_alpha
<table_name> = orders
<function_name_1> = update_first
<trigger_name_2> = update_bravo
<function_name_2> = update_second
Checkpoint 2 Passed
2.
Run a SELECT * FROM orders; to see the current state of the table. To help you with verification of results include ORDER BY order_id.

Checkpoint 3 Passed
3.
UPDATE the record for order 1234 with quantity of 5.

Your script should look like:

UPDATE <table_name>
SET <target_column_name> = 5
WHERE <column_name> = 1234;

Copy to Clipboard

where

<table_name> = orders
<target_column_name> = quantity
<column_name> = order_id
Checkpoint 4 Passed
4.
Run your select statement again. Notice the order of the string in the notes. These were added in the order they were run by the triggers. In the real world, you can make much more complex sequences, but this gives you the foundation to build upon.

Your script should look like:

SELECT *
FROM <table_name>
ORDER BY <column_name>;

Copy to Clipboard

where

<table_name> = orders
<column_name> = order_id
Checkpoint 5 Passed
5.
BONUS: Try renaming the triggers so the trigger associated with the update_first() function runs second. Notice the change to the output to confirm the triggers are running alphabetically.

CREATE TRIGGER update_bravo
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE PROCEDURE update_second();

CREATE TRIGGER update_alpha
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE PROCEDURE update_first();

SELECT * FROM orders ORDER BY order_id;

UPDATE orders
SET quantity = 5
WHERE order_id = 1234;

SELECT * FROM orders ORDER BY order_id;




*/