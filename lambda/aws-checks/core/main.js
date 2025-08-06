// Config
const config = require('./config/config.json');

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');
AWS.config.update({ region: config.region });
const ec2 = new AWS.EC2();
const rds = new AWS.RDS();

// Libraries

// Imported Components

async function main(event) {
  try {
    const ec2params = {
      InstanceIds: config['instance-ids'],
    };

    const rdsParams = {
      DBInstanceIdentifier: 'cteicloud',
    };

    const ec2Result = await ec2.describeInstanceStatus(ec2params).promise();
    let instanceStatuses = ec2Result.InstanceStatuses;

    let dockerServerStatus = 'Offline';
    let iisServerStatus = 'Offline';

    for (let item in instanceStatuses) {
      if (instanceStatuses[item]['InstanceId'] === 'i-06c1ee7c96bd9b805') {
        let check1 = false;
        let check2 = false;
        let check3 = false;

        if (instanceStatuses[item]['InstanceState']['Name'] === 'running') {
          check1 = true;
        }
        if (instanceStatuses[item]['InstanceStatus']['Status'] === 'ok') {
          check2 = true;
        }
        if (instanceStatuses[item]['SystemStatus']['Status'] === 'ok') {
          check3 = true;
        }

        if (check1 && check2 && check3) {
          dockerServerStatus = 'Available';
        }
      }

      if (instanceStatuses[item]['InstanceId'] === 'i-0782c9c0bc0e22320') {
        let check1 = false;
        let check2 = false;
        let check3 = false;

        if (instanceStatuses[item]['InstanceState']['Name'] === 'running') {
          check1 = true;
        }
        if (instanceStatuses[item]['InstanceStatus']['Status'] === 'ok') {
          check2 = true;
        }
        if (instanceStatuses[item]['SystemStatus']['Status'] === 'ok') {
          check3 = true;
        }

        if (check1 && check2 && check3) {
          iisServerStatus = 'Available';
        }
      }
    }

    const rdsResult = await rds.describeDBInstances(rdsParams).promise();
    let dbInstanceStatus = rdsResult.DBInstances[0]['DBInstanceStatus'];

    let rdsServerStatus = 'Offline';

    if (dbInstanceStatus === 'available') {
      rdsServerStatus = 'Available';
    }

    return {
      dockerServerStatus: dockerServerStatus,
      iisServerStatus: iisServerStatus,
      rdsServerStatus: rdsServerStatus,
    };
  } catch (error) {
    throw error;
  }
}

module.exports.main = main;
