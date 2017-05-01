var async = require('async');
var ConsumerGroup = require('kafka-node').ConsumerGroup;

var consumerOptions = {
  host: 'zookeeper:2181',
  groupId: 'mitosis',
  sessionTimeout: 15000,
  protocol: ['roundrobin'],
  fromOffset: 'earliest' // equivalent of auto.offset.reset valid values are 'none', 'latest', 'earliest'
};

var topics = ['topic-mitosis'];

var consumerGroup = new ConsumerGroup(Object.assign({id: 'foo'}, consumerOptions), topics);
consumerGroup.on('error', onError);
consumerGroup.on('message', onMessage);

function onError (error) {
  console.error(error);
  console.error(error.stack);
}

function onMessage (message) {
  console.log('%s read msg Topic="%s" Partition=%s Offset=%d', this.client.clientId, message.topic, message.partition, message.offset);
}

process.once('SIGINT', function () {
  async.each([consumerGroup], function (consumer, callback) {
    consumer.close(true, callback);
  });
});
