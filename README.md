# TaskBackendService
A backend service that runs on NodeJS on ExpressJS framework using sequelize for ORM to a mysql database.

## Running Locally
Following explanations are only for local development. Please do not follow any of the instructions for a production environment!

### How to Intialize Database Locally
Follow the readme guide in the [database](./database/) folder.

### How to Initialize Task Backend Locally
Follow the readme guide in the [backend](./backend/) folder.


### How to use the Backend Service
Since the API is very simple and the data is also not complicated, you can simply import the [Postman collection](./backend/TasksService.postman_collection.json) and send requests as you please. Some of the endpoints add and update records.

#### How to Authenticate
The api doesn't have endpoints for user management, however it supports a simple dummy session by hittin the `/session` endpoint. You will be assigned a user with id: 1 from the database. That user has a Technician role. Therefore, some endpoints will return 401/Unauthorized response, like delete.

#### How to Authenticate as an Admin
In order to make this easy, I have added a loginAs query parameter to session endpoint. loginAs is an interger parameter and corresponds to the user's id in the database. 

TLDR; Session endpoint will only update the current user in the session if you first use `/logout` endpoint.
