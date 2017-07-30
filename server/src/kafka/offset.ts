import { Client, Offset, OffsetCommitRequest } from 'kafka-node';

const offset = new Offset(new Client(""));
const topic = 'topic-mitosis';

// Fetch available offsets
offset.fetch([
  { topic: topic, partition: 1, maxNum: 2 }
], function (err, offsets) {
  console.log(err || offsets);
});

const offsetCommitRequest = [{ topic: topic, partition: 1 }] as OffsetCommitRequest[];

// Fetch commited offset
offset.commit('kafka-node-group', offsetCommitRequest, function (err, result) {
  console.log(err || result);
});
