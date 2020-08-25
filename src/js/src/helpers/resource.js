const parseResourceName = (resourceName) => {
  const resourceNamePattern = /([a-zA-Z0-9_-]{1,})\/([a-zA-Z0-9_-]{1,})\/([a-zA-Z0-9_-]{1,})/;

  const result = resourceNamePattern.exec(resourceName);
  if (!result) {
    throw Error(`Resource name format not recognised: ${resourceName}`);
  }

  return {
    resourceName: result[1],
    resourceGroupName: result[2],
    resourceType: result[3],
  };
};

module.exports = {
  parseResourceName,
};
