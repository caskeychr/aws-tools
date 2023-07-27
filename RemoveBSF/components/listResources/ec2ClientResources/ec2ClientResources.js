// Logging

// Imported 3rd Party NPM Packages
const {
  EC2Client,
  DescribeInstancesCommand,
  DescribeNetworkInterfacesCommand,
  DescribeVpcsCommand,
  DescribeNatGatewaysCommand,
  DescribeVpnGatewaysCommand,
} = require('@aws-sdk/client-ec2');

// Libraries

// Imported Components

// Config
const config = require('../../../config/config.json');

async function ec2ClientResources() {
  try {
    let output = {};

    const ec2client = new EC2Client({ region: config.region });

    // Find VPC
    const vpcInput = {};
    const vpcCommand = new DescribeVpcsCommand(vpcInput);
    const vpcResponse = await ec2client.send(vpcCommand);
    const vpcs = vpcResponse.Vpcs;
    let vpcIds = [];

    for (let vpc in vpcs) {
      vpcName = '';

      for (let i in vpcs[vpc].Tags) {
        if (vpcs[vpc].Tags[i].Key === 'Name') {
          vpcName = vpcs[vpc].Tags[i].Value;
        }
      }

      if (vpcName.includes(config.clusterName)) {
        vpcIds.push(vpcs[vpc].VpcId);
      }
    }

    output.vpc = vpcIds;

    console.log('\n==> VPCs Found:');
    console.log(vpcIds);

    // Find EC2 Instances

    const ec2input = {};
    const ec2command = new DescribeInstancesCommand(ec2input);
    const ec2response = await ec2client.send(ec2command);
    const instances = ec2response.Reservations[0].Instances;
    let instanceIds = [];

    for (let instance in instances) {
      instanceIds.push(instances[instance].InstanceId);
    }

    output.ec2 = instanceIds;

    console.log('\n==> EC2 Instances Found:');
    console.log(instanceIds);

    // Find Network Interfaces

    const interfacesInput = {};
    const interfacesCommand = new DescribeNetworkInterfacesCommand(
      interfacesInput
    );
    const interfacesResponse = await ec2client.send(interfacesCommand);
    const networkInterfaces = interfacesResponse.NetworkInterfaces;
    let interfaceIds = [];

    for (let interface in networkInterfaces) {
      interfaceIds.push(networkInterfaces[interface].NetworkInterfaceId);
    }

    output.interface = interfaceIds;

    console.log('\n==> Network Interfaces Found:');
    console.log(interfaceIds);

    // Find NAT Gateways
    const natInput = {};
    const natCommand = new DescribeNatGatewaysCommand(natInput);
    const natResponse = await ec2client.send(natCommand);
    const nats = natResponse.NatGateways;
    let natIds = [];

    for (let nat in nats) {
      natIds.push(nats[nat].NatGatewayIds);
    }

    output.nat = natIds;

    console.log('\n==> NAT Gateways Found:');
    console.log(natIds);

    // Find VPN Gateways

    const vpnInput = {};
    const vpnCommand = new DescribeVpnGatewaysCommand(vpnInput);
    const vpnResponse = await ec2client.send(vpnCommand);
    const vpns = vpnResponse.VpnGateways;
    let vpnIds = [];

    for (let vpn in vpns) {
      vpnIds.push(vpns[vpn].vpnGatewayId);
    }

    output.vpn = vpnIds;

    console.log('\n==> VPN Gateways Found:');
    console.log(vpnIds);

    return output;
  } catch (error) {
    console.log(error);
  }
}

module.exports.ec2ClientResources = ec2ClientResources;
