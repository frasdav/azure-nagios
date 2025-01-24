const az = require('../../helpers/az');

const execute = async (name, resourceGroup) => {
  const { result: ipRules } = await az(`keyvault show --resource-group ${resourceGroup} --name ${name} --query properties.networkAcls.ipRules`);
  if (ipRules && ipRules.length) {
    throw new Error(`WARNING - network rules contain ${ipRules.length} unknown IP${ipRules.length > 1 ? 's' : ''}`);
  }
};

module.exports = execute;
