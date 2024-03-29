const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const { exec } = require('shelljs');
const replace = require('replace-in-file');

// 大驼峰（规则稍微放宽）
const REG_PASCAL_CASE = /^[A-Z]+[a-z]+([A-Z]+[a-z]+)*$/;
// 小驼峰
const REG_CAMEL_CASE = /^[a-z]+([A-Z][a-z]*)*$/;
const REG_HOOKS = /^use[A-Z]+[a-z]+([A-Z]+[a-z]+)*$/;
const REG_LIBRARY = /^[a-z]+(\-[a-z]+)*$/;

const userNameGit = exec('git config user.name', {
  silent: true,
}).stdout.trim();
const userMailGit = exec('git config user.email', {
  silent: true,
}).stdout.trim();
const userNameNpm = exec('npm whoami --registry=https://registry.npmjs.org/', {
  silent: true,
}).stdout.trim();

const SETTINGS = {
  component: {
    msg: '请输入 React Component 名称（大驼峰命名）：',
    regular: REG_PASCAL_CASE,
    targetDir: 'packages/components',
    tplDir: 'scripts/templates/component-template',
  },
  hooks: {
    msg: '请输入 React Hooks 名称（use开头，小驼峰命名）：',
    regular: REG_HOOKS,
    targetDir: 'packages/hooks',
    tplDir: 'scripts/templates/hooks-template',
  },
  util: {
    msg: '请输入 Util Function 名称（小驼峰命名）：',
    regular: REG_CAMEL_CASE,
    targetDir: 'packages/utils',
    tplDir: 'scripts/templates/util-template',
  },
  library: {
    msg: '请输入 New Package 名称（小写字母、中划线连接）：',
    regular: REG_LIBRARY,
    targetDir: 'packages',
    tplDir: 'scripts/templates/library-template',
  },
};

inquirer
  .prompt([
    {
      type: 'list',
      message: '请选择：',
      name: 'template',
      choices: [
        {
          name: 'React Component',
          value: 'component',
        },
        {
          name: 'React Hooks',
          value: 'hooks',
        },
        {
          name: 'Util Function',
          value: 'util',
        },
        {
          name: 'New Package（SDK）',
          value: 'library',
        },
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: ({ template }) => SETTINGS[template].msg,
      validate: (name, { template }) => {
        const setting = SETTINGS[template];

        if (!setting.regular.test(name)) {
          console.log(chalk.yellow(`\n格式错误，请重新输入`));
          return false;
        }

        const dir =
          template === 'library'
            ? `${setting.targetDir}/${name}`
            : `${setting.targetDir}/src/${name}`;
        const pathTargetDir = path.join(__dirname, '..', dir);

        if (fs.existsSync(pathTargetDir)) {
          console.log(chalk.yellow(`\n已存在同名目录，请检查后重新输入`));
          return false;
        }

        fs.ensureDirSync(pathTargetDir);
        return true;
      },
    },
  ])
  .then(async ({ template, name }) => {
    const libraries = ['component', 'hooks', 'util'];
    const setting = SETTINGS[template];
    const dirTpl = setting.tplDir;
    const isLibrary = template === 'library';
    const dirTarget = isLibrary
      ? `${setting.targetDir}/${name}`
      : `${setting.targetDir}/src/${name}`;
    const dirPkg = isLibrary
      ? `${setting.targetDir}/${name}`
      : setting.targetDir;
    const dirLibrary = isLibrary
      ? name
      : setting.targetDir.replace('packages/', '');
    await fs.copy(dirTpl, dirTarget);

    if (libraries.includes(template)) {
      const entryJs = path.resolve(
        __dirname,
        '..',
        `${setting.targetDir}/src/index.ts`,
      );
      const contentEntryJs = await fs.readFile(entryJs);

      await fs.writeFile(
        entryJs,
        contentEntryJs +
          `\nexport { default as __name__ } from './__name__';\n`,
        'utf8',
      );

      delete require.cache[require.resolve(entryJs)];

      if (template === 'component') {
        const entryStyle = path.resolve(
          __dirname,
          '..',
          `${setting.targetDir}/src/index.less`,
        );
        const contentEntryStyle = await fs.readFile(entryStyle);

        await fs.writeFile(
          entryStyle,
          contentEntryStyle + `@import './__name__/style/index.less';\n`,
          'utf8',
        );

        delete require.cache[require.resolve(entryStyle)];
      }
    }

    let entries = libraries.includes(template)
      ? [path.resolve(__dirname, '..', `${setting.targetDir}/src/index.ts`)]
      : [];

    if (template === 'component') {
      entries.push(
        path.resolve(__dirname, '..', `${setting.targetDir}/src/index.less`),
      );
    }

    await replace({
      files: [path.resolve(__dirname, '..', dirTarget, '**/*'), ...entries],
      from: [
        /__name__|--name--/g,
        /__username__|--username--/g,
        /__usermail__|--usermail--/g,
        /__npmuser__|--npmuser--/g,
      ],
      to: [name, userNameGit, userMailGit, userNameNpm],
      ignore: ['**/node_modules/**'],
    });

    console.log();
    console.log(figlet.textSync('sunshine'));

    console.log(chalk.cyan('\n提供以下运行命令：\n'));
    console.log(chalk.green('  yarn commit'));
    console.log('    交互式提交代码（方便生成规范的 CHANGELOG）\n');
    console.log(chalk.green('  yarn watch'));
    console.log('    编译打包（watch 实时编译）\n');
    console.log(chalk.green(`  yarn watch --${dirLibrary}`));
    console.log(
      `    编译打包（watch 实时编译），仅编译 ${dirLibrary} 目录子包\n`,
    );
    console.log(chalk.green('  yarn build'));
    console.log('    编译打包\n');
    console.log(chalk.green(`  yarn build --${dirLibrary}`));
    console.log(`    编译打包，仅编译 ${dirLibrary} 目录子包\n`);
    console.log(chalk.green('  yarn test'));
    console.log('    运行 Jest 单元测试\n');
    console.log(chalk.green(`  yarn test --${dirLibrary}`));
    console.log(`    运行 Jest 单元测试，仅运行 ${dirLibrary} 目录子包\n`);
    console.log(chalk.green('  yarn test:watch'));
    console.log('    运行 Jest 单元测试（watch 实时编译）\n');
    console.log(chalk.green(`  yarn test:watch --${dirLibrary}`));
    console.log(
      `    运行 Jest 单元测试（watch 实时编译），仅运行 ${dirLibrary} 目录子包\n`,
    );

    console.log(
      chalk.cyan(
        `\n已成功新建 ${chalk.magenta(dirTarget)} ，运行以下命令开始开发：\n`,
      ),
    );
    console.log(
      chalk.green(
        `  yarn docs:start    ${chalk.white('运行 Demo 测试及文档')}`,
      ),
    );
    console.log(
      chalk.green(`  yarn test:watch    ${chalk.white('运行 Jest 单元测试')}`),
    );
    console.log();
  });
