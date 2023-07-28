This simple NodeJS consumer application consumes messages from the queue in [Notification Service](../notification-service/). Notification service uses RabbitMQ.

## Running Locally
First, make sure you filled out all the env variables in sample.env and create a `.env` file with all the values set. Otherwise the app will not work.

Set the following values for local development to connect the default rabbit broker at the default address:

```
MQ_URL=amqp://localhost
QUEUE_NAME=my-queue
```

In order to run the consumer so you can see notifications appear in the console every time a new task is created: `npm start`

If you are developing locally, nodemon is useful for automatic restarts, so there is also a dev instruction such as: `npm run dev`