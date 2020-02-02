import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';
import HelpText from './index.vue';

storiesOf('atoms/HelpText', module).add('Default', () => {
  return {
    components: { HelpText },
    data() {
      return {
        message: text('message', '※ヘルプ用の文言')
      }
    },
    template: `
      <HelpText :message='message' />
`
  };
});
