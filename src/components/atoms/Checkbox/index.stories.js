import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import Checkbox from './index.vue';

const propsDescription = {
  Checkbox: {
    title: "ラベルテキストを設定"
  }
}

storiesOf('atoms/Checkbox', module)
.add('default', () => {
  return {
    components: { Checkbox },
    data() {
      return {
        title: text('title', 'title'),
        name: text('name', ''),
        value: text('value', ''),
        checked: boolean('checked', false),
        required: boolean('required', false),
        readonly: boolean('readonly', false),
        disabled: boolean('disabled', false)
      }
    },
    template: "<Checkbox :title='title' :value='value' :name='name' :checked='checked' :required='required' :readonly='readonly' :disabled='disabled' @change='onChange' />",
    methods: {
      onChange: action('changed')
    },
    propsDescription
  };
}, { info: { summary: 'チェックボックスコンポーネント' } })
.add('タイトルを子要素で指定', () => {
  return {
    components: { Checkbox },
    data() {
      return {
        title: text('title', 'title'),
        name: text('name', ''),
        value: text('value', ''),
        checked: boolean('checked', false),
        required: boolean('required', false),
        readonly: boolean('readonly', false),
        disabled: boolean('disabled', false)
      }
    },
    template: "<Checkbox :value='value' :name='name' :checked='checked' :required='required' :readonly='readonly' :disabled='disabled' @change='onChange'><a href='#'>{{title}}</a></Checkbox>",
    methods: {
      onChange: action('changed')
    },
    propsDescription
  };
}, { info: { summary: 'チェックボックスコンポーネント' } });
