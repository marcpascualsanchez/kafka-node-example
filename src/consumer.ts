import { ConsumerCrashEvent, RequestEvent } from 'kafkajs';
import { kafka, config } from './config';
import { logger } from './logger';

const consumer = kafka.consumer({ groupId: config.groupId });
const log = logger.consumer;

export const consume = async () => {
  // first, we wait for the client to connect and subscribe to the given topic
  await consumer.connect();
  await consumer.subscribe({ topic: config.topic });
  await consumer.run({
    // this function is called every time the consumer gets a new message
    eachMessage: async ({ message }) => {
      // here, we just log the message to the standard output
      log.info(`received message: ${message.value}`);
    },
  });

  const { REQUEST, CRASH } = consumer.events;
  consumer.on(REQUEST, (e: RequestEvent) =>
    log.metric(`request at ${logger.getFormattedTimestamp(e.timestamp)}`)
  );
  consumer.on(CRASH, (e: ConsumerCrashEvent) =>
    log.metric(`crash at ${logger.getFormattedTimestamp(e.timestamp)}`)
  );
};
