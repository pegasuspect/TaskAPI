const amqp = require('amqplib');

const mqURL = process.env.MQ_URL;

async function main() {
  try {
    const connection = await amqp.connect(mqURL);
    
    const channel = await connection.createChannel();
    
    const queueName = process.env.QUEUE_NAME;

    // Check queue
    await channel.assertQueue(queueName);

    console.log('Waiting for messages. To exit, press CTRL+C');

    channel.consume(queueName, (msg) => {
      const message = msg.content.toString();
      console.log(`Received message: ${message}`);

      channel.ack(msg);
    });

  } catch (error) {
    console.error('Error occurred:', error);
  }
}

// Run the consumer
main();
