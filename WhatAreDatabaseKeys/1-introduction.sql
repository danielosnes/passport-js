/*
A database schema gives an overview of the purpose of the database along with the data that makes up the database,
how the data is organized into tables, how the tables are internally structured and how they relate to one another.

Suppose we have successfully created a database schema for a book inventory with three standalone tables
[book], [chapter] and [author].

+-------------------------+
|          book           |
+-------------------------+
| title       varchar(100)|
| isbn        varchar(50) |
| pages       integer     |
| price       money       |
| description varchar(256)|
| publisher   varchar(100)|
+-------------------------+


+-------------------------+
|        chapter          |
+-------------------------+
| id          integer     |
| number      integer     |
| title       varchar(50) |
| content     varchar(1024)|
+-------------------------+


+-------------------------+
|         author          |
+-------------------------+
| name        varchar(50) |
| bio         varchar(100)|
| email       varchar(20) |
+-------------------------+


The book table has these columns:
title,
isbn,
pages,
price,
description,
publisher

The chapter table has these columns:
id
number
title
content

the author table has these columns:
name
bio
email

Because our database tables are not yet related to one another.
our book schema is not complete intil we fine-tune it by providing additional structure.
In this lesson we will learn how to designate certain columns of a database table as keys.

What are keys?
A database key is a column or group of columns in a table that uniquely identifies a row in a table.

Why do we need keys?
Keys enable a database designer to place constraints on the data in a table.
We want to enforce data integrity in our tables so that we avoid duplicity of information and strictly maintain relationships between tables.
For example,
a primary key will ensure that each row in a table is unique.

There are many types of keys:
- Super
- Candidate
- Primary
- Foreign
- Composite
- Secondary

In this course, we will focus on primary, foreign, and composite keys as these are the most commonly used.
*/