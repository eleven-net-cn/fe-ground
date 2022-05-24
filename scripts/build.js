const chalk = require('chalk');
const spawn = require('cross-spawn');
const { filterRunPackage } = require('./utils');
const package = filterRunPackage();
const parseArgs = require('minimist');

const { watch } = parseArgs(process.argv.slice(2)) || {};
const procArgs = [watch && '--watch'].filter(Boolean);

if (package) {
  // https://github.com/umijs/father/blob/master/packages/father-build/src/build.ts#L224
  process.env.PACKAGE = package;
}

const proc = spawn.sync('father-build', procArgs, {
  stdio: 'inherit',
});

if (proc.status !== 0) {
  console.log(`Error: Run father-build failed`);
}
