import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { array } from '@storybook/addon-knobs'
import IndicatorList from './index.vue';

storiesOf('molecules/IndicatorList', module)
.add('IndicatorList', () => {
  return {
    components: { IndicatorList },
    data() {
      return {
        titles: array("titles", [{
          name: "phase1",
          title: "phase1"
        }, {
          name: "phase2",
          title: "phase2"
        }, {
          name: "phase3",
          title: "phase3"
        }]),
        passedPages: array("passedPages", ["phase1"])
      }
    },
    template: `<IndicatorList :passedPages="passedPages" :titles="titles"></IndicatorList>`,
    methods: {action: action('clicked')},
    propsDescription: {
      IndicatorList: {
        passedPages: '現在地を表す。titlesのpageと一致している',
        titles: '各インジケータのタイトルとなるテキストをハッシュで渡す'
      }
    }
  };
},
{
  info: {
    summary: 'ステップがある処理の進行度合いを表現するコンポーネント。'
  }
});
