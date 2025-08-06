// Logging

// Imported 3rd Party NPM Packages

// Libraries

// Imported Components
const { s3ClientResources } = require('./s3ClientResources/s3ClientResources');
const {
  ec2ClientResources,
} = require('./ec2ClientResources/ec2ClientResources');
const {
  elbClientResources,
} = require('./elbClientResources/elbClientResources');
const {
  asgClientResources,
} = require('./asgClientResources/asgClientResources');
const {
  iamClientResources,
} = require('./iamClientResources/iamClientResources');

// Config

async function listResources() {
  try {
    console.log('### AWS Services Found Report ###');

    let s3 = await s3ClientResources();
    let ec2 = await ec2ClientResources();
    let elb = await elbClientResources();
    let asg = await asgClientResources();
    let iam = await iamClientResources();

    let findingsOutput = { ...s3, ...ec2, ...elb, ...asg, ...iam };

    return findingsOutput;
  } catch (error) {
    console.log(error);
  }
}

module.exports.listResources = listResources;
