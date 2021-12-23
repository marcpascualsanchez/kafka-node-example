import { kafka, config } from './config';
import { logger } from './logger';

const admin = kafka.admin();
const log = logger.admin;

export async function startAdminLog() {
  try {
    await admin.connect();
    const initialTopics = await admin.listTopics();
    log.info('Initial topics are: ');
    log.info(initialTopics);

    setInterval(async () => {
      const offsets = await admin.fetchOffsets({
        topic: config.topic,
        groupId: config.groupId,
      });
      log.info(offsets);
    }, 5000);
  } catch (error) {
    log.error(error);
    await admin.disconnect();
  }
}
