exports.command = 'generate-config';

exports.desc = 'Generates Nagios config using the Azure API';

exports.builder = (yargs) => yargs
  .demand('azure-client-id')
  .option('azure-client-id')
  .demand('azure-client-secret')
  .option('azure-client-secret')
  .demand('azure-subscription-id')
  .option('azure-subscription-id')
  .demand('azure-tenant-id')
  .option('azure-tenant-id');

exports.handler = require('../commands/generate-config');
