<template lang='pug'>
  .m-wizard
    ul.m-wizard__pages(:class="transitionClass")
      li.m-wizard__pages-content(v-for="(page, i) in pages" :class="contentClass(page)")
        h2.m-wizard__pages-content-title {{ page.title }}
        p.m-wizard__pages-content-description {{ page.description }}
        hr.m-wizard__pages-content-hr.m-wizard__pages-content-hr--top(v-if="!page.withoutHr")
        .m-wizard__pages-content-body(v-if="$slots[page.name]")
          slot(:name="page.name")
        hr.m-wizard__pages-content-hr.m-wizard__pages-content-hr--bottom(v-if="!page.withoutHr")
    p.m-wizard__guide(v-if="showingPage.guide")
      | {{ showingPage.guide }}
    .m-wizard__footer
      Button.m-wizard__footer-button.m-wizard__footer-button--prev(v-if="showingPage.showPrevButton" :title="showingPage.prevButtonTitle" :size="`l`" :color="showingPage.prevButtonColor ? showingPage.prevButtonColor : `normal`" @click="showingPage.onClickPrev($event), onClickPaging($event)")
      Button.m-wizard__footer-button.m-wizard__footer-button--next(v-if="showingPage.showNextButton" :title="showingPage.nextButtonTitle" :size="`l`" :color="showingPage.nextButtonColor ? showingPage.nextButtonColor : `black`" :disabled="stop" :disabledWithClick="true" @click="showingPage.onClickNext($event), onClickPaging($event)")
      Button.m-wizard__footer-button.m-wizard__footer-button--finish(v-if="showingPage.showFinishButton" :title="showingPage.finishButtonTitle" :size="`l`" :color="showingPage.finishButtonColor ? showingPage.finishButtonColor : `special`" :disabled="stop" @click="showingPage.onClickFinish($event), onClickPaging($event)")
</template>

<script>
import Button from '../../atoms/Button'

export default {
  name: 'Wizard',
  components: {
    Button
  },
  props: {
    viewingPage: {
      type: String,
      required: true
    },
    pages: {
      type: Array,
      required: true
    },
    stop: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      beforePageIndex: null
    }
  },
  computed: {
    showingPage() {
      return this.pages.find(page => page.name === this.viewingPage)
    },
    showingPageIndex() {
      return this.pages.findIndex(page => page.name === this.viewingPage)
    },
    transitionClass() {
      return this.beforePageIndex && this.beforePageIndex > this.showingPageIndex ? "m-wizard__pages--prev" : "m-wizard__pages--next"
    }
  },
  methods: {
    contentClass: function(page) {
      let contentClass = `m-wizard__pages-content--${page.name}`

      if(page.name && page.name === this.viewingPage) contentClass += ' m-wizard__pages-content--active'
      if(page.withoutHr) contentClass += ' m-wizard__pages-content--without-hr'

      return contentClass
    },
    onClickPaging: function() {
      this.beforePageIndex = this.showingPageIndex
    }
  }
}
</script>

<style lang="scss">
  @keyframes showNext {
    0%{
      opacity: 0;
      transform: translateX(100%);
    }
    100%{
      opacity: 1;
      transform: translateX(0%);
    }
  }
  @keyframes showPrev {
    0%{
      opacity: 0;
      transform: translateX(-100%);
    }
    100%{
      opacity: 1;
      transform: translateX(0%);
    }
  }
  .m-wizard {
    display: grid;
    grid-template:
      " pages " auto
      " guide " auto
      "   .   " 40px
      " footer" auto
      /100%;

    @media(max-width: $break-point--tablet){
      grid-template:
        " pages " auto
        " guide " auto
        "   .   " 30px
        " footer" auto
        /100%;
    }

    &__pages {
      grid-area: pages;

      &--prev{
        .m-wizard__pages-content {
          animation: showPrev .5s var(--transition-timing);
        }
      }

      &--next{
        .m-wizard__pages-content {
          animation: showNext .5s var(--transition-timing);
        }
      }

      &-content {
        display: none;
        grid-template:
          "title title title" auto
          ".       .       ." 24px
          "desc   desc  desc" auto
          ".       .       ." 60px
          "thr    thr    thr" auto
          ".       .       ." 60px
          ".      body     ." 1fr
          ".       .       ." 60px
          "bhr    bhr    bhr" auto
          /1fr    auto    1fr;
        
        @media(max-width: $break-point--tablet) {
          grid-template:
            "title" auto
            "  .  " 12px
            "desc " auto
            "  .  " 40px
            " thr " auto
            "  .  " 50px
            "body " 1fr
            "  .  " 40px
            " bhr " auto
            /100%;
        }

        &--active {
          display: grid;
        }

        &--without-hr {
          grid-template:
            "title title title" auto
            ".       .       ." 24px
            "desc   desc  desc" auto
            ".       .       ." 60px
            ".      body     ." 1fr
            /1fr    auto    1fr;
        }

        &-title {
          grid-area: title;
          font-size: 26px;
          font-weight: normal;
          color: var(--color-mono-1);
          text-align: center;
          letter-spacing: 1px;

          @media(max-width: $break-point--tablet){
            font-size: 20px;
          }
        }

        &-description {
          grid-area: desc;
          font-size: 16px;
          line-height: 2;
          color: var(--color-mono-1);
          text-align: center;
          white-space: pre;
        }

        &-hr {
          margin: 0;
          border-color: var(--color-mono-8);
          &--top {
            grid-area: thr;
          }
          &--bottom {
            grid-area: bhr;
          }
        }

        &-body {
          grid-area: body;
        }
      }
    }

    &__guide {
      grid-area: guide;
      padding-top: 60px;
      font-size: 13px;
      line-height: 1.6;
      color: var(--color-mono-3);
      text-align: center;
      word-wrap: break-word;
      white-space: pre-wrap;

      @media(max-width: $break-point--tablet) {
        padding-top: 35px;
        text-align: left;
      }
    }

    &__footer {
      display: flex;
      grid-area: footer;
      align-items: center;
      justify-content: center;

      &-button {
        @media(max-width: $break-point--tablet) {
          &.a-button--l {
            width: 100%;
            min-width: 0;
          }
        }
        + .m-wizard__footer-button {
          margin-left: 15px;
        }
      }
    }
  }
</style>
