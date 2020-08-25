const az = require('../../helpers/az');

const execute = async (name, resourceGroup) => {
  const { result: location } = await az(`vm show --resource-group ${resourceGroup} --name ${name} --query location`);
  if (location !== 'westeurope') {
    throw new Error(`WARNING - location set to '${location}'`);
  }
};

module.exports = execute;
