You will have to create a database with name `sword_health_tasks` in order for the app to connect to it. 

In order to do that:
1. Open your terminal in the project directory, 
2. cd into the task-service folder `cd task-service`. 
   - At this point when you type in `pwd` in terminal the prompt should show something like `......./TaskBackendService/task-service`
3. Make sure you have docker desktop installed and the deamon is running by typing `docker version` in your terminal. You should get a response with version numbers.
4. `docker-compose up`
5. Once everything is running, go to http://localhost:81
6. Login with following credentials; username: root, password: root, db: mysql
7. Now, click on the link to the top left starting with "SQL", paste in the following command and click execute. Success means you have created the database.
   - `CREATE DATABASE IF NOT EXISTS sword_health_tasks;`
8. Finally, restart the backend node app so it picks up the new database from mysql database, this also connects the ORM software I used, sequelize and if the tables do not exist, sequelize creates them using the [databaseModels](backend/databaseModels).
9. Finally, you will need certain users inserted in the database in order for authentication and authorization to work. You can execute the following SQL statement like you did with creating the database on #7:
```SQL
SET NAMES utf8mb4;

INSERT INTO `Users` (`id`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1,	'technician@company.com',	'hash123',	'Technician',	'2023-07-27 03:45:33.000',	'2023-07-27 03:45:33.000'),
(2,	'admin@localhost',	'anotherHash',	'Manager',	'2023-07-27 03:46:23.000',	'2023-07-27 03:46:23.000');
```
10. Go back to main readme



