/*
Consider the following examples of many to many relationships:

- A student can take many courses while a course can have enrollments from many students
- A recipe can have many ingredients whil an ingredient can belong to many different recipes
- A customer can patronize many banks while a bank can service many different customers.

In each of the above examples we see that a many-to-many relationship can be 
broken into two one-to-one relationships.

To implement a many-to-many relationship in a relational database,
we would create a third cross-reference table also knows as a join table.
It will have these two constraints:

- foreign knew referencing the primary keys of the two member tables
- a composite primary key made up of the two foreign keys.

Let's elaborate on this further with the recipe and ingredient many-to-many relationship.
Let's say a [recipe] table has the following columns:

- [id] (primary key)
- [name]
- [serving size]
- [perparation_time]
- [cook_time]

an [ingredient] table has the following columns:
- [id] (primary key)
- [name]
- [amount]

A Third cross-reference table [recipes_ingredients] will support the following columns:

- [recipe_id] (foreign key referencing [recipe] table's [id]) (primary key)

- [ingredient_id] (foreign key referencing [ingredient] table's [id])

Both [recipe_id] and [ingredient_id] also serve as a composite primary key for [recipes_ingredients].

+-------------------------+          +-------------------------+
|         recipe          |          |   recipes_ingredients   |
+-------------------------+          +-------------------------+
| id            integer PK|----------| recipe_id     integer FK|
| name          varchar(20)|         | ingredient_id integer FK|
| serving_size  integer   |          +-------------------------+
| preparation_time integer|
| cook_time     integer   |
+-------------------------+
           |
           |
           |
+-------------------------+
|       ingredient        |
+-------------------------+
| id          integer PK  |
| name        varchar(20) |
| amount      decimal     |
+-------------------------+


Instructions
Checkpoint 1 Passed
1.
We have created the tables - book and author for you. Click RUN to see them in the SQL browser.

In our book database schema, can you find a many-to-many relationship among the various tables - book, chapter, author, book_details, and page? If you were to say a book can have many authors and an author can have many books, you would be correct.

Create a cross-reference table, books_authors which has the following columns:

book_isbn of varchar(50), which serves as a foreign key to the book table and isbn column
author_email of varchar(20), which serves as a foreign key to author table and email column
Create a composite primary key for books_authors from both book_isbn and author_email.

To designate multiple columns as a composite primary key, use this syntax:

PRIMARY KEY (column1, column2)

Copy to Clipboard

and add it as the last line at the end of the table.

To designate a column as a foreign key which references a column of another table, use this syntax:

column1 <column1_type> REFERENCES table2(column2)

Copy to Clipboard

Checkpoint 2 Passed
2.
Write a query to validate the existence of primary and foreign keys in the books_authors table using the information_schema.key_column_usage view. Display the constraint_name, table_name and column_name.

You should expect 4 rows of results describing the columns that make up the primary keys and foreign keys.

To view the constraints (primary or foreign key) for a particular table and the table and column they are associated with, use the following syntax:

SELECT
  constraint_name, table_name, column_name
FROM
  information_schema.key_column_usage
WHERE
  table_name = 'recipe';

Copy to Clipboard

CREATE TABLE books_authors (
  book_isbn varchar(50) REFERENCES book(isbn),
  author_email varchar(20) REFERENCES author(email),
  PRIMARY KEY (book_isbn, author_email)
);

SELECT 
  constraint_name, table_name, column_name
FROM
  information_schema.key_column_usage
WHERE
  table_name = 'books_authors';

Query Results
constraint_name	table_name	column_name
books_authors_pkey	books_authors	book_isbn
books_authors_pkey	books_authors	author_email
books_authors_book_isbn_fkey	books_authors	book_isbn
books_authors_author_email_fkey	books_authors	author_email
Database Schema
books_authors
name	type
book_isbn	character varying
author_email	character varying
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
author
name	type
name	character varying
bio	character varying
email	character varying
Rows: 0


*/