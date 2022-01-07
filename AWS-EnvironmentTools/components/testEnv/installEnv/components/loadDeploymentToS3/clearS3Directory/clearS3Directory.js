// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Libraries

// Imported Components

// Config

async function clearS3Directory(config, inDirectory) {
  try {
    let s3Dir = `${config.deploymentFiles.s3DeploymentFolder}${inDirectory}/`;

    if (inDirectory === undefined) {
      s3Dir = `${config.deploymentFiles.s3DeploymentFolder}`;
    }

    let listParams = {
      Bucket: config.bucket,
      Prefix: s3Dir,
    };

    let s3Files = await s3.listObjectsV2(listParams).promise();
    s3Files = s3Files.Contents;

    let s3FileArray = [];
    for (let item in s3Files) {
      s3FileArray.push({
        Key: s3Files[item].Key,
      });
    }

    if (s3FileArray.length > 0) {
      let params = {
        Bucket: config.bucket,
        Delete: {
          Objects: s3FileArray,
          Quiet: false,
        },
      };

      await s3.deleteObjects(params).promise();
    }

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.clearS3Directory = clearS3Directory;
