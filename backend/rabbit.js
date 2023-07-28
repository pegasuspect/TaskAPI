const amqp = require('amqplib/callback_api');

// RabbitMQ
const url = process.env.MQ_URL;

let rabbit = {
  queue: process.env.QUEUE_NAME,
};

rabbit.channel = null;
amqp.connect(url, function (err, conn) {
  try {
    if (!conn) {
      throw new Error(`AMQP connection not available on ${url}`);
    }
    conn.createChannel(function (err, ch) {
      rabbit.channel = ch;
    });
  } catch (error) {
    console.error(error);
  }
});

process.on('exit', code => {
  try {
    rabbit.channel.close();
  } catch (error) {
    console.error(error);
  }
  console.log(`Closing connection.`);
});

module.exports = {
  rabbit
};