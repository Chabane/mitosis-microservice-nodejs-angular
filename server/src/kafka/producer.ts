import * as kafka from 'kafka-node';

const Producer = kafka.Producer;
const KeyedMessage = kafka.KeyedMessage;
const Client = kafka.Client;
const client = new Client('zookeeper:2181');
const topic = 'topic-mitosis';

const producer = new Producer(client, {requireAcks: 1});

producer.on('ready', function () {
  let message = 'a message';
  let keyedMessage = new KeyedMessage('keyed', 'a keyed message');

  producer.send([
    {topic: topic, partition: 1, messages: [message, keyedMessage]}
  ], function (err, result) {
    console.log(err || result);
    process.exit();
  });
});

producer.on('error', function (err) {
  console.log('error', err);
});

export default producer;
