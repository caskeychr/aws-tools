// Logging

// Imported 3rd Party NPM Packages
const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');

// Libraries

// Imported Components

// Config
const config = require('../../../config/config.json');

async function s3ClientResources() {
  try {
    let output = {};

    const s3client = new S3Client({});

    // Find S3 Buckets
    const s3input = {};
    const s3command = new ListBucketsCommand(s3input);
    const buckets = await s3client.send(s3command);
    let foundBuckets = [];

    for (let bucket in buckets.Buckets) {
      if (buckets.Buckets[bucket].Name.includes(config.clusterName)) {
        console.log(buckets.Buckets[bucket].Name);

        foundBuckets.push(buckets.Buckets[bucket].Name);
      }
    }

    output.s3 = foundBuckets;

    console.log('\n==> S3 Buckets Found:');
    console.log(foundBuckets);

    return output;
  } catch (error) {
    console.log(error);
  }
}

module.exports.s3ClientResources = s3ClientResources;
