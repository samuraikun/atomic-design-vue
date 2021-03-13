const customWebpack = require('./webpack.config')

module.exports = {
  stories: ['../src/components/**/*.stories.js'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-notes/register',
    '@storybook/addon-viewport'
  ],
  webpackFinal: async config => {
    const customConfig = await customWebpack({ config, mode: 'DEVELOPMENT' })
    
    return { ...config, module: {...config.module, rules: customConfig.module.rules } }
  }
}