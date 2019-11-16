import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { object, text, boolean } from '@storybook/addon-knobs';
import TagCheckbox from './index.vue';

storiesOf('atoms/TagCheckbox', module).add('TagCheckbox', () => {
  return {
    components: { TagCheckbox },
    data() {
      return {
        tag: object('tag', {
          id: 1,
          name: 'tag name',
        }),
        name: text('text', 'free_word_tags[]'),
        checked: boolean('checked', false)
      }
    },
    template: `
      <TagCheckbox
        :tag='tag'
        :name='name'
        :checked='checked'
        @change='onChange'
      >
      </TagCheckbox>
    `,
    methods: {
      onChange: action('onChange')
    }
  }
}, { info: { summary: 'タグ用途のチェックボックス' } });
