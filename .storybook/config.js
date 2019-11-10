import { configure, addDecorator } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info';
import '@storybook/addon-console';

// automatically import all files ending in *.stories.js
const loadStories = require.context("../src", true, /stories\.js$/);
addDecorator(withInfo);
addDecorator(withKnobs);
configure(loadStories, module);
