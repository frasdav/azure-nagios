const az = require('../../helpers/az');

const execute = async (name, resourceGroup) => {
  const { result: defaultAction } = await az(`storage account show --resource-group ${resourceGroup} --name ${name} --query networkRuleSet.defaultAction`);
  if (!defaultAction) {
    throw new Error('CRITICAL - default action not set');
  }
  if (defaultAction !== 'Deny') {
    throw new Error(`CRITICAL - default action set to '${defaultAction}'`);
  }
};

module.exports = execute;
