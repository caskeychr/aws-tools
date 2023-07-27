// Logging

// Imported 3rd Party NPM Packages
const {
  AutoScalingClient,
  DescribeAutoScalingGroupsCommand,
} = require('@aws-sdk/client-auto-scaling');

// Libraries

// Imported Components

// Config
const config = require('../../../config/config.json');

async function asgClientResources() {
  try {
    let output = {};

    const asgClient = new AutoScalingClient({
      region: config.region,
    });

    // Find Auto Scaling Groups
    const asgInput = {};
    const asgCommand = new DescribeAutoScalingGroupsCommand(asgInput);
    const asgResponse = await asgClient.send(asgCommand);
    const asgs = asgResponse.AutoScalingGroups;
    let asgArns = [];

    for (let asg in asgs) {
      asgArns.push(asgs[asg].AutoScalingGroupARN);
    }

    output.asg = asgArns;

    console.log('\n==> Auto Scaling Groups Found:');
    console.log(asgArns);

    return output;
  } catch (error) {
    console.log(error);
  }
}

module.exports.asgClientResources = asgClientResources;
