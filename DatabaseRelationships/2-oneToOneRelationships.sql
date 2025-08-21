/*
In a one-to-one relationship, a row of table A is associated with exactly one row of table B and vice-versa.
For example,
a person may only have one passport assigned to them.
Conversely, a passport may only be issued to one person.
A car may only have on vehicle identification number assigned to it, and vice-versa.
A driver may only have one driver's license issued to them in their home state (or province).

Let's elaborate on the last example further.
Let's say we have a [driver] table with the following columns:
- name
- address
- date_of_birth
- license_id

we also have a [license] table with the following columns:

- id
- state_issued
- date_issued
- date_expired

in the [driver] table,
the primary key that uniquely identifies a driver would be the [license_id].
Similarly, the primary key that uniquely identifies a driver's license in the [license] table. would be the [id] itself.

To establish a one-to-one relationship in PostgreSQL between these two tables, we need to disgnate a roeign key in one of the tables.
We can pick the [license_id] from [driver] to be the foreign key in the [license] table.
However, doing this is not enough to ensure that duplicate rows will not exist in the license table.

To enforce a strictly one-to-one relationship in PostgreSQL,
we need another keyword: [UNIQUE].
By appending this keyword to the delcaration of the foreign key, we should be all set

license_id char(20) REFERENCES driver(license_id) UNIQUE

+-------------------------+                     +-------------------------+
|        license          |                     |         driver          |
+-------------------------+                     +-------------------------+
| id          integer     |          ---------->| license_id   char20 PK  |
| state_issued varchar(20)|.        |           | name        varchar(20) |
| date_issued  date       |         |           | address     varchar(100)|
| date_expired date       |         |           | date_of_birth date      |
| license_id   char20 PK  |<---------           +-------------------------+
+-------------------------+


CREATE TABLE driver (
    license_id char(20) PRIMARY KEY,
    name varchar(20),
    address varchar(100),
    date_of_birth date
);      

CREATE TABLE license (
    id integer PRIMARY KEY,
    state_issued varchar(20),
    date_issued date,
    date_expired  date,
    license_id char(20) REFERENCES driver(license_id) UNIQUE
); 




Instructions
Checkpoint 1 Passed
1.
Let’s take a look at the book table. The current columns in our book table are:

title
isbn of varchar(50)
pages
price
description
publisher
Suppose we want to maintain additional optional information such as book rating, language it’s written in, a keyword list to tag the book with, and date of publication. Since these information are optional, we don’t have to include them in the book table. If we do, we may end up with a lot of empty columns for some books. Instead, we can create a new table to house them. Then, we can establish a one-to-one relationship between these two tables.

In script.sql, we have created a new table, book_details with these columns:

id of the same type as isbn in book
rating of type decimal
language of type varchar(10)
keywords of type text[], an array of unlimited-length strings
date_published of type date
Designate a primary key for book_details.

Designate a foreign key, book_isbn that links to the isbn column of book. Add this key below the id column. Enforce the one-to-one relationship between these two tables with another keyword.

A primary key is a column that uniquely identifies every row in a table. It would be the id column. Add the PRIMARY KEY keyword next to the column name.

To designate a foreign key, use the REFERENCES keyword next to the desired column followed by the parent table name and the column name in parenthesis.

  <columnname> <columntype> REFERENCES <table_name>(<table_id>)

Copy to Clipboard

To strictly enforce the one-to-one relationship between two tables, append the UNIQUE keyword to the declaration of the foreign key.

  <columnname> <columntype> REFERENCES <table_name>(<table_id>) UNIQUE

Copy to Clipboard

Checkpoint 2 Passed
2.
Validate the existence of the key constraints you added for book_details using the information_schema.key_column_usage view.

Open script.sql and type your query to return the columns - constraint_name, table_name, column_name from information_schema.key_column_usage where table_name equals book_details.

The query should return 3 rows. Why is the foreign key listed twice?

Checkpoint 3 Passed
3.
Open bookdata.sql and study the INSERT statements. The first INSERT statement adds the first row to the book table. The second INSERT statement adds the first row to the book_details table. The third INSERT statement attempts to add another row to the book_details table with the same book_isbn value as the previous row.

Copy and paste the content in bookdata.sql to script.sql and click RUN. Then, examine the error message returned. You should expect to see the error message:

ERROR:  duplicate key value violates unique constraint "book_details_book_isbn_key"
DETAIL:  Key (book_isbn)=(123457890) already exists.

Copy to Clipboard

Checkpoint 4 Passed
4.
Open script.sql and write a query to display the following data:

book.title
book.price
book_details.language
book_details.rating
It basically displays common data available in both book and book_details based on their shared identifier, book.isbn and book_details.book_isbn.

The query should return one row of result for the book whose title is Learn PostgreSQL.

Select columns corresponding to book and book_details in the SELECT statement. Use the primary key of book and foreign key of book_details to write the WHERE clause of this query. For example:

SELECT table_one.column_one, table_two.column_two
FROM table_one, table_two
WHERE table_one.primary_key = table_two.foreign_key

Copy to Clipboard

An alternative is to use an inner JOIN query.

SELECT table_one.column_one, table_two.column_two
FROM table_one
JOIN table_two
ON table_one.primary_key = table_two.foreign_key

Copy to Clipboard

CREATE TABLE book_details (
  id integer PRIMARY KEY,
  book_isbn varchar(50) REFERENCES book(isbn) UNIQUE,
  rating decimal,
  language varchar(10),
  keywords text[],
  date_published date
);

SELECT
  constraint_name, table_name, column_name
FROM
  information_schema.key_column_usage
WHERE
  table_name = 'book_details';

INSERT INTO book VALUES (
  'Learn PostgreSQL',
  '123457890',
  100,
  2.99,
  'Great course',
  'Codecademy'
);

INSERT INTO book_details VALUES (
  1,
  '123457890',
  3.95,
  'English',
  '{sql, postgresql, database}',
  '2020-05-20'
);

INSERT INTO book_details VALUES (
  2,
  '123457890',
  3.95,
  'French',
  '{sql, postgresql, database}',
  '2020-05-20'
);

SELECT
    book.title, book.price, book_details.language, book_details.rating
FROM book
JOIN book_details
ON book.isbn = book_details.book_isbn;




Query Results
constraint_name	table_name	column_name
book_details_pkey	book_details	id
book_details_book_isbn_key	book_details	book_isbn
book_details_book_isbn_fkey	book_details	book_isbn
Database Schema
book_details
name	type
id	integer
book_isbn	character varying
rating	numeric
language	character varying
keywords	ARRAY
date_published	date
Rows: 0
book
name	type
title	character varying
isbn	character varying
pages	integer
price	money
description	character varying
publisher	character varying
Rows: 0



*/