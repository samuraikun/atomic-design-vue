import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';
import LabelText from './index.vue';

storiesOf('atoms/LabelText', module).add('LabelText', () => {
  return {
    components: { LabelText },
    data() {
      return {
        text: text('text', '日本語 and alphabet')
      };
    },
    propsDescription: {
      LabelText: {
        text: "表示用テキスト"
      }
    },
    template: "<LabelText :text='text' />",
  }
}, { info: { summary: 'フォームのラベル用テキストコンポーネント' } });
