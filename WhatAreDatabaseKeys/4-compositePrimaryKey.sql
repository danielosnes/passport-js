/*
Sometimes, none of the columns in a table can uinquely identify a record.
When this happens, we can designate multiple columns in a table to serve as the primary key, also known as the composite primary key.
For example, we have a table [popular_books] that contains the most popular books previewed and/or sold in a particular week.

[popular_books] will have these columns:
- book_title
- author_name
- number_sold
- number_previewed

Since an author can have many books and a book and have many authors,
there could be repeated listings of a particular book or author in the table

For example,
A listing of [popular_books] sorted by the book title may show the following:

      book_title      | author_name | number_sold | number_previewed 
----------------------+-------------+-------------+------------------
 Postgres Made Easy   | Liz Key     |          33 |               50
 Postgres Made Easy   | Tom Index   |          33 |               50
 Beginner Postgres    | Tom Index   |          55 |               75
 Postgres for Dummies | Liz Key     |          25 |               33


in the above example, the book title [Postgres Made Easy] is listen twice since it has two authors.

If we list [popular_books] by author name, 
we may find an author appearing twice such as the following:

 author_name |      book_title      
-------------+----------------------
 Liz Key     | Postgres Made Easy
 Liz Key     | Postgres for Dummies
 Tom Index   | Postgres Made Easy
 Tom Index   | Beginner Postgres


As we see from above,
neither [book_title] nor [author_name] can be a unique column
A Composite primary key, however, can be derived from the combination of both [book_title] and [author_name] that would make a row unique.

To designate multiple columns as a composite primary key, use this syntax

PRIMARY KEY (column_one, column_two)

For example,
if we were to disgnate both [recipe_id] and [ingredient_id] as the composite primary key for the [popular_recipes] table,
we would write the [CREATE TABLE] statement for [popular_recipes] as follows:

CREATE TABLE popular_recipes (
recipe_id varchar(20),
ingredient_id  varchar(20),
downloaded integer,
PRIMARY KEY (recipe_id, ingredient_id)
);

Instructions
Checkpoint 1 Passed
1.
In script.sql, create a new table popular_books with the following columns:

book_title, a varchar of 100 characters
author_name, a varchar of 50 characters
number_sold, an integer
number_previewed, an integer
and designate book_title and author_name as the composite primary key.

Checkpoint 2 Passed
2.
In script.sql, write a query below the CREATE statement using the information_schema.key_column_usage view to validate the existence of the composite primary key in popular_books.

What are the column names that make up the composite primary key?

Query the information_schema.key_column_usage view as follows, replacing some_table with the table name you are interested in.

SELECT
  constraint_name, table_name, column_name
FROM
  information_schema.key_column_usage
WHERE
  table_name = some_table;

Copy to Clipboard

Great job!

CREATE TABLE popular_books (
  book_title varchar(100),
  author_name varchar(50),
  number_sold integer,
  number_previewed integer,
  PRIMARY KEY (book_title, author_name)
);


SELECT
  constraint_name, table_name, column_name
FROM
  information_schema.key_column_usage
WHERE
  table_name = 'popular_books';


Query Results
constraint_name	table_name	column_name
popular_books_pkey	popular_books	book_title
popular_books_pkey	popular_books	author_name
Database Schema
popular_books
name	type
book_title	character varying
author_name	character varying
number_sold	integer
number_previewed	integer
Rows: 0

*/