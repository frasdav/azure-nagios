const az = require('../../helpers/az');

const execute = async (name, resourceGroup) => {
  const { result: ipRules } = await az(`storage account show --resource-group ${resourceGroup} --name ${name} --query networkRuleSet.ipRules`);
  if (ipRules && ipRules.length) {
    throw new Error(`WARNING - network rules contain ${ipRules.length} unknown IP${ipRules.length > 1 ? 's' : ''}`);
  }
};

module.exports = execute;
