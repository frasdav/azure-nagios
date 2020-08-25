const az = require('../../helpers/az');

const execute = async (name, resourceGroup) => {
  const { result: networkInterfaceIds } = await az(`vm show --resource-group ${resourceGroup} --name ${name} --query networkProfile.networkInterfaces`);

  const networkInterfaceTasks = networkInterfaceIds.map((n) => az(`network nic show --ids ${n.id}`));
  const networkInterfaces = await Promise.all(networkInterfaceTasks);
  let publicIpAddressCount = 0;
  networkInterfaces.forEach((n) => {
    n.result.ipConfigurations.forEach((i) => {
      if (i.publicIpAddress) {
        publicIpAddressCount += 1;
      }
    });
  });

  if (publicIpAddressCount) {
    throw new Error(`CRITICAL - ${publicIpAddressCount} public IP address${publicIpAddressCount > 1 ? 'es' : ''} found`);
  }
};

module.exports = execute;
