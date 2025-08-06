const logger = require('./utils/logging');

const { main } = require('./core/main');

let event = {
  bucket: 'cteicloud',
  key: 'inputFiles/NISVS/Collection3/NISVS-Collection3-1M.csv',
};

(async function (event) {
  try {
    logger.info({
      message: `@@ [ Initializing ] @@`,
      input: event,
    });

    let result = await main(event);
    console.log(result);

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
})(event);
