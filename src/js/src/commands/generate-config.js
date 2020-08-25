const path = require('path');
const authenticate = require('../helpers/authenticate');
const az = require('../helpers/az');
const logger = require('../helpers/logger');
const { exec } = require('../helpers/shell');
const { processTemplate } = require('../helpers/template');

const {
  nagiosConfDir,
} = require('../constants');

const generateConfig = async (args) => {

  const {
    'azure-client-id': azureClientId,
    'azure-client-secret': azureClientSecret,
    'azure-subscription-id': azureSubscriptionId,
    'azure-tenant-id': azureTenantId,
  } = args;

  logger.info('Checking Azure authentication status');
  await authenticate(azureClientId, azureClientSecret, azureSubscriptionId, azureTenantId);

  logger.info('Fetching Keyvault names');
  const { result: keyvaults } = await az('keyvault list --query "[].{name: name, resourceGroup: resourceGroup}"');
  const keyvaultNames = keyvaults.map((k) => `${k.name}/${k.resourceGroup}/keyvault`);

  logger.info('Writing Keyvault configuration');
  await processTemplate(
    path.join(__dirname, '../templates/keyvaults.cfg.hbs'),
    keyvaultNames,
    path.join(nagiosConfDir, 'keyvaults.cfg'),
  );

  logger.info('Fetching Storage Account names');
  const { result: storageAccounts } = await az('storage account list --query "[].{name: name, resourceGroup: resourceGroup}"');
  const storageAccountNames = storageAccounts.map((s) => `${s.name}/${s.resourceGroup}/storage-account`);

  logger.info('Writing Storage Account configuration');
  await processTemplate(
    path.join(__dirname, '../templates/storage-accounts.cfg.hbs'),
    storageAccountNames,
    path.join(nagiosConfDir, 'storage-accounts.cfg'),
  );

  logger.info('Fetching Virtual Machine names');
  const { result: virtualMachines } = await az('vm list --query "[].{name: name, resourceGroup: resourceGroup}"');
  const virtualMachineNames = virtualMachines.map((s) => `${s.name}/${s.resourceGroup}/virtual-machine`);

  logger.info('Writing Virtual Machine configuration');
  await processTemplate(
    path.join(__dirname, '../templates/virtual-machines.cfg.hbs'),
    virtualMachineNames,
    path.join(nagiosConfDir, 'virtual-machines.cfg'),
  );

  logger.info('Checking config');
  const { code, stdout, stderr } = await exec('nagios -v /etc/nagios/nagios.cfg');
  if (code !== 0) {
    throw new Error(`Error validating config: ${stderr}`);
  }

  logger.info('Restarting Nagios');
  await exec('systemctl restart nagios');
};

module.exports = generateConfig;
