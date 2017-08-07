import { Consumer, Offset, Client } from 'kafka-node';
import { pubsub } from '../schema';
import { Cell, CellType, ICell } from '../db';

import { info, error } from 'winston';

export class KafkaConsumer {

  consumer: Consumer;
  offset: Offset;

  constructor() {
    let topic = 'topic-mitosis';

    let client = new Client('192.168.0.32:2181');
    let topics = [
      { topic: topic, partition: 0 }
    ];

    let options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

    this.consumer = new Consumer(client, topics, options);
    this.offset = new Offset(client);
  }

  initialize() {
    /*
     * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
     */
    this.consumer.on('offsetOutOfRange', this.onOffsetOutOfRange);
    this.consumer.on('message', this.onMessage);
    this.consumer.on('error', this.onError);
  }

  onOffsetOutOfRange(topic) {
    topic.maxNum = 2;
    this.offset.fetch([topic], function (err, offsets) {
      if (err) {
        return error(err);
      }
      var min = Math.min(offsets[topic.topic][topic.partition]);
      this.consumer.setOffset(topic.topic, topic.partition, min);
    });
  }

  async onMessage(result) {
    let newCell = JSON.parse(result.value);
    let cell = await Cell.save(newCell as ICell);
    pubsub.publish('newCell', { newCell: cell });
  }

  onError(err) {
    info('error', err);
  }
}
