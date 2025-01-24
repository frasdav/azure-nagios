exports.command = 'check-resource';

exports.desc = 'Checks resource using the Azure API';

exports.builder = (yargs) => yargs
  .demand('azure-client-id')
  .option('azure-client-id')
  .demand('azure-client-secret')
  .option('azure-client-secret')
  .demand('azure-subscription-id')
  .option('azure-subscription-id')
  .demand('azure-tenant-id')
  .option('azure-tenant-id')
  .demand('resource-name')
  .option('resource-name')
  .demand('check-name')
  .option('check-name');

exports.handler = require('../commands/check-resource');
