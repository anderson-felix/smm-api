import 'reflect-metadata';
import axios from 'axios';
import path from 'path';
import * as dotenv from 'dotenv';

import { logger } from '@shared/utils';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const api = axios.create({
  baseURL: process.env.APP_API_URL || 'http://localhost:3000',
});

(async function populate() {
  logger.info('Populating database...');

  await api
    .post(`dev/populate/${process.env.POPULATE_SECRET}`)
    .then(() => logger.info('POPULATE - SUCCESS!'))
    .catch(err => logger.info(`POPULATE - ERROR: ${err}`));
})();
