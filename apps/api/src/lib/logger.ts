import winston from 'winston';

const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};
const logger = winston.createLogger({
  levels: customLevels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'api' },
  transports: [],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.simple()
    ),
  })
);

// Log to a file if running in production mode
if (process.env.NODE_ENV === 'production') {
  logger.add(
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  );
  logger.add(new winston.transports.File({ filename: 'combined.log' }));
}

export default logger;
