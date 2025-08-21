/*
In this lesson,
we will learn about relationships between tables and how to use this knowledge to enhance our database.
This lesson is built upon prior knowledge of database keys in the Database Keys lesson.

On the right is a sample database schema diagram.
Let's take a look at what it entails.
There are seven tables in this diagram and most of them are related to each other with the exception of a standalone table,
[popular_books].
In each table, primary keys are bolded.
The lines between tables connect foreign keys and primary keys.

What are relationships?
A database relationship establishes the way in which connected tables are dependent on one another.

What are different types of database relationships?
There are three types:

one-to-one
one-to-many
many-to-many

We will delve into each on in the upcoming exercises.
Let's get started.

+-------------------------+
|          book           |
+-------------------------+
| isbn        varchar(50) PK |
| title       varchar(100)   |
| pages       integer        |
| price       money          |
| description varchar(256)   |
| publisher   varchar(100)   |
+-------------------------+
       | 1
       |
       | *
+-------------------------+
|        chapter          |
+-------------------------+
| id          integer PK  |
| book_isbn   varchar(50) FK |
| number      integer     |
| title       varchar(50) |
+-------------------------+
       | 1
       |
       | *
+-------------------------+
|          page           |
+-------------------------+
| page_number integer PK  |
| chapter_id  integer FK  |
| content     text        |
| header      varchar(20) |
| footer      varchar(20) |
+-------------------------+


+-------------------------+
|      book_details       |
+-------------------------+
| id           integer PK |
| book_isbn    varchar(50)FK|
| rating       decimal    |
| language     varchar(10)|
| keywords     text       |
| date_published date     |
+-------------------------+


+-------------------------+         +-------------------------+        +-------------------------+
|      book_authors       |         |         author          |        |     popular_books       |
+-------------------------+         +-------------------------+        +-------------------------+
| book_isbn    varchar(50)FK ------>| email   varchar(20) PK  |        | book_title   varchar(100)|
| author_email varchar(20)FK        | name    varchar(50)     |        | author_name  varchar(50)|
+-------------------------+         | bio     varchar(100)    |        | number_sold  integer    |
                                     +-------------------------+        | number_previewed integer|
                                                                        +-------------------------+



*/