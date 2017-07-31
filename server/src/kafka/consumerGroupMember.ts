import * as async from 'async';
import { ConsumerGroup, ConsumerGroupOptions } from 'kafka-node';

export class KafkaConsumerGroupMember {
  consumerGroup: ConsumerGroup;

  constructor() {
    const consumerOptions = {
      host: 'zookeeper:2181',
      groupId: 'mitosis',
      sessionTimeout: 15000,
      protocol: ['roundrobin'],
      fromOffset: 'earliest' // equivalent of auto.offset.reset valid values are 'none', 'latest', 'earliest'
    };

    const topics = ['topic-mitosis'];
    const options = Object.assign({ id: 'mitosis-group' }, consumerOptions) as ConsumerGroupOptions;
    this.consumerGroup = new ConsumerGroup(options, topics);
  }

  initialize() {
    this.consumerGroup.on('error', this.onError);
    this.consumerGroup.on('message', this.onMessage);
    process.once('SIGINT', this.onSigInt);
  }

  onSigInt() {
    async.each([this.consumerGroup], (consumer, callback) => {
      consumer.close(true, callback);
    });
  }

  onError(error) {
    console.error(error);
    console.error(error.stack);
  }

  onMessage(message) {
    console.log('read msg Topic="%s" Partition=%s Offset=%d', message.topic, message.partition, message.offset);
  }

}