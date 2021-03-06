import { configure, addDecorator } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info';
import '@storybook/addon-console';
import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEye,
  faEyeSlash,
  faCaretDown,
  faCheck,
  faAsterisk,
  faCamera,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueThinModal from 'vue-thin-modal'

library.add(
  faEye,
  faEyeSlash,
  faCaretDown,
  faCheck,
  faAsterisk,
  faCamera,
  faUser
)

Vue.use(VueThinModal);
Vue.component('v-icon', FontAwesomeIcon)
Vue.config.productionTip = false

// automatically import all files ending in *.stories.js
const loadStories = require.context("../src", true, /stories\.js$/);
addDecorator(withInfo);
addDecorator(withKnobs);
configure(loadStories, module);
