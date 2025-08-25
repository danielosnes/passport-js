/*
Just like everything else in your database, triggers need to be maintained,
and sometimes that means pruning obsolete triggers.
You can use [DROP TRIGGER] to accomplish this:

DROP TRIGGER <trigger_name> ON <table_name>;

for example

DROP TRIGGER insert_trigger ON customers;

In addition to dropping triggers,
it can be useful to know what triggers exist.
To find that, you just need to look at the [information._schema.triggers] table

SELECT * FROM information_schema.triggers;

Query Results
trigger_catalog	trigger_schema	trigger_name	event_manipulation	event_object_catalog	event_object_schema	event_object_table	action_order	action_condition	action_statement	action_orientation	action_timing	action_reference_old_table	action_reference_new_table	action_reference_old_row	action_reference_new_row	created
ccuser	cc_user	im_a_bad_trigger	UPDATE	ccuser	cc_user	orders	 	 	EXECUTE PROCEDURE statement_function()	STATEMENT	AFTER	 	 	 	 	 
ccuser	cc_user	im_a_good_trigger	UPDATE	ccuser	cc_user	orders	 	 	EXECUTE PROCEDURE statement_function()	STATEMENT	BEFORE	 	 	 	 	 
Database Schema
orders
name	type
order_id	integer
quantity	integer
notes	character varying
Rows: 3

DROP TRIGGER im_a_bad_trigger ON orders;

Query Results
trigger_catalog	trigger_schema	trigger_name	event_manipulation	event_object_catalog	event_object_schema	event_object_table	action_order	action_condition	action_statement	action_orientation	action_timing	action_reference_old_table	action_reference_new_table	action_reference_old_row	action_reference_new_row	created
ccuser	cc_user	im_a_bad_trigger	UPDATE	ccuser	cc_user	orders	 	 	EXECUTE PROCEDURE statement_function()	STATEMENT	AFTER	 	 	 	 	 
ccuser	cc_user	im_a_good_trigger	UPDATE	ccuser	cc_user	orders	 	 	EXECUTE PROCEDURE statement_function()	STATEMENT	BEFORE	 	 	 	 	 
Database Schema
orders
name	type
order_id	integer
quantity	integer
notes	character varying
Rows: 3

SELECT * FROM information_schema.triggers;

Query Results
trigger_catalog	trigger_schema	trigger_name	event_manipulation	event_object_catalog	event_object_schema	event_object_table	action_order	action_condition	action_statement	action_orientation	action_timing	action_reference_old_table	action_reference_new_table	action_reference_old_row	action_reference_new_row	created
ccuser	cc_user	im_a_bad_trigger	UPDATE	ccuser	cc_user	orders	 	 	EXECUTE PROCEDURE statement_function()	STATEMENT	AFTER	 	 	 	 	 
ccuser	cc_user	im_a_good_trigger	UPDATE	ccuser	cc_user	orders	 	 	EXECUTE PROCEDURE statement_function()	STATEMENT	BEFORE	 	 	 	 	 
trigger_catalog	trigger_schema	trigger_name	event_manipulation	event_object_catalog	event_object_schema	event_object_table	action_order	action_condition	action_statement	action_orientation	action_timing	action_reference_old_table	action_reference_new_table	action_reference_old_row	action_reference_new_row	created
ccuser	cc_user	im_a_good_trigger	UPDATE	ccuser	cc_user	orders	 	 	EXECUTE PROCEDURE statement_function()	STATEMENT	BEFORE	 	 	 	 	 
Database Schema
orders
name	type
order_id	integer
quantity	integer
notes	character varying
Rows: 3


Instructions
Checkpoint 1 Passed
1.
Find the list of triggers currently in the system.

Your script should look like:

 SELECT * FROM <system_table>;

Copy to Clipboard

where

<system_table> = information_schema.triggers
Checkpoint 2 Passed
2.
Remove the trigger named im_a_bad_trigger on the orders table.

Your script should look like:

DROP TRIGGER <trigger_name> ON <table_name>;

Copy to Clipboard

where

<trigger_name> = im_a_bad_trigger
<table_name> = orders
Checkpoint 3 Passed
3.
Check the list of triggers again to confirm it was removed.

Your script should look like:

 SELECT * FROM <system_table>;

Copy to Clipboard

where

<system_table> = information_schema.triggers


*/