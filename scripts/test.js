const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const { filterRunPackage } = require('./utils');
const package = filterRunPackage();
const parseArgs = require('minimist');

const { u, watch, coverage } = parseArgs(process.argv.slice(2)) || {};
const procArgs = [
  u && '-u',
  watch && '--watchAll',
  coverage && '--coverage',
].filter(Boolean);

if (package) {
  process.chdir(path.resolve(__dirname, '../packages', package));
}

const proc = spawn.sync('umi-test', procArgs, {
  stdio: 'inherit',
});

if (proc.status !== 0) {
  console.log(`Error: Run umi-test failed`);
}
