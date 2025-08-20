/*
You may remember from the diagram in exercise 1,
that the database tables are connected by lines.
The lines connected the tables depict the relationships between them.
For instance,
the book table is related to two other tables - chapter and book_list, via related columns - isbn and book_isbn.

Let's say we have a person table and an email table,
where a person can have many email addresses 
but an email address can only belong to one person.
To implement this type of relationship,
we need to apply a constraint on the email table by adding another column to it 
and designating it to associate with the person table.

Let's say we have a hibby table as well and populate it with all kinds of hobbies.
If we try to query both the hobby and person tables, 
how do we know for sure that a hobby is tied to a particular person?
There is nothing in the person table that links it to a hobby.

To associate it with a person,
we need to related the person table to the hobby table with the type of relationship they have.
Can a hobby apply to only one person or can it be shared by multiple people?

We will discuss these interesting relationships between tables and how to implement them in subsequent lessons about keys and relationships.
So far,
the tables that have been created are stand alone tables that are unrealted to each other.
Lets see if we can related tables in this schema in the following exercises.

Instructions
Checkpoint 1 Passed
1.
We have populated the chapter table with sample data.

In script.sql, write a query to the chapter table to display its current content.

Think about how this table can relate to the book table. How do we associate the chapter content with a particular book?

A book typically has many chapters, but a chapter can only belong to one book. To implement this type of relationship, we need to apply a constraint on the chapter table by adding another column to it and designating it to associate with the book table.

We will discuss this particular relationship between tables and how to implement it in subsequent lessons about keys and relationships.

Checkpoint 2 Passed
2.
We have populated the author table with sample data.

In script.sql

write a query to the author table to see its content
add another query to select everything from the book table
Study the columns in the book table. How do we know which book is written by a particular author? Which columns in the book and author table would be useful to associate a book with an author and vice versa?

To associate an author with a book, we need to relate the author table to the book table with the type of relationship they have. Can an author write only one book or multiple books? Can a book have only one author or multiple authors?

Do you recall the book schema diagram in the first lesson?book schema diagramThe book_list table connects the book and author tables via the book isbn column and the author email column.

We will discuss this complex relationship between tables and how to implement it in subsequent lessons about keys and relationships.


SELECT * FROM chapter;
SELECT * FROM author;
SELECT * FROM book;


Query Results
id	number	title	content
1	1	Introduction	<h1>Introduction</h1> <p>Welcome! In this lesson, you will learn what a database schema is and how to create one with PostgreSQL. PostgreSQL is a popular database management system that stores information on a dedicated database server instead of on a local file system. The benefits of using a database system include better organization of related information, more efficient storage and faster retrieval.</p>
1	2	Database Schema	<h1>What is Database Schema?</h1> <p>Like an architectural blueprint, a database schema is documentation that helps its audience such as a database designer, administrator and other users interact with a database. It gives an overview of the purpose of the database along with the data that makes up the database, how the data is organized into tables, how the tables are internally structured and how they are externally related to one another.</p>
name	bio	email
Kim Index	Kim has been a professional database designer for 20 years	ki@cp.com
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
Rows: 2
author
name	type
name	character varying
bio	character varying
email	character varying
Rows: 1

*/