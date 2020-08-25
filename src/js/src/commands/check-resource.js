const authenticate = require('../helpers/authenticate');
const { parseResourceName } = require('../helpers/resource');

const checkResource = async (args) => {
  const {
    'azure-client-id': azureClientId,
    'azure-client-secret': azureClientSecret,
    'azure-subscription-id': azureSubscriptionId,
    'azure-tenant-id': azureTenantId,
    'check-name': checkName,
    'resource-name': fullResourceName,
  } = args;

  await authenticate(azureClientId, azureClientSecret, azureSubscriptionId, azureTenantId);

  const { resourceName, resourceGroupName, resourceType } = parseResourceName(fullResourceName);

  const check = require(`../checks/${resourceType}/${checkName}`);
  await check(resourceName, resourceGroupName);

  // eslint-disable-next-line no-console
  console.log('OK');
};

module.exports = checkResource;
