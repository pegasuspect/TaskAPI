You will have to create a database with name `sword_health_tasks` in order for the app to connect to it. 

You will also need to setup the env variables in your `.env` file with the values from your mysql database. Key names are outlines in sample.env file if you need it.

For the purposes of running the db locally you can use the root password. 

Please note; in a production environment or in any case when publishing a porject like this, you will need a specific database user with limited access to only do certain actions on the database! So that, even if your db credentials are somehow leaked from your secret environment variables the access would be limited to the custom db user's you created.

Follow these steps to do so:
1. Open your terminal in the project directory, 
2. cd into the databse folder `cd databse`. 
   - At this point when you type in `pwd` in terminal the prompt should show something like `......./TaskBackendService/databse`
3. Make sure you have docker desktop installed and the deamon is running by typing `docker version` in your terminal. You should get a response with version numbers.
4. `docker-compose up`
5. Once everything is running, go to http://localhost:81 with below credentials:
   1. System: mysql
   2. Server: db
   3. Username: root
   4. Password: root
   5. Database: mysql
6. You can also fill in these values at `.env` file located in [the backend service](../backend/.env) for setting up the database connection from the backend api.
7. Now, click on the link to the top left starting with "SQL", paste in the following command and click execute. Success means you have created the database.
   - `CREATE DATABASE IF NOT EXISTS sword_health_tasks;`
8. Finally, restart the backend node app so it picks up the new database from mysql database, this also connects the ORM package, sequelize, and if the tables do not exist, sequelize creates them using the [databaseModels](../backend/databaseModels).
9.  Finally, you will need certain users inserted in the database in order for authentication and authorization to work. Execute the following SQL statement like you did with creating the database on #7:
```SQL
INSERT INTO `Users` (`id`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1,	'technician@company.com',	'hash123',	'Technician',	'2023-07-27 03:45:33.000',	'2023-07-27 03:45:33.000'),
(2,	'admin@localhost',	'anotherHash',	'Manager',	'2023-07-27 03:46:23.000',	'2023-07-27 03:46:23.000');
```



