// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Libraries

// Imported Components

// Config
const config = require('../../../../../config/config.json');

async function createDeploymentConfig() {
  try {
    let testConfig = {
      region: config.region,
      DBserver: config.DBserver,
      DBuser: config.DBuser,
      DBpassword: config.DBpassword,
      DBdatabase: config.DBdatabase,
    };

    let s3PutParams = {
      Body: JSON.stringify(testConfig),
      Bucket: config.bucket,
      Key: `testConfig/default.json`,
    };

    console.log(`--- Uploading Test Environment Config to S3`);
    await s3.putObject(s3PutParams).promise();

    console.log(`--- Generating Test Environment Config Complete`);

    return;
  } catch (error) {
    throw error;
  }
}

// createDeploymentConfig('cteicloud')
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

module.exports.createDeploymentConfig = createDeploymentConfig;
