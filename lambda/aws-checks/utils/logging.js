const { createLogger, format, transports } = require('winston');
const { v1: uuidv1 } = require('uuid');

let uniqueId = uuidv1();

module.exports = createLogger({
  level: 'info',
  format: format.combine(
    format.label({
      label: {
        id: uniqueId,
        service: 'ADMIN-AWS-Checks',
      },
    }),
    format.timestamp(),
    format.json()
    // format.prettyPrint()
  ),
  transports: [
    new transports.Console(),
    // new transports.File({ filename: './logs/combined.log' }),
  ],
  exceptionHandlers: [
    new transports.Console(),
    // new transports.File({ filename: './logs/exceptions.log' }),
  ],
  exitOnError: false,
});
