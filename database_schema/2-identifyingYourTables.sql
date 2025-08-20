/*
In this exercise, 
we are goign to delve into designing our own database schema.
The purpose of our database is to enable an online bookstore to show its catalog of books to potential buyers
and for a buyer to preview sample chapters for a selected book.
Imagine you are book browsing on Amazon.com

After gathering information for this database, we found that our database should have:

- book information which includes title, isbn, number of pages, price, description, and publisher for an overview of the book.
- author information which include author bio and contact
- book chapter information that is available for online previewing.

As you can see, there is quite a lot of information to maintain in our database.
The next step would be to organize the information in our database into tables.

Take a look at a sample row below if we decide to store all our information in a single table.
For the sake of space, we made the chapter information very small and unrealistic.

+------------+-------------------+-------+-------------------------------+-------+----------------+-------------------------+-----------------------------------+-------------------------------------------------------------+----------+---------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| isbn       | title             | price | description                   | pages | publisher      | author                  | email                             | bio                                                         | chapters | chapter_titles                              | chapter_content                                                                                                                                                                             |
+------------+-------------------+-------+-------------------------------+-------+----------------+-------------------------+-----------------------------------+-------------------------------------------------------------+----------+---------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 1234567890 | Postgres Made Easy| $2.99 | Database Design and Management| 130   | Database Press | {"Alan Keys","Grant Smith"} | {alan@cp.com, grant@cp.com}     | {"Alan Keys has been a database guru for 20 years",          |    2     | {"Design It Right","Key Issue","Secure Your Database"} | {"<h1>Design It Right</h1><p>Lorem Ipsum is simply dummy text ...</p>", "<h1>Key Issue</h1><p>It has survived not only five centuries ...</p>", "<h1>Secure Your Database</h1><p>It was popularised ...</p>"} |
|            |                   |       |                               |       |                |                         |                                   |  "Grant Smith excels in database security issues."}          |          |                                             |                                                                                                                                                                                              |
+------------+-------------------+-------+-------------------------------+-------+----------------+-------------------------+-----------------------------------+-------------------------------------------------------------+----------+---------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

From the information provided, 
does it make sense to organize our data in one table?
Is the table easy to use as is?
Does it have too many columns covering different topics?

What makes up the bulk of this table?
You are correct if you guess it's the chapter content.
The chatper content is usefule when a potential buyer wants to preview a book.
But not all books make their content available to the public.
In such a case, the chapter content columns will be empty.
To make this table easier to use,
storing the chapter content in it's own table makes more logical sense.
This would also make the current table more lightweight and manageable.
Therefore, 
we should restruture this table so that chapter related information resides in its own table.

Now that we are left with a table containing just the book and author information.
What if we are interested in contacting an author without needing to know what books they write?
Would it make snses to consult this table which always links a book to its author?
Or would it make more sense to keep the author information separate as well?
The answer is 'yes' to the latter question.

Let's practice organizing information by identifying tables in the following exercises.

Instructions
Checkpoint 1 Passed
1.
This exercise contains a poorly written schema for a student profile database. Open script.sql and type a query to select the content in the table profile.

You should see results similar to this:

Sample Data for three students

if you would like to make this image bigger, you can expand this panel, or find the image here.

Checkpoint 2 Passed
2.
The profile table contains a lot of columns. It also contains empty values in several columns in the second row. After studying the results from the profile table, how might you reorganize the data and restructure this table?

The profile table contains columns relating to a person’s home, work and school. Since not all students hold down a job leading to empty columns, such as work_position, work_address, work_phone and work_id, it would make sense to separate these columns from the table to constitute its own table. Similarly, one or more columns relating to a person’s education can be empty as well, hence, it also makes sense to group schooling information into its own table.

Therefore, it would make sense to split the profile table into three: profile, work and school. It might also make sense to rename profile to home or personal.

SELECT * FROM profile
WHERE work_address, work_position, work_phone, work_id IS NOT NULL;

Query Results
Database Schema
profile
name	type
name	character varying
age	integer
home_address	character varying
phone	character
home_email	character varying
work_address	character varying
work_position	character varying
work_phone	character
work_id	character varying
school_id	character varying
school_email	character varying
school_address	character varying
Rows: 3


*/