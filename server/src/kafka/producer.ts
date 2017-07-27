import { kafka } from 'kafka-node';

var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.Client;
var client = new Client('zookeeper:2181');
var topic = 'topic-mitosis';

var producer = new Producer(client, {requireAcks: 1});

producer.on('ready', function () {
  var message = 'a message';
  var keyedMessage = new KeyedMessage('keyed', 'a keyed message');

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
