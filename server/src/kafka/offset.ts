import { Client, Offset, OffsetCommitRequest } from 'kafka-node';

export class KafkaOffset {
  offset: Offset;
  private topic = 'topic-mitosis';
  constructor() {
    this.offset = new Offset(new Client(""));
    // Fetch available offsets
    this.offset.fetch([
      { topic: this.topic, partition: 1, maxNum: 2 }
    ], (err, offsets) => {
      console.log(err || offsets);
    });
    const offsetCommitRequest = [{ topic: this.topic, partition: 1 }] as OffsetCommitRequest[];
    // Fetch commited offset
    this.offset.commit('mitosis-group', offsetCommitRequest, this.onCommit);
  }

  initialize() {

  }

  onCommit(err, result) {
    console.log(err || result);
  }
}
