<template lang='pug'>
  a.a-text-link
    slot {{text}}
</template>

<script>
export default {
  name: 'TextLink',
  props: {
    text: {
      type: String,
      required: false,
      default: null
    }
  }
};
</script>

<style lang='scss' scoped>
.a-text-link {
  color: var(--color-text-link);
  text-decoration: none;
  &:hover,
  &:active {
    color: var(--color-text-link--hover);
  }
}
</style>
