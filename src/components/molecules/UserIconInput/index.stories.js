import { action } from '@storybook/addon-actions'
import UserIconInput from './index.vue'
import sampleImage from '../../../images/sample-photo.png'

export default {
  component: UserIconInput,
  title: 'Molecules/UserIconInput',
  parameters: {
    notes: `
      ## Description
      ### Default
      ユーザアイコン登録用のfile inputコンポーネント<br>サムネイルはクライアント側でbase64データを作っているのでサーバリクエストはしていない
      ### srcを書き換え
      ユーザアイコン登録用のfile inputコンポーネント<br>サムネイルはクライアント側でbase64データを作っているのでサーバリクエストはしていない
    `
  },
  argTypes: {
    src: { control: { type: 'text' } },
    size: { control: { type: 'select', options: ['20', '24', '28', '32', '36', '40', '60', '90', '100'] } }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { UserIconInput },
  template: '<UserIconInput v-bind="$props" @change="onChange"/>',
  methods: {
    onChange: action('onChange')
  },
})

export const normal = Template.bind({})
normal.storyName = 'Default'
normal.args = {
  src: sampleImage,
  size: '100'
}

export const propsSrc = Template.bind({})
normal.storyName = 'props src'
normal.args = {
  src: 'https://randomuser.me/api/portraits/women/60.jpg',
  size: '100'
}
