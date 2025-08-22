/*
Now that you have related two tables with a many-to-many relationship via a cross-reference table,
you will get to populate the cross-reference table and make interesting queries.

In this exercise, you are going to demonstrate the many-to-many relationship between [book] and [author] through the 
cross-reference table, [books_authors].

Instructions
Checkpoint 1 Passed
1.
We have pre-populated the book table with sample data. Write a query to select everything from the book table.

Checkpoint 2 Passed
2.
We have pre-populated the author table with sample data. Write a query to select everything from the author table.

Checkpoint 3 Passed
3.
Write statements to populate the books_authors table to show the following relationships:

'Learn PostgreSQL Volume 1' is written by both 'James Key' and 'Clara Index'
'Learn PostgreSQL Volume 2' is written by 'Clara Index'
The primary keys for books are:

'123457890' for 'Learn PostgreSQL Volume 1'
'987654321' for 'Learn PostgreSQL Volume 2'
The primary keys for authors are:

'jkey@db.com' for 'James Key'
'cindex@db.com' for 'Clara Index'
An example of an INSERT statement is as follows:

INSERT INTO table_name VALUES (
  value_one,
  value_two,
  ...
);

Copy to Clipboard

You should be adding 3 INSERT statements for the books_authors table.

Checkpoint 4 Passed
4.
Write a query to show the one-to-many relationship between book and author. Display three columns using these aliases - book_title, author_name and book_description.

You should expect 3 rows of results, in which one row might look like:

book_title	author_name	book_description
Learn PostgreSQL Volume 1	Clara Index	Manage database part one
To display selected columns (column_one and column_two) from different tables (table_one and table_two) as aliases (alias_one and alias_two) and join them with the help of a cross-reference table (joined_table), use the following syntax:

SELECT column_one AS alias_one, column_two AS alias_two
FROM table_one, table_two, joined_table
WHERE table_one.primary_key = joined_table.foreign_key_one
AND table_two.primary_key = joined_table.foreign_key_two

Copy to Clipboard

Alternatively, you can query with INNER JOIN from three tables.

SELECT column_one AS alias_one, column_two AS alias_two
FROM table_one
INNER JOIN joined_table
ON table_one.primary_key = joined_table.foreign_key_one
INNER JOIN table_two
ON table_two.primary_key = joined_table.foreign_key_two

Copy to Clipboard

Checkpoint 5 Passed
5.
Write a query to show the one-to-many relationship between author and book. Display three columns as aliases - author_name, author_email and book_title.

You should expect to see 3 rows of results and one of them might look like this:

author_name	author_email	book_title
Clara Index	cindex@db.com	Learn PostgreSQL Volume 1


SELECT * FROM book;
SELECT * FROM author;

INSERT INTO books_authors VALUES (
  '123457890',
  'jkey@db.com'
);

INSERT INTO books_authors VALUES (
  '123457890',
  'cindex@db.com'
);

INSERT INTO books_authors VALUES (
  '987654321',
  'cindex@db.com'
);

SELECT 
  book.title AS book_title, 
  author.name AS author_name, 
  book.description AS book_description 
FROM 
  book, author, books_authors
WHERE
  book.isbn = books_authors.book_isbn
AND
  author.email = books_authors.author_email;

SELECT 
  author.name AS author_name, 
  author.email AS author_email,
  book.title AS book_title
FROM 
  book, author, books_authors
WHERE
  book.isbn = books_authors.book_isbn
AND
  author.email = books_authors.author_email;



Query Results
title	isbn	pages	price	description	publisher
Learn PostgreSQL Volume 1	123457890	100	$2.99	Manage database part one	Codecademy
Learn PostgreSQL Volume 2	987654321	200	$3.99	Manage database part two	Codecademy
name	bio	email
James Key	Guru in database management with PostgreSQL	jkey@db.com
Clara Index	Guru in database management with PostgreSQL	cindex@db.com
book_title	author_name	book_description
Learn PostgreSQL Volume 1	James Key	Manage database part one
Learn PostgreSQL Volume 1	Clara Index	Manage database part one
Learn PostgreSQL Volume 2	Clara Index	Manage database part two
author_name	author_email	book_title
James Key	jkey@db.com	Learn PostgreSQL Volume 1
Clara Index	cindex@db.com	Learn PostgreSQL Volume 1
Clara Index	cindex@db.com	Learn PostgreSQL Volume 2
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
author
name	type
name	character varying
bio	character varying
email	character varying
Rows: 2
books_authors
name	type
book_isbn	character varying
author_email	character varying
Rows: 3
*/