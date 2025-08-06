// Logging

// Imported 3rd Party NPM Packages
const {
  ElasticLoadBalancingV2Client,
  DescribeLoadBalancersCommand,
  DescribeTargetGroupsCommand,
} = require('@aws-sdk/client-elastic-load-balancing-v2');

// Libraries

// Imported Components

// Config
const config = require('../../../config/config.json');

async function elbClientResources() {
  try {
    let output = {};

    const elbClient = new ElasticLoadBalancingV2Client({
      region: config.region,
    });

    // Find Load Balancers
    const elbInput = {};
    const elbCommand = new DescribeLoadBalancersCommand(elbInput);
    const elbResponse = await elbClient.send(elbCommand);
    const elbs = elbResponse.LoadBalancers;
    let elbArns = [];

    for (let elb in elbs) {
      elbArns.push(elbs[elb].LoadBalancerArn);
    }

    output.elb = elbArns;

    console.log('\n==> Elastic Load Balancers Found:');
    console.log(elbArns);

    // Find Target Groups
    const tgInput = {};
    const tgCommand = new DescribeTargetGroupsCommand(tgInput);
    const tgResponse = await elbClient.send(tgCommand);
    const tgs = tgResponse.TargetGroups;
    let tgArns = [];

    for (let tg in tgs) {
      tgArns.push(tgs[tg].TargetGroupArn);
    }

    output.tgs = tgArns;

    console.log('\n==> Target Groups Found:');
    console.log(tgArns);

    return output;
  } catch (error) {
    console.log(error);
  }
}

module.exports.elbClientResources = elbClientResources;
