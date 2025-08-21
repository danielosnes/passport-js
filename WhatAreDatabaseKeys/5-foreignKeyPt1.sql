/*
When we have a situation where one table is related to anote=ther table in a database,
we may want to bind those tables back together in a query.
For example,
let's say we have a [person] and an [email] table.
If we want a list of names and assicated emails.
we would need to join these tables together.

To maintain data integrity and sure that we can join tables together correctly,
we can use another type of key called a foreign key.
A foreign key is a key that references a column in another table.

Where do we place this foreign key?
Should it be in the [person] table or [email] table?
To answer this question,
we need to figure out how [person] is related to [email].
Does creating a [person] record require that an [email] record exists as well?
This is not usually the case.
A person can have no email address or one or more email addresses.
So when created a record in the [person] table, 
we don't insist that this person should have a record in the [email] table as well.

Does creating an [email] record require that a valid [person] record exists?
This is usually the case,
since we shouldn't create an email address for a non-existent person.
Hence, we should place the foeign key in the [email] table to ensure that a valid record
in the [person] table must pre-exist before adding a record in the [email] table.

In the illustration below, the foreign key is [person_id] in the [email] table.

+-------------------------+
|         person          |
+-------------------------+
| id          integer PK  |
| name        varchar(20) |
| age         integer     |
+-------------------------+
             1
             |
             | *
+-------------------------+
|          email          |
+-------------------------+
| email       varchar(20) |
| person_id   integer FK  |
| storage     integer     |
| price       money       |
+-------------------------+


To designate a foreign key on a single column in PostgreSQL,
we use the [REFERENCES] keyword:

CREATE TABLE person (
    id integer PRIMARY KEY,
    name varchar(20),
    age integer
);

CREATE TABLE email (
    email varchar(20) PRIMARY KEY,
    person_id integer REFERENCES person(id),
    storage integer,
    price money
);

Instructions
Checkpoint 1 Passed
1.
Open script.sql and take a look at the book schema which you have created earlier. Can you guess how a book might be related to its chapters? If you were to say a book has multiple chapters, you would be correct.

In script.sql, add a column book_isbn in the chapter table whose data type is the same as the isbn column in book. Then, designate that column to be a foreign key.

Insert the following line in the chapter table, preferably after the id column:

  book_isbn varchar(50) REFERENCES book(isbn)

Copy to Clipboard

Checkpoint 2 Passed
2.
In script.sql query the information_schema.key_column_usage view to validate that you have designated book_isbn as the foreign key in the chapter table.

Fill in the following code:

SELECT 
  constraint_name, table_name, column_name
FROM
  information_schema.key_column_usage
WHERE
  table_name = '___';

Copy to Clipboard

CREATE TABLE book (
  title varchar(100),
  isbn varchar(50) PRIMARY KEY,
  pages integer,
  price money,
  description varchar(256),
  publisher varchar(100)
);

CREATE TABLE chapter (
  id integer PRIMARY KEY,
  book_isbn varchar(50) REFERENCES book(isbn),
  number integer,
  title varchar(50),
  content varchar(1024)
);

SELECT
  constraint_name, table_name, column_name
FROM
  information_schema.key_column_usage
WHERE
  table_name = 'chapter';



  Query Results
constraint_name	table_name	column_name
chapter_pkey	chapter	id
chapter_book_isbn_fkey	chapter	book_isbn
Database Schema
book
name	type
title	character varying
isbn	character varying
pages	integer
price	money
description	character varying
publisher	character varying
Rows: 0
chapter
name	type
id	integer
book_isbn	character varying
number	integer
title	character varying
content	character varying
Rows: 0
*/