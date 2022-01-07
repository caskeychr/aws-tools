const AWS = require('aws-sdk');
const { v1: uuidv1 } = require('uuid');

const s3Events = require('../../configFiles/s3Events.json');

async function createS3Events(config) {
  try {
    AWS.config.update({ region: config.region });
    const s3 = new AWS.S3();
    const lambda = new AWS.Lambda();

    let uniqueId = uuidv1();

    let eventConfigurations = [];

    for (let item in s3Events) {
      console.log(
        `--- Clearing Old Lambda Policies: ${s3Events[item].lambdaFunction}`
      );

      // Delete Older Lambda Function Policies
      let getPolicyParams = {
        FunctionName: s3Events[item].lambdaFunction,
      };

      let output = await lambda.getPolicy(getPolicyParams).promise();

      console.log(output);

      let statementIds = [];

      if (output.Policy) {
        let policy = JSON.parse(output.Policy);

        if (policy.Statement) {
          for (let i in policy.Statement) {
            if (policy.Statement[i].Sid) {
              statementIds.push(policy.Statement[i].Sid);
            }
          }
        }
      }

      console.log(statementIds);

      for (let i in statementIds) {
        var params = {
          FunctionName: s3Events[item].lambdaFunction,
          StatementId: statementIds[i],
        };

        console.log(params);

        await lambda.removePermission(params).promise();
      }

      console.log(
        `--- Attaching Lambda Policy: ${s3Events[item].lambdaFunction}`
      );

      // Add New Lambda Function Policies
      let lambdaPermissionParams = {
        Action: 'lambda:InvokeFunction',
        FunctionName: s3Events[item].lambdaFunction,
        Principal: 's3.amazonaws.com',
        SourceAccount: config.awsID,
        SourceArn: `arn:aws:s3:::${config.bucket}`,
        StatementId: uniqueId,
      };

      await lambda.addPermission(lambdaPermissionParams).promise();

      console.log(`--- Policy Attached: ${s3Events[item].lambdaFunction}`);

      let filterRules = [];

      if (s3Events[item].prefix) {
        filterRules.push({
          Name: 'prefix',
          Value: s3Events[item].prefix,
        });
      }

      if (s3Events[item].suffix) {
        filterRules.push({
          Name: 'suffix',
          Value: s3Events[item].suffix,
        });
      }

      let arn = s3Events[item].lambdaFunctionArn;

      const regionReplacer = new RegExp('&&Region&&', 'g');
      arn = arn.replace(regionReplacer, config.region);

      const idReplacer = new RegExp('&&AccountID&&', 'g');
      arn = arn.replace(idReplacer, config.awsID);

      let eventConfiguration = {
        Id: s3Events[item].eventName,
        Events: ['s3:ObjectCreated:*'],
        LambdaFunctionArn: arn,
        Filter: {
          Key: {
            FilterRules: filterRules,
          },
        },
      };

      eventConfigurations.push(eventConfiguration);
    }

    console.log('Creating Event');
    let bucketNotificationParams = {
      Bucket: config.bucket,
      NotificationConfiguration: {
        LambdaFunctionConfigurations: eventConfigurations,
      },
    };

    console.log(bucketNotificationParams);
    await s3
      .putBucketNotificationConfiguration(bucketNotificationParams)
      .promise();
    console.log('event created');

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.createS3Events = createS3Events;
