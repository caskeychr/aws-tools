// Logging

// Imported 3rd Party NPM Packages
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Libraries
('../../../../../../');
// Imported Components

// Config

async function loadDirectoryToS3(config, inDirectory) {
  try {
    let directory = inDirectory;
    let s3Dir = `${config.deploymentFiles.s3DeploymentFolder}${directory}/`;

    if (inDirectory === undefined) {
      directory = '';
      s3Dir = `${config.deploymentFiles.s3DeploymentFolder}`;
    }

    const fileDir = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'deploymentFiles',
      directory
    );

    let files = fs.readdirSync(fileDir);

    for (let item in files) {
      let ext = path.extname(files[item]);

      if (ext !== '') {
        var filePath = path.join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          '..',
          '..',
          'deploymentFiles',
          directory,
          files[item]
        );

        // console.log(filePath);

        let stream = fs.createReadStream(filePath);

        let params = {
          Bucket: config.bucket,
          Key: `${s3Dir}${files[item]}`,
          Body: stream,
        };

        console.log(`---- Uploading File: ${files[item]}`);

        await s3.upload(params).promise();
      }
    }
  } catch (error) {
    throw error;
  }
}

module.exports.loadDirectoryToS3 = loadDirectoryToS3;
