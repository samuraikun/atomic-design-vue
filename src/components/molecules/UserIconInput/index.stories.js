import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';

import UserIconInput from './index.vue';
import sampleImage from '../../../images/sample-photo.png';

storiesOf('molecules/UserIconInput', module)
.add('デフォルト画像', () => {
  return {
    components: { UserIconInput },
    data() {
      return {
        src: text('初期表示に使う画像データ', sampleImage),
        size: select('画像サイズ', ['20', '24', '28', '32', '36', '40', '60', '90', '100'], '100')
      }
    },
    template: '<UserIconInput :src="src" :size="size" @change="onChange"/>',
    propsDescription:{
      UserIconInput: {
        src: '初期表示に使う画像データ',
        size: '画像サイズ'
      }
    },
    methods: {
      onChange: action('onChange')
    }
  };
}, { info: { summary: 'ユーザアイコン登録用のfile inputコンポーネント<br>サムネイルはクライアント側でbase64データを作っているのでサーバリクエストはしていない' } })
.add('srcを書き換え', () => {
  return {
    components: { UserIconInput },
    data() {
      return {
        src: text('初期表示に使う画像データ', 'https://randomuser.me/api/portraits/women/60.jpg'),
        size: select('画像サイズ', ['20', '24', '28', '32', '36', '40', '60', '90', '100'], '100')
      }
    },
    template: '<UserIconInput :src="src" :size="size" @change="onChange"/>',
    propsDescription:{
      UserIconInput: {
        src: '初期表示に使う画像データ',
        size: '画像サイズ'
      }
    },
    methods: {
      onChange: action('onChange')
    }
  };
}, { info: { summary: 'ユーザアイコン登録用のfile inputコンポーネント<br>サムネイルはクライアント側でbase64データを作っているのでサーバリクエストはしていない' } });
