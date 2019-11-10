import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text, select, number, boolean } from '@storybook/addon-knobs';

import PasswordInput from './index.vue';

storiesOf('atoms/PasswordInput', module).add('パスワード入力', () => {
  return {
    components: { PasswordInput },
    data() {
      return {
        name: text('name', ''),
        value: text('value', ''),
        placeholder: text('placeholder', ''),
        required: boolean('required', false),
        maxlength: number('maxlength', 255),
        readonly: boolean('readonly', false),
        disabled: boolean('disabled', false),
        pattern: text('pattern', undefined),
        size: select('size', ['s', 'm', 'l'], 'm')
      }
    },
    template: "<PasswordInput :value='value' :name='name' :placeholder='placeholder' :required='required' :maxlength='maxlength' :disabled='disabled' :readonly='readonly' :pattern='pattern' :size='size' @input='onInput' @change='onChange' />",
    methods: {
      onInput: action('inputted'),
      onChange: action('changed')
    }
  };
}, { info: { summary: 'パスワード入力用inputコンポーネント<br>アイコンクリックでマスクされた文字列の表示・非表示を切り替えることができる' } });
