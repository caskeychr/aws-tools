const logger = require('./utils/logging');

const { main } = require('./core/main');

exports.handler = async function (event) {
  try {
    logger.info({
      message: `@@ [ Initializing ] @@`,
      input: event,
    });

    let result = await main(event);

    logger.verbose({
      message: 'Output',
      output: result,
    });

    logger.info({
      message: `@@ [ ExecutionComplete ] @@`,
    });

    return result;
  } catch (error) {
    logger.error({
      message: error.message,
      stack: error.stack,
    });

    throw error;
  }
};
