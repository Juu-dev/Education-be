import { createLogger, format, transports } from 'winston';
import path from 'path';
import { COMMON_CONSTANT } from '@n-constants';

export const logger = ({ infoFile, errorFile }) =>
  createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: COMMON_CONSTANT.LOG_TIMESTAMP_FORMAT,
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
    ),
    defaultMeta: { service: 'category-sync-data' },
    transports: [
      new transports.File({
        filename: path.join(__dirname, `../../logs/${errorFile}`),
        level: 'error',
      }),
      new transports.File({
        filename: path.join(__dirname, `../../logs/${infoFile}`),
      }),
    ],
  });

export const devLogger = logger({
  infoFile: 'dev-info.log',
  errorFile: 'dev-error.log',
});
