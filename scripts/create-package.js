/*
 * 初始化创建 package
 * @Author: Eleven
 * @Date: 2021-03-19 20:24:39
 * @Last Modified by: Eleven
 * @Last Modified time: 2021-03-27 12:48:57
 */

const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const { exec } = require('shelljs');

const regLibraryName = /^[a-z]+(\-[a-z]+)*$/;
const sign = '--library-name--';
const dirTpl = `scripts/templates/library-template`;

inquirer
  .prompt([
    {
      type: 'input',
      name: 'packageName',
      message: `请输入 package 名称（小写字母、中划线连接）：`,
      default: 'library-template',
      validate: async packageName => {
        if (!regLibraryName.test(packageName)) {
          console.log(chalk.yellow(`\n格式错误，请重新输入`));
          return false;
        }
        const hasPackage = await fs.ensureDir(`packages/${packageName}`);

        if (!hasPackage) {
          console.log(chalk.yellow(`\npackages 目录已存在该包，请重新输入`));
          return false;
        }

        return true;
      },
    },
  ])
  .then(async ({ packageName }) => {
    try {
      const dirTarget = `packages/${packageName}`;
      const filePkgJson = `packages/${packageName}/package.json`;
      const fileReadMe = `packages/${packageName}/README.md`;
      const username = exec('git config user.name', {
        silent: true,
      }).stdout.trim();
      const usermail = exec('git config user.email', {
        silent: true,
      }).stdout.trim();
      const account = `${username} <${usermail}>`;

      fs.copySync(dirTpl, dirTarget);

      let pkgJson = await fs.readJSON(filePkgJson);
      const { name, scripts } = pkgJson;

      pkgJson = {
        ...pkgJson,
        ...{
          name: name.replace(sign, packageName),
          author: account,
          maintainers: [account],
          scripts: {
            ...scripts,
            ...{
              watch: scripts.watch.replace(sign, packageName),
              build: scripts.build.replace(sign, packageName),
            },
          },
        },
      };

      fs.writeJsonSync(filePkgJson, pkgJson, {
        spaces: 2,
        encoding: 'utf8',
      });
      const dataReadMe = await fs.readFile(fileReadMe, 'utf8');

      fs.outputFileSync(fileReadMe, dataReadMe.replace(sign, packageName));

      console.log(figlet.textSync('FE-Ground'));
      console.log(chalk.green(`\npackages/${packageName} 创建完成\n`));

      console.log(chalk.green('  yarn docs:start'));
      console.log('    运行文档及 Demo 示例\n');
      console.log(chalk.green('  yarn test'));
      console.log('    运行 Jest 单元测试\n');
      console.log(chalk.green('  yarn watch'));
      console.log('    运行文档及 watch 编译\n');
      console.log(chalk.green('  yarn build'));
      console.log('    编译打包');
      console.log(
        chalk.grey(
          `\n或者，cd ${packageName}，单独运行子包命令 yarn test/watch/build`,
        ),
      );
    } catch (error) {
      console.log(chalk.red('\n操作失败了，请检查代码重试~'));
    }
  });
