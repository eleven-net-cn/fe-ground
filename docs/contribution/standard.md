---
order: 2
nav:
  title: 贡献代码
  order: 99
toc: menu
---

# 代码风格指南

## 目录结构

`packages` 目录新增代码遵循相同的目录结构，如下所示，文件夹、文件的命名规范请参照注释或下方的“命名”。

<Tree>
  <ul>
    <li>
      packages
      <ul>
        <li>
          components
            <ul>
              <li>
                src
                <ul>
                  <li>
                    LayoutPercent
                    <small>React 组件目录，推荐大驼峰，保持组件导出一致</small>
                    <ul>
                      <li>
                        __tests__
                        <small>jest 单元测试</small>
                        <ul>
                          <li>
                            index.test.ts
                            <small>测试代码</small>
                          </li>
                        </ul>
                      </li>
                      <li>
                        demos
                        <small>测试 demo</small>
                        <ul>
                          <li>
                            demo1.style.less
                            <small>测试文件 1 的样式代码</small>
                          </li>
                          <li>
                            demo1.tsx
                            <small>测试文件 1</small>
                          </li>
                        </ul>
                      </li>
                      <li>
                        style
                        <small>组件样式</small>
                        <ul>
                          <li>
                            index.less
                            <small>组件样式（less）</small>
                            <small>特别说明：如果组件样式较少，在此书写样式即可；如果样式较多，推荐 index.less 作为入口，而拆分其它更多样式文件。</small>
                          </li>
                          <li>
                            index.ts
                            <small>组件样式入口（ts）—— 必须存在，即使组件没有样式代码</small>
                            <small>特别说明：仅导入 index.less，不做其它事情，不可以在此书写 styled-components 代码</small>
                          </li>
                        </ul>
                      </li>
                      <li>
                        index.md
                        <small>API 文档</small>
                      </li>
                      <li>
                        index.ts
                        <small>组件源码</small>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
        </li>
        <li>
          hooks
          <ul>
            <li>
              src
              <ul>
                <li>
                  useCountDown
                  <small>React Hooks 目录，以 `use` 开头，小驼峰命名，保持与导出一致</small>
                  <ul>
                    <li>
                      __tests__
                      <small>jest 单元测试</small>
                      <ul>
                        <li>
                          index.test.ts
                          <small>测试代码</small>
                        </li>
                      </ul>
                    </li>
                    <li>
                      demos
                      <small>测试 demo</small>
                      <ul>
                        <li>
                          demo1.style.less
                          <small>测试文件 1 的样式代码</small>
                        </li>
                        <li>
                          demo1.tsx
                          <small>测试文件 1</small>
                        </li>
                      </ul>
                    </li>
                    <li>
                      index.md
                      <small>API 文档</small>
                    </li>
                    <li>
                      index.ts
                      <small>组件源码</small>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          utils
          <ul>
            <li>
              src
              <ul>
                <li>
                  compareVersion
                  <small>Utils 函数目录，以小驼峰命名，保持与导出一致</small>
                  <ul>
                    <li>
                      __tests__
                      <small>jest 单元测试</small>
                      <ul>
                        <li>
                          index.test.ts
                          <small>测试代码</small>
                        </li>
                      </ul>
                    </li>
                    <li>
                      demos
                      <small>测试 demo</small>
                      <ul>
                        <li>
                          demo1.style.less
                          <small>测试文件 1 的样式代码</small>
                        </li>
                        <li>
                          demo1.tsx
                          <small>测试文件 1</small>
                        </li>
                      </ul>
                    </li>
                    <li>
                      index.md
                      <small>API 文档</small>
                    </li>
                    <li>
                      index.ts
                      <small>组件源码</small>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</Tree>

## 命名

1. 文件夹命名

   - 文件夹命名，一般推荐：统一小写字母、中划线连接，优先使用复数单词
   - `__tests__`、`demos`、`style` 目录名称不能更换，否则可能出现错误
   - 特别的几个约定：
     > components、hooks、utils 均是相对独立的单元，与真实导出的模块命名一致，达到保持见名知意的效果。
     - components 目录的 React 组件，文件夹名使用大驼峰
     - hooks 目录下的 React Hooks，文件夹名以 `use` 开头，小驼峰命名
     - utils 目录下函数，文件夹名使用小驼峰

2. 文件命名

   - 其它 `.ts`、`.js`、`.less` 等文件名称使用小写字母、中划线连接
   - demo 测试文件，名称统一使用：`demo1.tsx`、`demo1.style.less`

3. 变量等命名

   - 变量命名统一使用小驼峰
   - 常量命名，可以使用小驼峰，优先使用全大写、下划线连接
   - React 组件名称使用大驼峰
   - `class`、`interface` 命名使用大驼峰
   - `TypeScript` 类型定义，使用大驼峰

4. 函数命名

   - 函数、方法名称使用小驼峰

5. CSS 命名

   - 样式如 class 名称，使用全小写、中划线连接（不建议使用驼峰）
   - `styled-components` 变量，建议以 `Styled*` 打头，方便与 React 组件区分开来

## 参数

函数的入参：

- 必选参数小于、等于 2 个，应平级输入。
- 必选参数如果多于 2 个，以 `object` 形式输入。
- 多个非必传参数，将必传参数放前面，其它非必传参数以 `object` 形式平级输入。
- 必选参数在前，非必选参数在后。

## 注释

推荐添加适当的注释，不必每一行都加。

TypeScript 类型定义的注释尽可能详细，使用方的体验会更舒畅。

- 函数参数注释，示例：

  ```ts
  /**
   * 比较版本号
   *  - v1 > v2 返回 1
   *  - v1 === v2 返回 0
   *  - v1 < v2 返回 -1
   *
   * @param v1 版本号 1
   * @param v2  版本号 2
   * @param seprator 分隔符，默认：.
   */
  ```

- TypeScript 类型定义注释，示例：

  ```ts
  /**
   * 倒计时格式化返回
   */
  interface Duration<T = string> {
    /** 剩余天数 */
    days: T;
    /** 剩余小时 */
    hours: T;
    /** 剩余分钟 */
    minutes: T;
    /** 剩余秒 */
    seconds: T;
    /** 剩余毫秒 */
    milliseconds: T;
  }
  ```

  > `/** */` 格式的单行注释，使用者在编码时，将获得良好的提示体验。

- 文件头部注释

  推荐使用 vscode 插件 `vscode-fileheader`，安装好插件后，先配置好选项（如：将 `Author`、`Last Modified By` 换成自己的名字），按快捷键 `control + option + i` 自动生成注释。

  > 推荐在插件配置中再加一项 `@Desc`，方便书写

  示例：

  ```js
  /*
   * 倒计时，格式化为天、时、分、秒、毫秒。
   * @Author: Eleven
   * @Date: 2020-12-10 10:06:41
   * @Last Modified by: Eleven
   * @Last Modified time: 2021-02-22 14:38:43
   */
  ```

## Git Commit

`commit` 提交需要遵循规范，以便自动生成 `CHANGELOG.md`，推荐遵循以下几点：

1. 代码成块提交

   仅在 `Feature`、`Bug Fix`、`Performance` 等编码全部结束以后操作 `commit`。

2. 借助工具书写

   推荐使用配置好的 `yarn commit` 命令，按照交互提示逐步填写去提交。

3. `commit message`

   注意 `commit message` 书写简洁、规范，要能概括提交的代码，必要时可以换行书写清楚，不能过于随意，这些将会出现在自动生成的 `CHANGELOG.md` 中。
