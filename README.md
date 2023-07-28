# Task Micro Services [![Unit Tests](https://github.com/pegasuspect/TaskBackendService/actions/workflows/node.js.yml/badge.svg)](https://github.com/pegasuspect/TaskBackendService/actions/workflows/node.js.yml)
A backend service that runs on NodeJS on ExpressJS framework using sequelize for ORM to a mysql database, and occasionally send notifications to RabbitMQ.

# Documentation
Each service is seperated in their own folder. Each folder has a readme file for instructions on how to intialize and run locally.
- [MySQL Database](./database/)
- [NodeJS Backend API](./backend/)
- [RabbitMQ Notification Service](./backend/)
