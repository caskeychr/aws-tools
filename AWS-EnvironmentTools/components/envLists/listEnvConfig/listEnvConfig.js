const AWS = require('aws-sdk');

const config = require('../../../config/config.json');

async function listEnvConfig() {
  try {
    AWS.config.update({ region: config.region });
    const s3 = new AWS.S3();

    let data = await s3
      .getObject({
        Bucket: config.bucket,
        Key: 'config/default.json',
      })
      .promise();

    let envConfig = data.Body.toString('utf-8');
    envConfig = JSON.parse(envConfig);

    console.log(envConfig);

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.listEnvConfig = listEnvConfig;
