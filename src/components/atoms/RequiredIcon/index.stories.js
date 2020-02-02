import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';

import RequiredIcon from './index.vue';

storiesOf('atoms/RequiredIcon', module)
.add(
  'default',
  () => {
    return {
      components: { RequiredIcon },
      data() {
        return {
          valid: boolean('valid', false) 
        }
      },
      template: `
        <RequiredIcon :valid='valid' />
      `
    }
  },
  { info: { summary: '必須項目かどうかを判別するアイコン' } }
);
