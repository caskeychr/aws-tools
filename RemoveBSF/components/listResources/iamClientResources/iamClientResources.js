// Logging

// Imported 3rd Party NPM Packages
const {
  IAMClient,
  ListUsersCommand,
  ListPoliciesCommand,
} = require('@aws-sdk/client-iam');

// Libraries

// Imported Components

// Config
const config = require('../../../config/config.json');

async function iamClientResources() {
  try {
    let output = {};

    const iamClient = new IAMClient({
      region: config.region,
    });

    // Find IAM Users
    const userInput = {};
    const userCommand = new ListUsersCommand(userInput);
    const userResponse = await iamClient.send(userCommand);
    const users = userResponse.Users;
    let userIds = [];

    for (let user in users) {
      userIds.push(users[user].UserId);
    }

    output.user = userIds;

    console.log('\n==> Users Found:');
    console.log(userIds);

    // Find IAM Policies
    const policyInput = {};
    const policyCommand = new ListPoliciesCommand(policyInput);
    const policyResponse = await iamClient.send(policyCommand);
    const policies = policyResponse.Policies;
    let policyIds = [];

    for (let policy in policies) {
      policyIds.push(policies[policy].PolicyId);
    }

    output.policy = policyIds;

    console.log('\n==> Policies Found:');
    console.log(policyIds);

    return output;
  } catch (error) {
    console.log(error);
  }
}

module.exports.iamClientResources = iamClientResources;
