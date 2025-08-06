// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');
const inquirer = require('inquirer');

// Libraries

// Imported Components

// Config

async function envCleanOptions() {
  try {
    let results = null;

    console.log(`\n`);
    console.log(chalk.green('Environment Cleansing'));

    await inquirer
      .prompt([
        {
          name: 'selection',
          message: `1) Delete Lambda Function
  2) Delete API Resource
  3) Delete Step Function

  6) Delete All Lambda Functions
  7) Delete All API Resources
  8) Delete All Step Functions
  
  0) Main Menu
  exit) Exit Application
        
        Selection? `,
        },
      ])
      .then((answers) => {
        results = answers;
      })
      .catch((error) => {
        if (error.isTtyError) {
          throw `Prompt couldn't be rendered in the current environment`;
        } else {
          throw error;
        }
      });

    return results;
  } catch (error) {
    throw error;
  }
}

module.exports.envCleanOptions = envCleanOptions;
