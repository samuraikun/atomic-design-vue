import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import Textarea from './index.vue';

storiesOf('atoms/Textarea', module).add('default', () => {
  return {
    components: { Textarea },
    data() {
      return {
        value: text('value', 'text'),
        type: select('type', ['text', 'number', 'url', 'email', 'password'], 'text'),
        name: text('name', ''),
        placeholder: text('placeholder', '例) ほげほげ'),
        required: boolean('required', false),
        autocomplete: select('autocomplete', ['on', 'off', 'default'], 'default'),
        minlength: number('minlength', 0),
        maxlength: number('maxlength', 255),
        readonly: boolean('readonly', false),
        disabled: boolean('disabled', false),
        pattern: text('pattern', undefined),
        resize: select('resize', ['vertical', 'horizontal', 'both', 'none'], 'vertical'),
        spellcheck: boolean('spellcheck', true),
        rows: number('rows', 1),
        cols: number('cols', 20),
        wrap: select('wrap', ['soft', 'hard'], 'soft')
      }
    },
    template: "<Textarea :value='value' :name='name' :placeholder='placeholder' :required='required' :minlength='minlength' :maxlength='maxlength' :autocomplete='autocomplete' :disabled='disabled' :readonly='readonly' :pattern='pattern' :resize='resize' :spellcheck='spellcheck' :cols='cols' :rows='rows' :wrap='wrap' @input='onInput' @change='onChange'></Textarea>",
    methods: {
      onInput: action('inputed'),
      onChange: action('changed')
    }
  };
}, { info: { summary: 'テキストエリアコンポーネント' } });
