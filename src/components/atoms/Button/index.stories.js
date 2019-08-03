import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { select, boolean, text } from '@storybook/addon-knobs';
import Button from './index.vue';

storiesOf('atoms/Button', module)
  .add('default', () => {
    return {
      components: { Button },
      data() {
        return {
          title: text('title', 'Buttonやで！'),
          type: select('type', ['submit', 'button', 'reset']),
          size: select('size', ['default', 'm', 'l']),
          color: select('color', ['primary', 'normal'], 'normal'),
          disabled: boolean('diabled', false)
        }
      },
      template: `
        <Button
          :title='title'
          :type='type'
          :size='size'
          :color='color'
          :disabled='disabled'
          @click='onClick'
        >
        </Button>
      `,
      methods: {
        onClick: action('clicked!')
      }
    }
  }, { info: { summary: 'Atom Button' } })
