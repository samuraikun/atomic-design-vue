import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text, object, array } from '@storybook/addon-knobs'
import Wizard from './index.vue';

const propsDescription = {
  Wizard: {
    viewingPage: '現在地を表す。viewingPageでpages[n].nameを指定することでアニメーション遷移する。',
    pages: '各ページを構成するためのObject',
    stop: 'trueにするとnextButton, finishButtonがdisabledに設定される'
  }
}

storiesOf('molecules/Wizard', module)
.add('Default', () => {
  return {
    components: { Wizard },
    data() {
      return {
        viewingPage: text("viewingPage", "content1"),
        pages: array("pages", [
          object("content1", {
            name: "content1",
            title: "title1",
            description: "description1",
            guide: "guide1",
            showNextButton: true,
            nextButtonTitle: "START",
            onClickNext: this.onClickNext,
          }),
          object("content2", {
            name: "content2",
            title: "title2",
            description: "description2",
            guide: "guide2",
            showPrevButton: true,
            showNextButton: true,
            onClickPrev: this.onClickPrev,
            onClickNext: this.onClickNext,
            prevButtonTitle: "BACK",
            nextButtonTitle: "NEXT"
          }),
          object("content3", {
            name: "content3",
            title: "title3",
            description: "description3",
            guide: "guide3",
            showFinishButton: true,
            finishButtonTitle: "FINISH!!!",
            withoutHr: true,
            onClickFinish: this.onClickFinish
          })
        ]),
        stop: true
      }
    },
    template: `
      <Wizard ref="wizard" :viewingPage="viewingPage" :pages="pages" :stop="stop">
        <template slot="content1">
          <span>1</span>
        </template>
        <template slot="content2">
          <span>2</span>
        </template>
        <template slot="content3">
          <span>3</span>
        </template>
      </Wizard>
    `,
    methods: {
      onClickPrev(){
        const nextIndex = this.$refs.wizard.showingPageIndex - 1
        this.viewingPage = this.pages[nextIndex].name
        action('onClickPrev')
      },
      onClickNext(){
        const nextIndex = this.$refs.wizard.showingPageIndex + 1
        this.viewingPage = this.pages[nextIndex].name
        action('onClickNext')
      },
      onClickFinish(){
        alert("Finish")
      }
    },
    mounted() {
      setTimeout(() => {
        this.stop = false
      }, 2000)
    },
    propsDescription
  };
},
{
  info: {
    summary: 'ステップがある処理を右から左へアニメーションさせながら表現するコンポーネント。'
  }
});
