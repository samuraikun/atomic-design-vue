import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs'

import SingleColumn from './index.vue';

storiesOf('templates/SingleColumn', module)
.add('default', () => {
  return {
    components: { SingleColumn },
    data() {
      return {
        wideHeader: boolean('wideHeader', false),
        hasHeaderBorder: boolean('hasHeaderBorder', true)
      }
    },
    template: `
    <SingleColumn :wideHeader="wideHeader" :hasHeaderBorder="hasHeaderBorder">
      <template v-slot:header>HEADER</template>
      <template v-slot:main>MAIN</template>
    </SingleColumn>
    `
  };
}, { info: { summary: 'ヘッダー部とメイン部のみの1カラム構成テンプレート。<br>slotでヘッダーとメインに描画したいテンプレートを渡す。<br>ヘッダーのボーダー有り・無し、高さを太くするかをBooleanで制御。' } })
