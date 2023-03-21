import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/container';
import '@shared/infra/typeorm';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import { logger } from '@shared/utils';
import uploadConfig from '@config/upload';
import routes from './routes';
import { getClientLanguage } from './middlewares/getClientLanguage';
import { appErrorHandler } from './middlewares/appErrorHandler';

const app = express();
const port = process.env.PORT || '5000';

app.disable('x-powered-by');

app.use(express.raw({ type: 'image/*', limit: '50mb' }));
app.use('/files', express.static(uploadConfig.directory));

app.use(cors());
app.use(errors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(getClientLanguage);
app.use(routes);

app.use(appErrorHandler);

app.listen(port, () =>
  logger.info(`Server is listening at http://localhost:${port}`),
);
