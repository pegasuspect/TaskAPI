const amqp = require('amqplib/callback_api');

// RabbitMQ
const url = 'amqp://localhost';

let rabbit = {
  queue: 'my-queue',
};

rabbit.channel = null;
amqp.connect(url, function (err, conn) {
  if (!conn) {
    throw new Error(`AMQP connection not available on ${url}`);
  }
  conn.createChannel(function (err, ch) {
    rabbit.channel = ch;
  });
});

process.on('exit', code => {
  rabbit.channel.close();
  console.log(`Closing connection.`);
});

module.exports = {
  rabbit
};