import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import Input from './index.vue';

storiesOf('atoms/Input', module).add('Input', () => {
  return {
    components: { Input },
    data() {
      return {
        type: select('type', ['text', 'number', 'url', 'email', 'password'], 'text'),
        name: text('name', ''),
        placeholder: text('placeholder', 'ex. Input something...'),
        required: boolean('required', false),
        autocomplete: select('autocomplete', ['on', 'off', 'default'], 'default'),
        maxlength: number('maxlength', 255),
        readonly: boolean('readonly', false),
        disabled: boolean('disabled', false),
        pattern: text('pattern', undefined)
      }
    },
    template: "<Input :type='type' value='' :name='name' :placeholder='placeholder' :required='required' :maxlength='maxlength' :autocomplete='autocomplete' :disabled='disabled' :readonly='readonly' :pattern='pattern' @input='onInput' @change='onChange' />",
    methods: {
      onInput: action('inputted'),
      onChange: action('changed')
    }
  };
}, { info: { summary: '' } });
