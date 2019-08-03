import { configure, addDecorator } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info';
import '@storybook/addon-console';

// automatically import all files ending in *.stories.js
const req = require.context("../src", true, /stories\.js$/);
const loadStories = req.keys().forEach(req);
addDecorator(withInfo);
addDecorator(withKnobs);
configure(loadStories, module);
