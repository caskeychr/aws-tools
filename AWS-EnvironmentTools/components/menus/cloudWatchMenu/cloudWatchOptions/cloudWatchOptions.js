// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');
const inquirer = require('inquirer');

// Libraries

// Imported Components

// Config

async function cloudWatchOptions() {
  try {
    let results = null;

    console.log(`\n`);
    console.log(chalk.green('CloudWatch Log Retrieval'));

    await inquirer
      .prompt([
        {
          name: 'selection',
          message: `Select a service location
    1) Lambda
    2) Docker
    3) API Gateway
      
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

module.exports.cloudWatchOptions = cloudWatchOptions;
