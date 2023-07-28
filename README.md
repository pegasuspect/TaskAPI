# Task Micro Services [![Unit Tests](https://github.com/pegasuspect/TaskMicroServices/actions/workflows/node.js.yml/badge.svg)](https://github.com/pegasuspect/TaskMicroServices/actions/workflows/node.js.yml)
A simple micro services architecture that runs on NodeJS on ExpressJS framework using Sequelize for ORM to a MySQL database, and occasionally sends notifications to a queue on RabbitMQ. There is also a consumer service that listens to the notifications from the queue on RabbitMQ.

# Architecture Diagram
You can make updates to this diagram by importing [this drawio xml file](./ArchitectureDiagramEdit.drawio) at [draw.io](https://draw.io)

![Architecture Diagram](./ArchitectureDiagram.png)

# Running Locally
You can simply run the following commands with Docker Desktop & git installed on your machine to start this microservices project with dummy data included! 

```
git clone https://github.com/pegasuspect/TaskMicroServices.git
cd TaskMicroServices;
docker-compose build
docker-compose up -d
```

For individual service testing and development you can also find docker-compose files inside the subfolders that correspond to the micro service.

# Documentation
Each service is seperated in their own folder. Each folder has a readme file for instructions on how to intialize and run locally. Please intialize each service in the following order to have a clean start:

### Services
1. [MySQL Database with Adminer for Quick Web Inspection](./database/README.md)
2. [NodeJS Backend API](./backend/README.md)
3. [RabbitMQ Notification Service](./notification-service/README.md)
4. [NodeJS Notification Consumer Service](./consumer-service/README.md)
