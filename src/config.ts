import { Kafka } from 'kafkajs';

const groupId = 'my-app';
const brokers = ['localhost:9093', 'localhost:9094'];
const config = {
  // the client ID lets kafka know who's producing the messages
  groupId,
  // we can define the list of brokers in the cluster
  brokers,
  // this is the topic to which we want to write messages
  topic: 'node-example-topic',
  produceInterval: 1000,
};

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId: groupId, brokers });

export { config, kafka };
