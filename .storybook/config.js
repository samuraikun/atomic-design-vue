import { configure, addDecorator } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info';
import '@storybook/addon-console';
import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faEye,
  faEyeSlash
)

Vue.component('v-icon', FontAwesomeIcon)
Vue.config.productionTip = false

// automatically import all files ending in *.stories.js
const loadStories = require.context("../src", true, /stories\.js$/);
addDecorator(withInfo);
addDecorator(withKnobs);
configure(loadStories, module);
