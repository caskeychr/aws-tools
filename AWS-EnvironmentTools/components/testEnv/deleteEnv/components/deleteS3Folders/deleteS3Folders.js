// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Libraries

// Imported Components

// Config
const config = require('../../../../../config/config.json');

async function deleteS3Folders() {
  try {
    let params = {
      Bucket: config.bucket,
      Prefix: `${config.deploymentFiles.s3DeploymentFolder}`,
    };

    let s3FileList = await s3.listObjectsV2(params).promise();
    s3FileList = s3FileList.Contents;

    let deleteList = [];

    s3FileList.forEach((s3File) => deleteList.push({ Key: s3File.Key }));

    if (deleteList.length > 0) {
      let deleteParams = {
        Bucket: config.bucket,
        Delete: {
          Objects: deleteList,
        },
      };

      await s3.deleteObjects(deleteParams).promise();
    }

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.deleteS3Folders = deleteS3Folders;
