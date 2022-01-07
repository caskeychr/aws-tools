// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Libraries

// Imported Components

// Config

async function getS3FileList(config, prefix) {
  try {
    let params = {
      Bucket: config.bucket,
      Prefix: prefix,
    };

    let result = await s3.listObjectsV2(params).promise();
    result = result.Contents;

    let output = [];

    for (let item in result) {
      let i = result[item].Key.split('/').reverse()[0];

      if (i !== '') {
        output.push(result[item].Key.split('/').reverse()[0]);
      }
    }

    return output;
  } catch (error) {
    throw error;
  }
}

module.exports.getS3FileList = getS3FileList;
