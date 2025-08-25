/*
You will be happy to find out that you can use a [WHEN] clause to filter when a trigger calls its related function.

For example,
let's say you want ot create a trigger on your [clients] table that marks whihc clients are your highest spenders.
This trigger would be dependent on the business logic on what a high spender is.
For example,
When total spending gets higher than X you could update the high spenders flat for that client.
Similarly, if a client drops below X you could mark that they are no longer considered a high spender.

As a note, 
with the [WHEN] clause, you can use [NEW] and [OLD] to get records from the table before and after the query.
Logically, [INSERT] can not refer to [OLD] (nothing existed before the insert)
and [DELETE] can not refer to [NEW] (nothign exists after the delete).

For example the [INSERT] triggers might look like:

CREATE TRIGGER insert_trigger_high
    BEFORE INSERT ON clients
    FOR EACH ROW
    WHEN (NEW.total_spent >= 1000)
    EXECUTE PROCEDURE high_spender();

and

CREATE TRIGGER insert_trigger_low
    BEFORE INSERT ON clients
    FOR EACH ROW
    WHEN (NEW.total_spend < 1000)
    EXECUTE PROCEDURE low_spender();

Instructions
Checkpoint 1 Passed
1.
Using the examples as a template, create TWO update triggers for the same table (clients). Name the triggers update_trigger_high and update_trigger_low, both set to BEFORE UPDATE and FOR EACH ROW. For the high spender set the logic to when the total_spent is >= 1000 it calls set_high_spender(). For the low spender set its logic to when the total_spent is less than 1000 it calls set_low_spender().

Note: we have been using the customers table, but now we are mixing it up and using a clients table.

Checkpoint 2 Passed
2.
Do a SELECT * on the clients. To make comparisons easier set ORDER BY client_id.

Checkpoint 3 Passed
3.
Now to test our triggers, write two update statements. For the first, set the total_spent = 5000 where last_name = 'Campbell'. For the second one, set total_spent = 100 where last_name = 'Lewis'.

Checkpoint 4 Passed
4.
Run your SELECT * on clients and ORDER BY client_id again after your UPDATE statement and notice the changes to the records. Specifically, take note of the high_spender column.

The trigger altered the record beyond what was specified in the UPDATE statement you wrote. In practice, you could (and probably should) do this logic in the function itself, letting it decide when to set the high spender to on or off, but this served as a good example of how to use a WHEN clause to limit when a trigger would fire.

Your script should look like:

SELECT *
FROM <table_name>
ORDER BY <column_name>;

Copy to Clipboard

where

<table_name> = clients
<column_name> = client_id

CREATE TRIGGER update_trigger_high
BEFORE UPDATE ON clients
FOR EACH ROW
WHEN (NEW.total_spent > 1000)
EXECUTE PROCEDURE set_high_spender();

CREATE TRIGGER update_trigger_low
BEFORE UPDATE ON clients
FOR EACH ROW
WHEN (NEW.total_spent < 1000)
EXECUTE PROCEDURE set_low_spender();

SELECT * FROM clients ORDER BY client_id;

UPDATE clients
SET total_spent = 5000
WHERE last_name = 'Campbell';

UPDATE clients
SET total_spent = 100
WHERE last_name = 'Lewis';

SELECT * FROM clients ORDER BY client_id;

Query Results
client_id	high_spender	first_name	last_name	total_spent
1	1	Edward	Lewis	10000
2	0	Frances	Campbell	0
3	0	Dennis	Hall	750
client_id	high_spender	first_name	last_name	total_spent
1	0	Edward	Lewis	100
2	1	Frances	Campbell	5000
3	0	Dennis	Hall	750
Database Schema
clients
name	type
client_id	integer
high_spender	integer
first_name	character varying
last_name	character varying
total_spent	integer
Rows: 3
*/

/*
Query Results
client_id	high_spender	first_name	last_name	total_spent
1	1	Edward	Lewis	10000
2	0	Frances	Campbell	0
3	0	Dennis	Hall	750
Database Schema
clients
name	type
client_id	integer
high_spender	integer
first_name	character varying
last_name	character varying
total_spent	integer
Rows: 3
*/