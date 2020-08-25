const shell = require('shelljs');

const logger = require('./logger');

const exec = async (cmd, opts = {}) => new Promise((resolve) => {
  logger.debug(`Executing shell command '${cmd}'`);
  shell.exec(cmd, { silent: true, ...opts }, (code, stdout, stderr) => resolve({
    code,
    stdout,
    stderr,
  }));
});

module.exports = {
  exec,
};
