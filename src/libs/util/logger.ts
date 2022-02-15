import winston from 'winston';
import 'winston-daily-rotate-file';

const { LOG_LEVEL } = process.env;

const format = winston.format.combine(
  winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
  winston.format.printf(({ timestamp, message }) => [timestamp, message].join()),
);
;
const timestamp = () => new Date().toISOString();

const params = {
  datePattern: 'YYYY-MM-DD',
  timestamp,
  format,
};

export const logger = winston.createLogger({ format });
