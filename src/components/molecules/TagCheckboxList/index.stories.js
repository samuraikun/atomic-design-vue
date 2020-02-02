import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { object, boolean, number } from '@storybook/addon-knobs';

import TagCheckboxList from './index.vue';

const componentInfo = 'TagCheckboxをリスト化したコンポーネント';

storiesOf('molecules/TagCheckboxList', module)
.add('TagCheckboxList', () => {
  return {
    components: { TagCheckboxList },
    data() {
      const props = {
        tags: [{
          name: 'name1',
          id: 1
        },{
          name: 'name2',
          id: 2
        },{
          name: 'name3',
          id: 3
        }],
        name: 'specializations',
        required: boolean('required', false),
        minlength: number('minlength', 0),
        maxlength: number('maxlength', 0)
      }

      // TagCheckboxList knobs
      object('TagCheckboxList Props', props);

      return {
        tags: props.tags,
        name: props.name,
        required: props.required,
        minlength: props.minlength,
        maxlength: props.maxlength
      }
    },
    propsDescription: {
      TagCheckboxList: {
        tags: "Tagのインスタンスを配列で入れてください",
        name: "checkboxをグルーピングするname属性になります"
      }
    },
    template: `
      <TagCheckboxList
        :tags='tags'
        :name='name'
        :required='required'
        :minlength='minlength'
        :maxlength='maxlength'
        @change='onChange'
      >
      </TagCheckboxList>
    `,
    methods: {
      onChange: action('onChange')
    }
  }
}, { info: { summary: componentInfo } });
