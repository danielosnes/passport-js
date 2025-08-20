/*
A primary key is a designation that applies to a column or multiple columns of a table that 
uniquely identifies each row in the table.
For example,
a Social Security Number for an employee may serve as a primary key in an employee table,
with rows of employee data.

Designating a primary key on a particular column in a table ensures that this column data is always unique and not null.
For example,
there may be multiple recipes of the same name,
each with its own id but no two recipes should share the same id.

To designate a primary key in a table type [PRIMARY KEY] keyword in all caps next to the selected column when creating a table.
For example,
The following code designates the [id] column as the primary key for the [recipe] table.

CREATE TABLE recipe (
    id integer PRIMARY KEY,
    name varchar(20),
    ...
);


Instructions
Checkpoint 1 Passed
1.
Open script.sql, and study the CREATE TABLE statement for the book table. Which column in the book table would you designate as the primary key?

In script.sql, edit the book table to designate the correct column as the primary key.

Remember that this column has to uniquely identify a book. If you pick isbn, you would be correct since no two books can share the same ISBN.

Type the keyword PRIMARY KEY next to isbn before the comma.

Checkpoint 2 Passed
2.
In script.sql, study the CREATE TABLE statement for the chapter table. Think for a moment which column in this table would make an ideal primary key.

In script.sql, edit the chapter table to designate the correct column as the primary key.

Multiple books may share the same chapter numbers and titles. The same book of revised editions may even share similar chapter content. This leaves id as the ideal primary key.

Type the keyword PRIMARY KEY next to id before the comma.

Checkpoint 3 Passed
3.
In script.sql, study the CREATE TABLE statement for the author table. Think for a moment which column in this table would make an ideal primary key.

In script.sql, edit the author table to designate the correct column as the primary key.

The email column would be perfect as we assume each author has a unique email address. Making email a primary key ensures this.

Type the keyword PRIMARY KEY next to email before the comma.

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
  number integer,
  title varchar(50),
  content varchar(1024)
);

CREATE TABLE author (
  name varchar(50),
  bio varchar(100),
  email varchar(20) PRIMARY KEY
);



Query Results
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