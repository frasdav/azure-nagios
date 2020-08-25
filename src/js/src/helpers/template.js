const Handlebars = require('handlebars');
const logger = require('./logger');
const { readFile, writeFile } = require('./fs');

const getTemplate = async (templatePath) => {
  const source = await readFile(templatePath, 'utf-8');
  return Handlebars.compile(source);
};

const processTemplate = async (templatePath, context, outputPath = null) => {
  logger.info(`Processing template at '${templatePath}'`);
  const template = await getTemplate(templatePath);
  const output = template(context);
  if (outputPath) {
    await writeFile(outputPath, output, 'utf-8');
  }
  return output;
};

module.exports = {
  processTemplate,
};
