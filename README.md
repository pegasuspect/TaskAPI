# Task Micro Services [![Unit Tests](https://github.com/pegasuspect/TaskBackendService/actions/workflows/node.js.yml/badge.svg)](https://github.com/pegasuspect/TaskBackendService/actions/workflows/node.js.yml)
A simple micro services architecture that runs on NodeJS on ExpressJS framework using Sequelize for ORM to a MySQL database, and occasionally sends notifications to a queue on RabbitMQ.

# Documentation
Each service is seperated in their own folder. Each folder has a readme file for instructions on how to intialize and run locally.
- [MySQL Database](./database/)
- [NodeJS Backend API](./backend/)
- [RabbitMQ Notification Service with NodeJS Consumer](./backend/)
