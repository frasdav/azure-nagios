const authenticate = require('../helpers/authenticate');
const az = require('../helpers/az');
const { parseResourceName } = require('../helpers/resource');

const checkResourceExists = async (args) => {
  const {
    'azure-client-id': azureClientId,
    'azure-client-secret': azureClientSecret,
    'azure-subscription-id': azureSubscriptionId,
    'azure-tenant-id': azureTenantId,
    'resource-name': fullResourceName,
  } = args;

  await authenticate(azureClientId, azureClientSecret, azureSubscriptionId, azureTenantId);

  const { resourceName, resourceGroupName, resourceType } = parseResourceName(fullResourceName);

  let fullResourceType = null;
  switch (resourceType) {
    case 'keyvault':
      fullResourceType = 'Microsoft.KeyVault/vaults';
      break;
    case 'storage-account':
      fullResourceType = 'Microsoft.Storage/StorageAccounts';
      break;
    case 'virtual-machine':
      fullResourceType = 'Microsoft.Compute/VirtualMachines';
      break;
    default:
  }

  if (!fullResourceType) {
    throw Error(`Unable to determine resource type from name: ${resourceName}`);
  }

  const { code, stderr } = await az(`resource show --resource-type ${fullResourceType} --resource-group ${resourceGroupName} --name ${resourceName}`, false);
  if (code === 0) {
    // eslint-disable-next-line no-console
    console.log('OK');
  } else if (code === 3) {
    throw new Error(`WARNING - resource '${resourceName}' does not exist`);
  } else {
    throw new Error(`ERROR - ${stderr}`);
  }
};

module.exports = checkResourceExists;
