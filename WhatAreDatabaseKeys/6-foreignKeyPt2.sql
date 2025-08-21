/*
Now that you have related two tables together via a foeign key,
you have ensure that you can correctly join the tables back together in a query.

For example,
suppose that we want to joint the [person] and [email] tables from the following schema back together.

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


We could use the following query to return a table of names and associated emails:

SELECT person.name AS name, email.email AS email
FROM person, email
WHERE person.id = email.person_id;

Instructions
Checkpoint 1 Passed
1.
We have populated the database with sample book data. Open script.sql and write a query to display everything in the book table.

Checkpoint 2 Passed
2.
We have also populated the chapter table. In script.sql, write a query to display everything from the chapter table.

Checkpoint 3 Passed
3.
In script.sql, write a query to display book.title as book and chapter.title as chapters from both book and chapter tables.

Each row returned should show the names of the chapters and the name of the book they are in.

Use the primary key of book and foreign key of chapter to write this query. For example:

SELECT column_one AS alias_one, column_two AS alias_two
FROM table_one, table_two
WHERE table_one.primary_key = table_two.foreign_key

Copy to Clipboard

We can also use a JOIN statement as follows:

SELECT column_one AS alias_one, column_two AS alias_two
FROM table_one
JOIN table_two
ON table_one.primary_key = table_two.foreign_key

Copy to Clipboard

SELECT * FROM book;
SELECT * FROM chapter;
SELECT book.title as book, chapter.title as chapters 
FROM book
JOIN chapter
ON book.isbn = chapter.book_isbn;



*/