// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');
const inquirer = require('inquirer');

// Libraries

// Imported Components

// Config

async function lambdaTestOptions() {
  try {
    let results = null;

    console.log(`\n`);
    console.log(chalk.green('Lambda Function Test'));

    await inquirer
      .prompt([
        {
          name: 'selection',
          message: `Please enter the name of a Lambda Function to test
  or use one of the following selections
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

module.exports.lambdaTestOptions = lambdaTestOptions;
