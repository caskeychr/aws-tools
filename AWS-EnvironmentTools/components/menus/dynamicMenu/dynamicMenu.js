// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');
const inquirer = require('inquirer');

// Libraries

// Imported Components

// Config

async function dynamicMenu(
  type,
  menuTitle,
  dialog,
  additionalOption,
  replaceText
) {
  try {
    let results = null;

    console.log(`\n`);

    switch (type) {
      case 'info':
        console.log(chalk.blue(`${menuTitle}`));
        break;

      case 'delete':
        console.log(chalk.magenta(`${menuTitle}`));
        break;

      default:
        break;
    }

    let back = '';
    if (additionalOption) {
      back = `\n  back) ${additionalOption}`;
    }

    let message = `${dialog}
  
    Additional Options: ${back}
    0) Previous Menu
    exit) Exit Application  
          
          Selection? `;

    if (replaceText) {
      message = `${replaceText}`;
    }

    await inquirer
      .prompt([
        {
          name: 'selection',
          message: message,
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

module.exports.dynamicMenu = dynamicMenu;
