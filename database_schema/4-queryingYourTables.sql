/*
Now that we have defined our three tables [book], [author] and [chapter],
let's populate our tables with sample data and make queries.

To insert data into a PostgreSQL table use this syntax:

INSERT INTO table_name VALUES (
column_one_value,
column_two_value,
...
column_N_value
);

to query a table to return all the columns, type:

SELECT * FROM table_name;

In order to have a useful schema, we need to prevent a database table from storing inaccurate data and returning multiple rose when we expect only one.
We do this by constraining the table with the help of a primary key assigned to one or more columns.
This will ensure tha tthe column or combination of columns contains only unique values.
We will explore this topic further in a subsequent lesson on keys.

INSERT INTO book VALUES (
'Postgres for Beginners',
'0-5980-6249-1',
25,
4.99,
'Learn Postgres the Easy Way',
'Codecademy Publishing'
);

SELECT * FROM book WHERE pages = '25';

SELECT * FROM book WHERE isbn = '0-5980-6249-1'


Instructions
Checkpoint 1 Passed
1.
We have created the book table and populated it with sample data. Can you add another row to the table?

Open script.sql and populate the book table with the following data:

title, 'Postgres for Beginners'
isbn, '0-5980-6249-1'
pages, 25
price, 4.99
description, 'Learn Postgres the Easy Way'
publisher, 'Codecademy Publishing'
Then, add a query to the book table to validate all the data you entered based on the book title.

To query everything based a particular condition, use this syntax:

SELECT *
FROM person
WHERE age = 30;

Copy to Clipboard

Checkpoint 2 Passed
2.
In script.sql, query the book table for the isbn '0-5980-6249-1'.

Did you notice that two books are returned based on the same isbn value? What would fix this problem so that only one unique row is returned per isbn value?

To query based a particular condition, use this syntax:

SELECT name, id, age
FROM person
WHERE age = 30;

Copy to Clipboard

To prevent the book table from storing inaccurate data and returning multiple rows when we expect only one based on its isbn, we need to ensure that the isbn column contains only unique values. We do this by constraining the table with the help of primary keys, a topic which we will explore in a subsequent lesson on keys.



Query Results
title	isbn	pages	price	description	publisher
Postgres for Beginners	0-5980-6249-1	25	$4.99	Learn Postgres the Easy Way	Codecademy Publishing
title	isbn	pages	price	description	publisher
Postgres Made Easy	0-5980-6249-1	30	$9.99	A great book for beginners to learn how to manage PostgreSQL	Codecademy Press
Postgres for Beginners	0-5980-6249-1	25	$4.99	Learn Postgres the Easy Way	Codecademy Publishing
Database Schema
book
name	type
title	character varying
isbn	character varying
pages	integer
price	money
description	character varying
publisher	character varying
Rows: 2
chapter
name	type
id	integer
number	integer
title	character varying
content	character varying
Rows: 0
author
name	type
name	character varying
bio	character varying
email	character varying
Rows: 0


*/