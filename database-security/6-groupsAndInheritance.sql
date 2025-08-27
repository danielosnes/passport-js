/*
Earlier in this lesson,
we mentioned the fact that all roles in PostgreSQL are either login or group roles.
In PostgreSQL, any role can be assigned to be a member of another role.
For example, [alice], [bob], and [charlie] can each be login roles,
and they can also all be members of a group role called [employees].
As members of a group role, these accounts can inherit certain permissions from [employees].
If a superuser granded [SELECT] on a table to [employees], [alice], [bob], and [charlie] would also be able to [SELECT] on this table because they're "members" of [employees].

This is a useful feature for maintaining databases with many users, but only a few "types" of users.
You could have a DB with hundreds of users, but if their permissions are managed through just a few group roles, the job of maintaining permissions is far simpler.

However, members in a group don't necessarily all share the exact same permissions.
Consider the example below.
[alice] and [bob] are both members of [employees].
[alice] ([marketing]) and [bob] ([marketing] and [sales]) are also both members of additional group roles.
Because they're members of these group roles, they also have all the permissions granded to these roles.
Finally, they also have permissions granded only to their login role.

                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
            ---------------------------------------------------------------------------.            
            *##########################################################################-            
            *##########################################################################-            
            *##############################GROUP MEMBERSHIP############################-            
            *##########################################################################-            
            *##############***###*###################**#**#####**#######*##############-            
            *#############*:-+*+*:*++*+*#############= +:.*+**+-=**+++-+-*++*++*#######-            
            *#############*=:-SALES.:=.-#############=::-:=::MARKETING.+::=:-::-#######-            
            *#############*++*++++*++*++#############**#*+++++***+*++*+*++*+*=:=#######-            
            *########################*****###################****#############*########-            
            *################**++============+**#####**++===========++**###############-            
            *#############*+====++++******++++===+*+===+++++******++++===+*############-            
            *###########*===++****++++++++++****+:..=*****++++++++++****++==+##########-            
            *#########*==+***++++++++++++++++*+-::::::=**+++++++++++++++***+=-+########-            
            *########+-+**+++++++++++++++++**=::::::::.:+*+++++++++++++++++**+==*######-            
            *######*==**++++++++++++++++++**-.::::::::::.+*++++++++++++++++++**+-*#####-            
            *######-=*+++++++++++++++++++**-.::::::::::::.+*+++++++++++++++++++*+-*####-            
            *#####==*++++++++++++++++++++*-.::::::::::::::.+*+++++++++++++++++++*+-*###-            
            *####+-*++++++++++++++++++++*=.:::::::::::::::::*++++++++++++++++++++*==###-            
            *####-+*++++++++++++++++++++*::::::::::::::::::.=*++++++++++++++++++++*:*##-            
            *####-+*+++++++++++++++++++*:::::::::::::::::::.-*++++++++++++++++++++*:*##-            
            *####-+*+++++++++++++++++++*::::::::::::::::::::-+++++++++++++++++++++*:*##-            
            *####-+*+++++++++++++++++++=::::::::BOB:::::::::=+++++++++ALICE+++++++*:*##-            
            *#####=*++++++++++++++++++=::::::::::::::::::::::=++++++++++++++++++++*=*##-            
            *#####==*+++++++++++++++++:::::::::::::::::::::::.=++++++++++++++++++*+-*##-            
            *######-=*+++++++++++++++::::::::::::::::::::::::.-++++++++++++++++*+-*###-            
            *######*==*+++++++++++++=:::::::::::::::::::::::::.+++++++++++++++*+=*####-            
            *#######=-**+++++++++++*:::::::::::::::::::::::::::*+++++++++++++*+=*#####-            
            *########+-=**+++++++++*:::::::::::::::::::::::::::*+++++++++++**==*######-            
            *#########=.-+**++++++*+:::::::::::::::::::::::::::+*++++++***+-.+#########-            
            *###########=..:=+***+*:::::::::::::::::::::::::::::*+****+=-..:+##########-            
            *#############*:..::::-::::::::::::::::::::::::::::.:::::..:-=+############-            
            *################+=-:.:::::::::::::::::::::::::::::::::.:=+################-            
            *####################*+-:.::::::::::::::::::::::::..:-+*###################-            
            *#######################*+=-:.:::::::::::::::::.:=+*#######################-            
            *###########################*+=-:..:::::::..:-=+*##########################-            
            *###############################*++=-::::-=++*#############################-            
            *####################################*+++**################################-            
            *##########################################################################-            
            *##########################################################################-            
            *##########################################################################-            
            *##########################################################################-            
            *################################EMPLOYEES#################################-            
            *##########################################################################-            
            *##########################################################################-            
            *##########################################################################-            
            *##########################################################################-            
            *##########################################################################-            
            *##########################################################################-            
            *##########################################################################-            
            *##########################################################################-            
            *##########################################################################-            
            *##########################################################################-            
            *##########################################################################-            
            *##########################################################################-            
            *##########################################################################-            
\\                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
              ...:::::..                                                                            
           ::-----:::--:::..                                                                        
        .:---------:--------:.                                                                      
       :----------------------:.                                                                    
      ----[Bob]---------=-------:. ------------------ Can create tables in 'marketing' + can create/drop tables in 'sales'                                                                 
     -------------=+**#####**+=---:                                                                 
    :-----------+*##############+---:                                                               
    ----------=##########+++******=:-:.                                                             
   .--------:+###[SALES]#***#######+:---. ------------------- can insert/update/delete on tables in marketing                                                          
   .--------=#####+====*##########*#=:---:.                                                         
    -------:*##############*****####*==----:                                                        
    .-------*############**##%%%%%%%%+##*+---.                                                      
     :-----:*###########*#%%%%%##*##*+*****=::.                                                     
      :-----=#########**%%%%%%%###%%*******#*-:                                                     
       .-----*#######[EMPLOYEES]**#%+########*-. ------------------ can read in 'marketing' and 'sales'                                                  
         .----+######*#%###*##*####*##########+:                                                    
           :---=*####+%%%%%%%%%%%#*###***#####*:                                                    
             :---=+*#+%%%%%%%%#***####*++******.                                                    
              .:------+#####***##**#**#**#####*                                                     
                .:-----[MARKETING]==+====+=*##: ---------------------- can insert/update/delete on tables in 'marketing'                                                   
                  .----=#####################-                                                      
                    :----*#################*:                                                       
                      :---=*#############*-                                                         
                        .::--=+**###**+-.                                                           
                            ....::...                                                               
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
           :-=+++++=-.                                                                              
        :+*###########*=.                                                                           
      :*#################+.                                                                         
     -##########*++********-                                                                        
    -###########**+********#*-                                                                      
   .##########################*-                                                                    
   -######*[EMPLOYEES]*########*: ---------------------- can read in 'market' and 'sales'                                                               
   =######*+**++*++++++*##########+.                                                                
   -#####################*********##+.                                                              
    *#################*****#*++**+++**-                                                             
    :###############*+*#####*++*****++**-                                                           
     :*############*+#################**#*:                                                         
       =##########*+###++********######*+*#+:                                                       
        .=########+[MARKETING]+=*#######*+*#+.   ------------------- can insert/update/delete on tables in 'marketing'                                                 
          .+######+###############*********++*#=                                                    
            :+####+#############**##%%%%%%%#*++#+                                                   
              -*##+*##########**#%%%%%%%##%%%#*=*=                                                  
                -*#+*########**%%%%%%%%%**#####*-+.                                                 
                  =***#######+%%%%%%%%%%%%%%%%%%*+-                                                 
                   .+***####*#%%%%%%#%#%%%%%%%%%%=:                                                 
                     :+***##*#%%%%%[ALICE]%%%%%%%=.   ---------------- can create/drop tables in 'marketing'                                              
                       :+**##*%%%%%%%%%%%%%%%%%%#:                                                  
                         -****#%%%%%%%%%%%%%%%%%-                                                   
                           =**+*%%%%%%%%%%%%%%#-                                                    
                            .=+++#%%%%%%%%%%#=                                                      
                               :--==+***+=-.        

There are some "gotchas" with role inheritance that you should be aware of.
For security reasons, PostgreSQL disallows the inheritance of certain permissions such as [LOGIN], [SUPERUSER], [CREATEDB], and [CREATEROLE].
This prevents a developer from accidentally granting high level permissions to a wide group of users.

There are several ways to create a new group role:

Using [CREATE ROLE] and the [WITH ROLE] option when creating a role - this automatically adds the listed names to the role.

CREATE ROLE marketing WITH NOLOGIN ROLE alice, bob;

Using [CREATE ROLE] and [GRANT] statement - this grants all the permissions of the newly created role to the listed names.

CREATE ROLE finance with NOLOGIN;

GRANT finance TO charlie;

You can also add users to group(s) on creation by specifying [IN ROLE] along with the [CREATE ROLE] statment.

CREATE FROM fran WITH LOGIN IN ROLE employees, managers;
*/

/*
1.
Create a group role called pgdba (Postgres Database Administrator) with SUPERUSER, CREATEDB, and NOLOGIN permissions. For the moment, do not include any roles within the group role.

To create a group role, you can use a CREATE ROLE statement and list the permissions for the role in the statement.

CREATE ROLE pgdba WITH <list of permissions>; 

Copy to Clipboard
----------------------------------------------------------------------------------------------------
CREATE ROLE pgdba WITH SUPERUSER CREATEDB NOLOGIN;
----------------------------------------------------------------------------------------------------

*/

/*
2.
Create a user named david with LOGIN. david should be added as a member of two (already existing) groups.

pgdba - The group you created in the previous exercise
employees - A group that already exists on the DB.
You can include IN ROLE in your CREATE ROLE statement to add a newly-created role to a group (or groups). Fill in the SQL below to add david to pgdba and employees.

CREATE ROLE david WITH <permission> IN ROLE <list of group roles>; 

----------------------------------------------------------------------------------------------------
CREATE ROLE david WITH LOGIN IN ROLE pgdba, employees;
----------------------------------------------------------------------------------------------------

*/

/*
3.
Using the PostgreSQL internal tables, confirm that david doesn’t have superuser permissions. Write a SELECT statement that returns rolname and rolsuper for david from pg_catalog.pg_roles.

Recall that you can use the table pg_catalog.pg_roles to check the permissions of roles in the database. Use the SQL below to pull the permissions for david

SELECT rolname, _____ 
FROM pg_catalog.pg_roles 
WHERE rolname = <role name>;

Copy to Clipboard
----------------------------------------------------------------------------------------------------
SELECT rolname, rolsuper
FROM pg_catalog.pg_roles
WHERE rolname = 'david';
----------------------------------------------------------------------------------------------------

*/

/*
.
Let’s confirm that david has inherited permissions from employees. employees has access to SELECT from a table named company_startdates. Do you expect david to have access to this table? Run the SQL below to test your hypothesis.

SET ROLE david;

SELECT * 
FROM cc_user.company_startdates;

Copy to Clipboard

Run the SQL given in the prompt to confirm that david has inherited permissions from employees.
----------------------------------------------------------------------------------------------------
SET ROLE david;

SELECT * FROM cc_user.company_startdates;
----------------------------------------------------------------------------------------------------
Query Results
rolname	rolsuper
david	f
name	start_dt
alice	2020-01-01
bob	2020-06-01
charlie	2020-01-01
david	2021-08-01
Database Schema
company_startdates
name	type
name	character varying
start_dt	date
Rows: 4

*/

/*

----------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------

*/

/*

----------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------

*/