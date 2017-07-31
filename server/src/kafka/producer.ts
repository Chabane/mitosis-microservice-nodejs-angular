import { Producer, KeyedMessage, Client } from 'kafka-node';

export class KafkaProducer {

  producer: Producer;
  private topic = 'topic-mitosis';

  constructor() {
    const client = new Client('zookeeper:2181');
    this.producer = new Producer(client, { requireAcks: 1 });
  }

  initialize() {
    this.producer.on('ready', this.onReady);
    this.producer.on('error', this.onError);
  }

  onReady() {
    let message = 'a message';
    let keyedMessage = new KeyedMessage('keyed', 'a keyed message');
    this.producer.send([
      { topic: this.topic, partition: 1, messages: [message, keyedMessage] }
    ], function (err, result) {
      console.log(err || result);
      process.exit();
    });
  }

  onError(err) {
    console.log('error', err);
  }
}