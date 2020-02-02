<template lang='pug'>
  ul.m-indicator-list
    li.m-indicator-list__item(v-for="(item, i) in titles" :class="itemClass(item.name)")
      span.m-indicator-list__item-wrapper
        v-icon.m-indicator-list__item-sign(icon='check' size='xs')
        span.m-indicator-list__item-title {{item.title}}
</template>

<script>
  export default {
    name: 'IndicatorList',
    props: {
      titles: {
        type: Array,
        required: true
      },
      passedPages: {
        type: Array,
        required: false,
        default: []
      }
    },
    methods: {
      itemClass: function(name){
        return this.passedPages.includes(name) ? 'm-indicator-list__item--active' : '';
      }
    }
  }
</script>

<style lang="scss">
  .m-indicator-list{
    display: flex;
    &__item{
      display: flex;
      align-items: center;
      padding: 8px 0 26px 0;  //absoluteで管理されている子の高さも勘案してpaddingを入れている

      &:before {
        display: block;
        width: 80px;
        height: 2px;
        margin: 0 26px;
        content: "";
        background: var(--color-mono-5);
        transition: 1s all var(--transition-timing);
      }

      &:first-of-type{
        &:before{
          display: none;
        }
      }

      &--active{
        &:before {
          background: var(--color-green);
        }
        .m-indicator-list__item-sign{
          color: var(--color-mono-c);
          background: var(--color-green);
          transform: scale(2);
        }
        .m-indicator-list__item-title{
          color: var(--color-green);
        }
      }

      &-wrapper{
        position: relative;
        display: flex;
        flex-direction: column;
      }

      &-sign {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3px;
        width: 16px;
        height: 10px;
        font-family: var(--font-family-alphanumeric);
        font-size: 10px;
        line-height: .8;
        color: transparent;
        text-align: center;
        background: var(--color-mono-5);
        border-radius: 100%;
        transition: .75s all var(--transition-timing--bounce);
        transform: scale(1);

        &:before{
          transform: scale(.7);
        }
      }

      &-title{
        position: absolute;
        bottom: -24px;
        left: -92px;
        width: 200px;
        font-size: 12px;
        font-weight: normal;
        color: var(--color-mono-5);
        text-align: center;
        word-break: keep-all;
      }
    }
  }
</style>
