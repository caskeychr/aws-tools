const AWS = require('aws-sdk');
const fs = require('fs');

const config = require('../../config/config.json');

async function cloudWatchLogs(service, serviceType) {
  try {
    const cloudwatchlogs = new AWS.CloudWatchLogs({ region: config.region });

    console.log('--- Loading Function [ lambdaLogs ]');

    let logGroupName = ``;
    let serviceName = '';

    switch (serviceType) {
      case 'lambda':
        serviceName = service;
        logGroupName = `/aws/lambda/${serviceName}`;
        break;

      case 'docker':
        serviceName = service;
        logGroupName = `/docker/${serviceName}`;
        break;

      case 'dockerAPIGateway':
        serviceName = 'idmp-api-gateway';
        logGroupName = `/docker/${serviceName}`;
        break;

      default:
        break;
    }

    console.log(logGroupName);

    let capturedEvents = [];

    var params1 = {
      logGroupName: logGroupName,
      descending: true,
    };

    console.log(`** [ lambdaLogs ] : Retrieving a listing of Log Streams`);
    let logStreams = await cloudwatchlogs.describeLogStreams(params1).promise();
    logStreams = logStreams.logStreams;

    for (let item in logStreams) {
      if (parseInt(item) < 6) {
        var params = {
          logGroupName: logGroupName,
          logStreamName: logStreams[item].logStreamName,
          limit: '50',
        };

        console.log(
          `** [ lambdaLogs ] : Retrieving logs for Log Stream: ${params.logStreamName}`
        );
        let logEvents = await cloudwatchlogs.getLogEvents(params).promise();
        logEvents = logEvents.events;

        capturedEvents.push(logEvents);
      }
    }

    await fs.writeFileSync(
      `./logs/${serviceName}.json`,
      JSON.stringify(capturedEvents, null, 4)
    );

    console.log(
      `\n** [ lambdaLogs ] : Output File Created: ./logs/${serviceName}.json`
    );

    return;
  } catch (error) {
    throw error;
  }
}

// cloudWatchLogs('IDMP-Workflow-Update')
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

module.exports.cloudWatchLogs = cloudWatchLogs;
