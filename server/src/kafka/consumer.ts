import { Consumer, Offset, Client } from 'kafka-node';

export class KafkaConsumer {

  consumer: Consumer;
  offset: Offset;

  constructor() {
    const topic = 'topic-mitosis';

    const client = new Client('192.168.1.108:2181');
    const topics = [
      { topic: topic, partition: 0 }
    ];

    const options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

    this.consumer = new Consumer(client, topics, options);
    this.offset = new Offset(client);
  }

  initilize() {

    /*
     * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
     */
    this.consumer.on('offsetOutOfRange', function (topic) {
      topic.maxNum = 2;
      this.offset.fetch([topic], function (err, offsets) {
        if (err) {
          return console.error(err);
        }
        var min = Math.min(offsets[topic.topic][topic.partition]);
        this.consumer.setOffset(topic.topic, topic.partition, min);
      });
    });

    this.consumer.on('message', function (message) {
      console.log('message', message);
    });

    this.consumer.on('error', function (err) {
      console.log('error', err);
    });
  }
}
