<template lang='pug'>
  .t-single-column(:class="headerStyleClass")
    .t-single-column__header
      slot(name="header" )
    .t-single-column__main
      slot(name="main")
</template>

<script>
  export default {
    name: 'SingleColumn',
    props: {
      hasHeaderBorder: {
        type: Boolean,
        required: false,
        default: true
      },
      wideHeader: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    computed: {
      headerStyleClass(){
        return `${this.hasHeaderBorder ? '' : 't-single-column--without-header-border'} ${this.wideHeader ? 't-single-column--wide-header' : ''}`
      }
    }
  }
</script>

<style lang="scss">
.t-single-column {
  display: grid;
  grid-template:
    'header header header' 50px
    '   .      .      .  ' 70px
    '   .     main    .  ' 1fr
    '   .      .      .  ' 80px
    / 40px 1fr 40px;

  @media (max-width: $break-point--tablet) {
    grid-template:
      'header header header' 50px
      '   .      .      .  ' 60px
      '   .     main    .  ' 1fr
      '   .      .      .  ' 50px
      / 30px 1fr 30px;
  }

  &--wide-header {
    grid-template:
      'header header header' 70px
      '   .      .      .  ' 70px
      '   .     main    .  ' 1fr
      '   .      .      .  ' 80px
      / 40px 1fr 40px;

    @media (max-width: $break-point--tablet) {
      grid-template:
        'header header header' 70px
        '   .      .      .  ' 60px
        '   .     main    .  ' 1fr
        '   .      .      .  ' 50px
        / 30px 1fr 30px;
    }
  }

  &--without-header-border {
    border: none;
  }

  &__header {
    box-sizing: border-box;
    grid-area: header;
    border-bottom: 1px solid var(--color-mono-9);
  }

  &__main {
    grid-area: main;
  }
}
</style>
