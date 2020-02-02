import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text, boolean, select, number } from '@storybook/addon-knobs';
import InputSet from './index.vue';
import Input from '../../atoms/Input/index.vue';
import TagCheckboxList from '../../molecules/TagCheckboxList/index.vue';

const data = {
  type: text('type', 'email'),
  title: text('title', 'Eメールアドレス'),
  value: text('value', ''),
  inputClass: text('inputClass', 'm-input-set__input'),
  name: text('name', ''),
  placeholder: text('placeholder', '例) ほげほげ'),
  required: boolean('required', false),
  autocomplete: select('autocomplete', ['on', 'off', 'default'], 'default'),
  maxlength: number('maxlength', 255),
  readonly: boolean('readonly', false),
  disabled: boolean('disabled', false),
  pattern: text('pattern', undefined),
  helpMessage: "※ヘルプ用の文言"
}

storiesOf('molecules/InputSet', module)
.add('Default', () => {
  return {
    components: { InputSet, Input },
    data() {
      return data
    },
    template: `
      <InputSet :title='title' :help-message='helpMessage'>
        <Input :type='type' :value='value' :class='inputClass' :name='name' :placeholder='placeholder' :required='required' :autocomplete='autocomplete' :maxlength='maxlength' :readonly='readonly' :disabled='disabled' :pattern='pattern' @input="onInput" @change="onChange" />
      </InputSet>`,
    methods: {
      onInput: action('inputed'),
      onChange: action('changed')
    }
  }
}, { info: { summary: 'Input やラベル用テキストを包含した label タグの Molecule' } })
.add('子がrequired', () => {
  return {
    components: { InputSet, Input },
    data() {
      return data
    },
    template: `
      <InputSet :title='title' :help-message='helpMessage'>
        <Input :type='type' :value='value' :class='inputClass' :name='name' :placeholder='placeholder' :required='true' :autocomplete='autocomplete' :maxlength='maxlength' :readonly='readonly' :disabled='disabled' :pattern='pattern' @input="onInput" @change="onChange" />
      </InputSet>`,
    methods: {
      onInput: action('inputed'),
      onChange: action('changed')
    }
  }
}, { info: { summary: 'Input やラベル用テキストを包含した label タグの Molecule' } })
.add('disablePointerEventsを有効', () => {
  return {
    components: { InputSet, TagCheckboxList },
    data() {
      return {
        disablePointerEvents: boolean('disablePointerEvents', true),
        tags: [{
          id:1,
          name: 'JavaScript'
        }, {
          id: 2,
          name: 'TypeScript'
        }, {
          id: 3,
          name: 'Ruby'
        }, {
          id: 4,
          name: 'Python'
        }, {
          id: 5,
          name: 'PHP'
        }, {
          id: 6,
          name: 'Java'
        }, {
          id: 7,
          name: 'Golang'
        }, {
          id: 8,
          name: 'Scala'
        }]
      };
    },
    template: `
      <InputSet :disablePointerEvents="disablePointerEvents" title='プログラミング言語' help-message='※開発経験のあるプログラミング言語をご選択ください'>
        <TagCheckboxList class="m-input-set__input" :tags="tags" :name="'specializations'"/>
      </InputSet>
        `,
    methods: {
      onInput: action('inputed'),
      onChange: action('changed')
    }
  }
}, { info: { summary: 'disablePointerEventsをtrueにすることでlabel要素ではなくspan要素でラップすることができる。<br>チェックボックスやラジオボタンなど、ラベルのクリックを無効にしたい組み合わせの際に利用。' } })
