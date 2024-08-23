const { exec } = require('child_process');

// Command line arguments
const command = process.argv[2];
const migrationName = process.argv[3];

// Valid migration commands
const validCommands = ['create', 'up', 'down', 'list', 'prune'];
if (!validCommands.includes(command)) {
  console.error(`Invalid command: Command must be one of ${validCommands}`);
  process.exit(0);
}

const commandsWithoutMigrationNameRequired = ['list', 'prune'];
if (!commandsWithoutMigrationNameRequired.includes(command) && !migrationName) {
  console.error(`Migration name is required for command ${command}`);
  process.exit(0);
}

function runNpmScript() {
  return new Promise((resolve, reject) => {
    let execCommand = '';
    if (commandsWithoutMigrationNameRequired.includes(command)) {
      execCommand = `migrate ${command}`;
    } else {
      execCommand = `migrate ${command} ${migrationName}`;
    }

    const childProcess = exec(execCommand, (error, stdout) => {
      if (error) {
        console.error(`Error running script: ${error}`);
        reject(error);
      } else {
        resolve(stdout);
      }
    });

    childProcess.stderr.on('data', (data) => {
      console.error(data);
    });
  });
}

// Example usage
runNpmScript()
  .then((output) => console.log(output))
  .catch((error) => console.error('Error:', error));
