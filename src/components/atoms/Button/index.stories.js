import { action } from '@storybook/addon-actions'
import Button from './index.vue'

export default {
  component: Button,
  title: 'Atoms/Button',
  parameters: {
    notes: `
      ## Description
      ### Default
      クリック時にdisabledにする。二重送信防止対応。
      ### Link Tag
      ':href'を指定していると自動的にaタグになる。
    `,
  },
  argTypes: {
    type: { control: { type: 'select', options: ['submit', 'button', 'reset'] } },
    size: { control: { type: 'select', options: ['default', 's', 'm', 'l']    } },
    color: { control: { type: 'select', options: ['special', 'primary', 'black', 'border', 'normal', 'blue', 'blue-border'] } },
    href: { control: { type: 'text'} },
    disabled: { control: { type: 'boolaen', options: false} },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button v-bind="$props" @click="onClick" />',
  methods: {
    onClick: action('Clicked'),
  },
})

export const normal = Template.bind({})
normal.storyName = 'Default'
normal.args = {
  title: 'Default Button',
  color: 'primary',
}

export const link = Template.bind({})
link.storyName = 'Link Tag'
link.args = {
  title: 'Default Button',
  color: 'blue',
  href: 'https://github.com/samuraikun',
}