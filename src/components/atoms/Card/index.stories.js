import { storiesOf } from '@storybook/vue'
import Card from './index.vue'
import Input from '../../atoms/Input/index.vue'
import InputSet from '../../molecules/InputSet/index.vue'

storiesOf('atoms/Card', module).add('Default', () => {
  return {
    components: { Card },
    data() {
      return {}
    },
    template: '<Card />'
  }
}, { info: { summary: 'Cardのコンポーネント' } })
.add('中身を入れて表示', () => {
  return {
    components: { Card, Input, InputSet },
    data() {
      return {
        inputNameTitle: '名前',
        inputFuriganaTitle: 'フリガナ',
      }
    },
    template: `
      <div style='background: gray; padding: 30px; height: 100vh;'>
        <Card>
          <InputSet :title='inputNameTitle'>
            <Input>
            </Input>
          </InputSet>
          <InputSet :title='inputFuriganaTitle'>
            <Input>
            </Input>
          </InputSet>
        </Card>
      </div>
    `
  }
}, { info: { summary: 'Cardの中身を入れて表示' } })