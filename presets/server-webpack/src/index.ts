import path from 'path';
import type { StorybookConfig } from './types';

export * from './types';

export const webpack: StorybookConfig['webpack'] = (config) => {
  const rules = [
    ...(config.module?.rules || []),
    {
      type: 'javascript/auto',
      test: /\.stories\.json$/,
      use: path.resolve(__dirname, './loader.js'),
    },

    {
      type: 'javascript/auto',
      test: /\.stories\.ya?ml/,
      use: [path.resolve(__dirname, './loader.js'), require.resolve('yaml-loader')],
    },
  ];

  // eslint-disable-next-line no-param-reassign
  config.module = config.module || {};
  // eslint-disable-next-line no-param-reassign
  config.module.rules = rules;

  return config;
};
