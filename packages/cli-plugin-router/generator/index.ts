import GeneratorAPI from '@micro-cli/create/lib/GeneratorAPI';
import { answersTypes } from '@micro-cli/create/types';
import {
  injectRouterInReact,
  injectHookInReact,
  injectRootOptionInVue,
  replaceNodeInJSX,
  replaceNodeInVue,
} from '@micro-cli/shared-utils';

const addRouter = {
  React: (api: GeneratorAPI, historyMode: boolean, isTypescript: boolean) => {
    const routerNode = historyMode ? 'BrowserRouter' : 'HashRouter';
    const extension = isTypescript ? 'tsx' : 'jsx';

    api.extendPackage({
      dependencies: {
        'react-router-dom': '^6.4.2',
      },
    });

    api.injectImports(`src/main.${extension}`, {
      [routerNode]: {
        require: 'react-router-dom',
        kind: 'named',
      },
    });

    api.injectModifyCodeSnippetCb(`src/main.${extension}`, (code) =>
      injectRouterInReact(code, routerNode)
    );

    api.injectImports(`src/App.${extension}`, {
      routes: {
        require: './router',
        kind: 'default',
      },
      Route: {
        require: 'react-router-dom',
        kind: 'named',
      },
      Routes: {
        require: 'react-router-dom',
        kind: 'named',
      },
    });

    api.injectModifyCodeSnippetCb(`src/App.${extension}`, (code) =>
      injectHookInReact(
        code,
        {
          useRoutes: {
            require: 'react-router-dom',
            kind: 'named',
          },
        },
        {
          statement: 'const elements = useRoutes(routes);',
        }
      )
    );

    api.injectModifyCodeSnippetCb(
      `src/App.${extension}`,
      (code) =>
        replaceNodeInJSX(code, {
          className: 'App',
          statements: [`{elements}`],
        }) || code
    );

    api.render(`../template/template-react${isTypescript ? '-ts' : ''}`, {
      plugin: 'cli-plugin-router',
    });
  },
  Vue: (api: GeneratorAPI, historyMode: boolean, isTypescript: boolean) => {
    const extension = isTypescript ? 'ts' : 'js';

    api.extendPackage({
      dependencies: {
        'vue-router': '^4.1.5',
      },
    });

    api.injectImports(`src/main.${extension}`, {
      router: {
        require: './router',
        kind: 'default',
      },
    });

    api.injectModifyCodeSnippetCb(`src/main.${extension}`, (code) =>
      injectRootOptionInVue(code, 'router')
    );

    api.injectModifyCodeSnippetCb(`src/App.vue`, (code) =>
      replaceNodeInVue(
        code,
        `\n  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>\n`
      )
    );

    api.render(`../template/template-vue${isTypescript ? '-ts' : ''}`, {
      plugin: 'cli-plugin-router',
      data: {
        history: historyMode ? 'createWebHistory' : 'createWebHashHistory',
      },
    });
  },
};

export default (api: GeneratorAPI, options: any, answers: answersTypes) => {
  const isTypescript = answers.features?.includes('TypeScript') || false;
  const { historyMode = false, preset } = answers;
  addRouter[preset](api, historyMode, isTypescript);
};
