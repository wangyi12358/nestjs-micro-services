import { INestApplication, INestMicroservice } from '@nestjs/common';
import { join } from 'path';
import * as winston from 'winston';

export function createLogger(name: string) {
  const currentDate = new Date();
  const dateString = currentDate.toISOString().slice(0, 10);
  const logFilePath = join(
    __dirname,
    '../../../..',
    'logs',
    name,
    `${dateString}.log`,
  );
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.File({ filename: logFilePath, level: 'info' }),
    ],
  });
}

export function useLogger(
  app: INestMicroservice | INestApplication<any>,
  name: string,
) {
  const logger = createLogger(name);
  app.useLogger({
    log: (message) => logger.info(message),
    error: (message, trace) => logger.error(message, { trace }),
    warn: (message) => logger.warn(message),
    debug: (message) => logger.debug(message),
    verbose: (message) => logger.verbose(message),
  });
}
