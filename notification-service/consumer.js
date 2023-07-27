const amqp = require('amqplib');

// RabbitMQ connection string
const connectionString = 'amqp://localhost';

async function consumeMessages() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect(connectionString);
    
    // Create a channel
    const channel = await connection.createChannel();
    
    // Queue name
    const queueName = 'my-queue';

    // Assert the queue exists
    await channel.assertQueue(queueName);

    console.log('Waiting for messages. To exit, press CTRL+C');

    // Consume messages from the queue
    channel.consume(queueName, (msg) => {
      const message = msg.content.toString();
      console.log(`Received message: ${message}`);

      // Acknowledge the message to remove it from the queue
      channel.ack(msg);
    });

  } catch (error) {
    console.error('Error occurred:', error);
  }
}

// Start consuming messages
consumeMessages();
