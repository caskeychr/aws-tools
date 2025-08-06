const AWS = require('aws-sdk');

async function invokeLambdaFunc(config, lambdaFunction, event) {
  try {
    let region = config.region;
    AWS.config.update({ region: region });

    const lambda = new AWS.Lambda();

    var params = {
      FunctionName: lambdaFunction,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(event),
    };

    let response = await lambda.invoke(params).promise();
    response = response.Payload;
    response = JSON.parse(response);

    return response;
  } catch (error) {
    throw error;
  }
}

module.exports.invokeLambdaFunc = invokeLambdaFunc;
