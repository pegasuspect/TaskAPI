## How to Start the Server Locally
1. Open your terminal
2. Make sure you are in this directory by typing `pwd`
   - You should see something like `...../backend`
3. Install packages `npm i`
4. Generate new encryption key using `npm run generate256Key`
5. Start the server `npm start`

### How to Test or Use the Backend Service
Since the API is very simple and the data is also not complicated, you can simply import the [Postman collection](./TasksService.postman_collection.json) and send requests as you please. Some of the endpoints add and update records.

#### How to Authenticate
The api doesn't have endpoints for user management, however it supports a simple dummy session by hittin the `/session` endpoint. You will be assigned a user with id: 1 from the database. That user has a Technician role. Therefore, some endpoints will return 401/Unauthorized response, like delete.

#### How to Authenticate as an Admin
In order to make this easy, I have added a loginAs query parameter to session endpoint. loginAs is an interger parameter and corresponds to the user's id in the database. 

TLDR; Session endpoint will only update the current user in the session if you first use `/logout` endpoint.

#### Errors
Errors are handled by express catch all middleware. 
- 404: There is an udefined route. 
- 401: There is authentication or authorization errors.
- 500: Unexpected error.

All error will also return a stack trace unless the app is running on production. The check for this is on NODE_ENV environment variable.