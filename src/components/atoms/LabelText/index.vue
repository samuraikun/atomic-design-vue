<template lang='pug'>
  span.a-label-text {{ text }}
</template>

<script>
export default {
  name: 'LabelText',
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang='scss' scoped>
.a-label-text {
  font-size: 13px;
  font-weight: bold;
  line-height: 1.2;
  color: var(--color-mono-2);
}
</style>
