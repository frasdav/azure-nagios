const { exec } = require('./shell');

const buildFullCommand = (cmd) => `az ${cmd} -o json`;

const az = async (cmd, throwOnError = true) => {
  const fullCmd = buildFullCommand(cmd);
  const { code, stdout, stderr } = await exec(fullCmd);
  if (code !== 0) {
    if (throwOnError) {
      throw new Error(`${code}: ${stderr}`);
    }
    return { code, stdout, stderr };
  }
  const result = stdout ? JSON.parse(stdout) : null;
  return {
    code,
    result,
    stdout,
    stderr,
  };
};

module.exports = az;
