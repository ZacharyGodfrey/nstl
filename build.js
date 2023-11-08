const path = require('path');
const fs = require('fs-extra');
const { render } = require('mustache');

const config = require('./config');

const CLIENT_DIR = path.resolve(__dirname, '../client');
const DIST_DIR = path.resolve(__dirname, '../dist');

const readFile = (filePath, encoding = 'utf-8') => fs.readFileSync(filePath, { encoding });
const writeFile = (filePath, content) => fs.outputFileSync(filePath, content, 'utf-8');

(() => {
  fs.emptyDirSync(DIST_DIR);

  const index = readFile(`${CLIENT_DIR}/index.html`);
  const favicon = readFile(`${CLIENT_DIR}/star.ico`, 'base64');
  const logo = readFile(`${CLIENT_DIR}/logo.jpg`, 'base64');

  const template = index
    .replace('/*favicon*/', favicon)
    .replace('/*logo*/', logo);

  const data = {
    configJson: JSON.stringify(config)
  };

  const rendered = render(template, data, {});

  writeFile(`${DIST_DIR}/index.html`, rendered);
})();