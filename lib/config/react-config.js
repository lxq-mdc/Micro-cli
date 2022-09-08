//react项目Eslint相关依赖
const ReactEslintDependencies = {
    devDependencies: {
        eslint: '^8.0.1',
        '@typescript-eslint/eslint-plugin': '^5.0.0',
        '@typescript-eslint/parser': '^5.33.1',
        'eslint-config-prettier': '^8.5.0',
        'eslint-config-standard-with-typescript': '^22.0.0',
        'eslint-plugin-babel': '^5.3.1',
        'eslint-plugin-import': '^2.25.2',
        'eslint-plugin-n': '^15.0.0',
        'eslint-plugin-prettier': '^4.2.1',
        'eslint-plugin-promise': '^6.0.0',
        'eslint-plugin-react': '^7.30.1',
        'eslint-plugin-react-hooks': '^4.6.0',
    },
};
//react项目prettier相关依赖
const ReactPrettierDependencies = {
    devDependencies: {
        prettier: '^2.7.1',
    },
};
//react项目ts相关依赖
const ReactTsDependencies = {
    devDependencies: {
        typescript: '*',
    },
};
//react项目axios相关依赖
const ReactAxiosDependencies = {
    devDependencies: {
        axios: "^0.27.2",
    },
}

//react项目git hooks 相关配置
const ReactGitHooksDependencies = {
    scripts: {
        prepare: 'husky install',
    },
    dependencies: {
        commitizen: '^4.2.5',
        'cz-conventional-changelog': '^3.3.0',
        husky: '^8.0.1',
        'lint-staged': '^13.0.3',
    },
    husky: {
        hooks: {
            'pre-commit': 'lint-staged',
        },
    },
    config: {
        commitizen: {
            path: './node_modules/cz-conventional-changelog',
        },
    },
    'lint-staged': {
        '*.{js,css,md,tsx,ts,less,json}': 'prettier --write',
    },
};
module.exports = {
    ReactEslintDependencies,
    ReactPrettierDependencies,
    ReactTsDependencies,
    ReactGitHooksDependencies,
    ReactAxiosDependencies
};