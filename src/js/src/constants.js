const {
  AZURE_CLIENT_ID: azureClientId,
  AZURE_CLIENT_SECRET: azureClientSecret,
  AZURE_SUBSCRIPTION_ID: azureSubscriptionId,
  AZURE_TENANT_ID: azureTenantId,
} = process.env;

const nagiosConfDir = '/etc/nagios/conf.d';

module.exports = {
  azureClientId,
  azureClientSecret,
  azureSubscriptionId,
  azureTenantId,
  nagiosConfDir,
};
