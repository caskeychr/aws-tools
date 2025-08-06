// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

async function sesRegistration(envConfig, emailAddress) {
  try {
    AWS.config.update({ region: envConfig.region });
    const ses = new AWS.SES();

    let identitiesParams = {
      IdentityType: 'EmailAddress',
    };

    let emailIdentities = await ses.listIdentities(identitiesParams).promise();

    delete emailIdentities.ResponseMetadata;
    let verificationAttributes = await ses
      .getIdentityVerificationAttributes(emailIdentities)
      .promise();

    verificationAttributes = verificationAttributes.VerificationAttributes;

    let verifiedFlag = false;
    for (let item in verificationAttributes) {
      if (item === emailAddress) {
        if (verificationAttributes[item].VerificationStatus === 'Success') {
          verifiedFlag = true;
        }
      }
    }

    if (!verifiedFlag) {
      let verifyEmailParams = {
        EmailAddress: emailAddress,
      };

      await ses.verifyEmailAddress(verifyEmailParams).promise();

      console.log('--- Email Address Added to SES');
      console.log('--- Expect an email shortly');

      return 'Email Added to SES';
    } else {
      return 'Email Already exists';
    }
  } catch (error) {
    throw error;
  }
}

module.exports.sesRegistration = sesRegistration;
