/*
As opposed to one-to-one, a one-to-many relationship cannot be represented in a single table.
Why?
Because there will be multiple rows that need to exist for primary key and this will result in redundant data that
breaks the constraint places upon the primary key.

For example,
consider a table where we want one person to be able to have many email addresses.
However,
if there is aprimary key in the table, such as the [id], the follow rows will be rejected by the database.

name   id (PK)     email       
Cody   2531   	cody@yahoo.com 
Cody   2531   	cody@google.com
Cody   2531   	cody@bing.com

To resolve this,
we need to represent a one-to-many relationship with two tables - a parent and a child table.
Analogous to a parent-child relationship where a parent can have multiple children,
a parent table will house a primary key and the child table will house both primary and foreign keys.
The foreign key binds the child table to the parent table.

The following illustration shows the one-to-many relationship between [person] and [email] tables.

+-------------------------+                     
|         person          |                     
+-------------------------+                     
|[id          integer PK] |                     
| name        varchar(20) |                     
| age         integer     |                     
+-------------------------+                     
             | 1                                
             |                                
             | *                              
+-------------------------+                     
|          email          |                     
+-------------------------+                     
|[email       varchar(20)]|                     
| person_id   integer FK  |                     
| storage     integer     |                     
| price       money       |                     
+-------------------------+                     



Instructions
Checkpoint 1 Passed
1.
Let’s study our book schema and figure out how we could enhance it further to provide another example of a one-to-many relationship.

Open script.sql and click RUN to see the database schema on the SQL browser.

In the Database Keys lesson, we identified a book and a chapter to have a one-to-many relationship since a book can have multiple chapters. So we have already bound the chapter table to the book table via a foreign key.

In this exercise, we are going to create a new one-to-many relationship. Consider the relationship between the chapter table and a new page table. Logically, a book chapter consists of one or more pages, but each page can only belong to one chapter. This fits well in a one-to-many relationship. Instead of storing the entire chapter content currently limited to 1024 characters, we can split the chapter table into two tables - chapter and page, where chapter has a one-to-many relationship with page.

In script.sql, create a new table, page, with the following columns:

id for page id of integer type which is also a primary key
content for page content of text type of unlimited character
header for page header of varchar(20)
footer for page footer of varchar(20)
Add a foreign key, chapter_id, which references the chapter table and its id column, an integer, to this table, below the id column.

To add a foreign key, use this guide:

<new_column_name> <new_column_type> REFERENCES <foreign_key_table_name>(<foreign_key_column_name>)

Copy to Clipboard

Checkpoint 2 Passed
2.
Since we’ve moved the content column into a new table, page, we don’t need that column in chapter. Drop the content column from chapter.

To drop a column from an existing table, use this syntax:

ALTER TABLE table_name 
DROP COLUMN column_name;

Copy to Clipboard

Checkpoint 3 Passed
3.
In script.sql, write a query to validate the existence of the key constraints you just added to page by querying the information_schema.key_column_usage view and return the following columns: constraint_name, table_name, and column_name.

You should see two rows which describe the column names that contain the primary and foreign keys.

An example query would be as follows:

SELECT
  constraint_name, table_name, column_name
FROM
  information_schema.key_column_usage
WHERE
  table_name = 'recipe';

Copy to Clipboard

Checkpoint 4 Passed
4.
We would like to populate the book, chapter, and page tables with sample data.

Open bookdata.sql and study the various INSERT statements. The first 2 INSERT statements create an instance of two books. The next two INSERT statements create an instance of two chapters, one chapter per book. The next four INSERT statements create an instance of four pages, two pages per book. Copy the content of this file.

Open script.sql, paste the content from bookdata.sql at the end of this file.

Checkpoint 5 Passed
5.
Open script.sql and write an INNER JOIN query connecting book, chapter and page tables and display the results as book_title, chapter_title and page_content.

You should expect to see 4 rows of results which contain the names of two books, the chapters assigned to each book and the pages assigned to each chapter.

To write an INNER JOIN query of three tables, use the following syntax:

SELECT table_one.column_one AS alias_one, table_two.column_two AS alias_two, table_three.column_three AS alias_three
FROM table_one
INNER JOIN table_two
ON table_one.primary_key = table_two.foreign_key
INNER JOIN table_three
ON table_two.primary_key = table_three.foreign_key;

Copy to Clipboard

CREATE TABLE page (
  id integer PRIMARY KEY,
  chapter_id integer REFERENCES chapter(id),
  content text,
  header varchar(20),
  footer varchar(20)
);

ALTER TABLE chapter
DROP COLUMN content;

SELECT
  constraint_name, table_name, column_name
FROM 
  information_schema.key_column_usage
WHERE
  table_name = 'page';

  INSERT INTO book VALUES (
  'Learn PostgreSQL',
  '0-9673-4537-5',
  100,
  2.99,
  'Dive into Postgres for Beginners',
  'Codecademy Publishing'
);

INSERT INTO book VALUES (
  'Postgres Made Easy',
  '0-3414-4116-3',
  255,
  5.99,
  'Learn Postgres the Easy Way',
  'Codecademy Press'
);

INSERT INTO chapter VALUES (
  1,
  '0-9673-4537-5',
  1,
  'Chapter 1'
);

INSERT INTO chapter VALUES (
  2,
  '0-3414-4116-3',
  1,
  'Chapter 1'
);

INSERT INTO page VALUES (
  1,
  1,
  'Chapter 1 Page 1',
  'Page 1 Header',
  'Page 1 Footer'
);

INSERT INTO page VALUES (
  2,
  1,
  'Chapter 1 Page 2',
  'Page 2 Header',
  'Page 2 Footer'
);

INSERT INTO page VALUES (
  3,
  2,
  'Chapter 1 Page 1',
  'Page 1 Header',
  'Page 1 Footer'
);

INSERT INTO page VALUES (
  4,
  2,
  'Chapter 1 Page 2',
  'Page 2 Header',
  'Page 2 Footer'
);

SELECT book.title AS book_title, chapter.title AS chapter_title, page.content AS page_content
FROM 
  book
JOIN 
  chapter
ON 
  book.isbn = chapter.book_isbn 
JOIN 
  page
ON 
  chapter.id = page.chapter_id;



Query Results
constraint_name	table_name	column_name
page_pkey	page	id
page_chapter_id_fkey	page	chapter_id
book_title	chapter_title	page_content
Learn PostgreSQL	Chapter 1	Chapter 1 Page 1
Learn PostgreSQL	Chapter 1	Chapter 1 Page 2
Postgres Made Easy	Chapter 1	Chapter 1 Page 1
Postgres Made Easy	Chapter 1	Chapter 1 Page 2
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
book_isbn	character varying
number	integer
title	character varying
Rows: 2
page
name	type
id	integer
chapter_id	integer
content	text
header	character varying
footer	character varying
Rows: 4


*/