# Micro CLI

> A Cli to quickly create modern Vite-based web app.

- 🪄 support for multiple frameworks

- ✨ create modern Vite-based web app

- ✍ easy to use

- 🛠️ a plugin-based architecture

## Install

To install the new package, use one of the following commands.

```
npm install -g @micro-cli/core
# OR
yarn global add @micro-cli/core
# OR
pnpm add @micro-cli/core
```

After installation, you will have access to the `m` binary in your command line. You can verify that it is properly installed by simply running `m`, which should present you with a help message listing all available commands.

You can check you have the right version with this command:

```
m --version
```

## Usage

### m create

To create a new project, run:

```
m create m-demo
```

You will be prompted to pick a framework(now just support React and Vue).

<img src="https://myyoss.oss-cn-shenzhen.aliyuncs.com/img/md/202210300043843.png" alt="image-20221030004359771" style="zoom:50%;" />

Then you will be prompted to check some features you want.

<img src="https://myyoss.oss-cn-shenzhen.aliyuncs.com/img/md/202210300046953.png" alt="image-20221030004629912" style="zoom:50%;" />

The `m create` command has a number of options and you can explore them all by running:

```
m create --help
```

```
Usage: index create [options] <project-name>

create a new project from a React+TS+Vite template

Options:
  -f,--force    overwrite target directory if it exists
  -n, --no-git  Skip git initialization
  -h, --help    display help for command
```

### m addPage/addComponent

To create a new page or component, just run:

```
m addPage Profile
# OR
m addComponent Profile
```

Then you will have the new page/component!

The `m addPage/addComponent` command has a number of options and you can explore them all by running:

```
m addPage --help
# OR
m addComponent --help
```

```
Usage: index addPage [options] <page-name>

add page from template

Options:
  -f,--force  overwrite target directory if it exists
  -h, --help  display help for command
```

```
Usage: index addComponent [options] <page-name>

add component from template

Options:
  -f,--force  overwrite target directory if it exists
  -h, --help  display help for command
```

## License

[MIT](https://github.com/unjs/unbuild/blob/main/LICENSE)
