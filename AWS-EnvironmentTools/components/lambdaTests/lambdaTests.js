const { invokeLambdaFunc } = require('../invokeLambdaFunc/invokeLambdaFunc');

const config = '../../config/config.json';

async function lambdaTests(selected) {
  try {
    // const fs = require('fs');
    // let files = await fs.readdirSync('../../IDMP/Lambda');

    // console.log(files);

    let lambdaFunctions = [
      'IDMP-CloudWatch-Crawler',
      'IDMP-CloudWatch-Report',
      'IDMP-CloudWatch-Report-Init',
      'IDMP-Collection-ETL',
      'IDMP-CRON-RDSReboot',
      'IDMP-CRON-TempTableClear',
      'IDMP-CSV-Ingestion',
      'IDMP-CSV-Parser',
      'IDMP-DataDictionary',
      'IDMP-DataDictionary-Comparison',
      'IDMP-DataDictionary-ConfigUpdate',
      'IDMP-DataDictionary-DDLtoStaging',
      'IDMP-DataDictionary-EnvCheck',
      'IDMP-DataDictionary-ETLGen',
      'IDMP-DataDictionary-Reader',
      'IDMP-DataDictionary-StagingTableGen',
      'IDMP-DataDictionary-Validator',
      'IDMP-DataDictionary-Validator-EmailTemplate',
      'IDMP-DataDictionary-VarValidRules',
      'IDMP-DatasetCleanse',
      'IDMP-DatasetCleanse-Report',
      'IDMP-Email-List',
      'IDMP-Email-Notifier',
      'IDMP-PreProcessor-HeaderCheck',
      'IDMP-PreProcessor-HeaderCheck-Scan',
      'IDMP-PreProcessor-Report',
      'IDMP-PreProcessor-RowCheck',
      'IDMP-PreProcessor-RowCheck-Scan',
      'IDMP-RowCount-CSV',
      'IDMP-RowCount-DB',
      'IDMP-S3-DelObj',
      'IDMP-S3-ObjInf',
      'IDMP-S3-PreSignedURL',
      'IDMP-SAS-Clean',
      'IDMP-SES-Registration',
      'IDMP-SQL-Generator',
      'IDMP-Workflow-Initiator',
      'IDMP-Workflow-Update',
    ];

    let found = lambdaFunctions.find((el) => el === selected);
    if (found !== undefined) {
      found = found.toLowerCase();

      switch (found) {
        case value:
          break;

        default:
          break;
      }
    }

    console.log(found);
  } catch (error) {
    throw error;
  }
}

module.exports.lambdaTests = lambdaTests;
