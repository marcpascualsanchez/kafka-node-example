import { produce } from './producer';
import { consume } from './consumer';
import { startAdminLog } from './admin';
import { logger } from './logger';

async function start() {
  try {
    await consume();
  } catch (error) {
    logger.consumer.error('consumer start failed');
  }
  try {
    await produce();
  } catch (error) {
    logger.producer.error('consumer start failed');
  }
  await startAdminLog();
}

start();
