import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { array, object, select, boolean } from '@storybook/addon-knobs';
import Select from './index.vue';

storiesOf('atoms/Select', module).add('SimpleArray', () => {
  return {
    components: { Select },
    data() {
      return {
        options: array('options', ['foo', 'bar', 'baz']),
        size: select('size', ['s', 'm', 'l'], 'm'),
        disabled: boolean('disabled', false)
      };
    },
    template: `<Select :size="size" :options="options" :disabled="disabled" @change="onChange" />`,
    methods: {
      onChange: action("onChange")
    },
    propsDescription: {
      Select: {
        size: "コンポーネントの高さを設定できます。デフォルトはmサイズ",
        options: "option要素を生成するための配列",
        selected: "初期値にしたい値",
        disabled: "disabledの有効・向こう"
      }
    }
  }
}, { info: { summary: "プルダウン用の Atom です。options に配列を渡して使うことを想定しています。" } })
.add('ObjectArray', () => {
  return {
    components: { Select },
    data() {
      return {
        options: array('options', [
          object("option1", {label: 'フー', value: 'foo'}),
          object("option2", {label: 'バー', value: 'bar'}),
          object("option3", {label: 'バズ', value: 'baz'})
        ])
      };
    },
    template: `<Select :size="size" :options="options" :selected="'bar'" @change="onChange" />`,
    methods: {
      onChange: action("onChange")
    },
    propsDescription: {
      Select: {
        optionLabelKey: "Object で渡ったオプションのプロパティが、'label'以外の場合は、この props にプロパティ名を明示的に渡す",
        optionValueKey: "Object で渡ったオプションのプロパティが、'value' 以外の場合は、この props にプロパティ名を明示的に渡す",
        selected: "初期値にしたい値"
      }
    }
  }
}, { info: { summary: "プルダウン用の Atom です。options に { label: ???, value: ??? } 形式の Object の配列を渡して使うことを想定しています" } });
