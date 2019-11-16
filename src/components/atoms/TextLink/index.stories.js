import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';
import TextLink from './index.vue';

const propsDescription = {
  Checkbox: {
    text: "リンクのテキスト"
  }
}

storiesOf('atoms/TextLink', module)
.add('default', () => {
  return {
    components: { TextLink },
    data() {
      return {
        text: text('text', 'これは私の経歴書')
      };
    },
    template: "<TextLink :text='text' href='https://github.com/samuraikun/Curriculum-Vitae' />",
    propsDescription
  }
}, { info: { summary: 'リンク' } })
.add('テキストを子要素で指定', () => {
  return {
    components: { TextLink },
    data() {
      return {
        text: text('text', 'これは私の経歴書')
      }
    },
    template: "<TextLink>{{text}}</TextLink>",
    propsDescription
  };
}, { info: { summary: 'テキストを子要素で指定できます' } });
