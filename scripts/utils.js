const path = require('path');
const fs = require('fs-extra');
const parseArgs = require('minimist');

function filterPackages() {
  const dirs = fs.readdirSync(path.resolve(__dirname, '../packages'));

  if (dirs.length) {
    return dirs.filter(dir =>
      fs.statSync(path.resolve(__dirname, '../packages', dir)).isDirectory(),
    );
  }

  return [];
}

function filterRunPackage() {
  const packages = filterPackages();
  const args = parseArgs(process.argv.slice(2));

  return packages.filter(package => args[package] === true)[0];
}

module.exports = {
  filterPackages,
  filterRunPackage,
};
