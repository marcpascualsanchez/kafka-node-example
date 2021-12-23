import { RequestEvent } from 'kafkajs';
import { kafka, config } from './config';
import { logger } from './logger';

const producer = kafka.producer();
const log = logger.producer;

// we define an async function that writes a new message each second
export const produce = async () => {
  await producer.connect();

  startProduceLoop();

  const { REQUEST } = producer.events;
  producer.on(REQUEST, (e: RequestEvent) =>
    log.metric(`request at ${logger.getFormattedTimestamp(e.timestamp)}`)
  );
};

function startProduceLoop() {
  let i = 0;
  // after the produce has connected, we start an interval timer
  setInterval(async () => {
    try {
      // send a message to the configured topic with
      // the key and value formed from the current value of `i`
      await producer.send({
        topic: config.topic,
        messages: [
          {
            key: String(i),
            value: 'message from producer ' + i,
          },
        ],
      });

      // if the message is written successfully, log it and increment `i`
      log.info(`writes: ${i}`);
      i++;
    } catch (err) {
      log.error('could not write message ' + err);
    }
  }, config.produceInterval);
}
