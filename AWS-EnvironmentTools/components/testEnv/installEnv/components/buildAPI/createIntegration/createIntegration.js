// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

// Config

async function createIntegration(config, httpMethod, resourceId, stateMachine) {
  try {
    AWS.config.update({ region: config.region });

    const apigateway = new AWS.APIGateway();

    let params = {
      httpMethod: httpMethod /* required */,
      resourceId: resourceId /* required */,
      restApiId: config.apiID /* required */,
      type: 'AWS' /* required */,
      integrationHttpMethod: httpMethod,
      uri: `arn:aws:apigateway:${config.region}:states:action/StartExecution`,
      credentials: config.stepFunctionRole,
      passthroughBehavior: 'WHEN_NO_TEMPLATES',
      requestTemplates: {
        'application/json': `{
        "input": "$util.escapeJavaScript($input.json('$'))",
        "stateMachineArn": "arn:aws:states:${config.region}:${config.awsID}:stateMachine:${stateMachine}"
        }`,
      },
    };

    await apigateway.putIntegration(params).promise();

    // let params = {
    //   httpMethod: 'POST' /* required */,
    //   resourceId: 'phkarp' /* required */,
    //   restApiId: config.apiID /* required */,
    // };

    // let integration = await apigateway.getIntegration(params).promise();

    // console.log(integration);
    // console.log(integration.integrationResponses['200'].responseParameters);
    // console.log(integration.integrationResponses['200'].responseTemplates);

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.createIntegration = createIntegration;
