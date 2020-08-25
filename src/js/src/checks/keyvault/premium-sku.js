const az = require('../../helpers/az');

const execute = async (name, resourceGroup) => {
  const { result: sku } = await az(`keyvault show --resource-group ${resourceGroup} --name ${name} --query properties.sku.name`);
  if (!sku) {
    throw new Error('WARNING - SKU not set');
  }
  if (sku !== 'premium') {
    throw new Error(`WARNING - SKU set to '${sku}'`);
  }
};

module.exports = execute;
