<template lang='pug'>
  span.a-help-message {{ message }}
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang='scss' scoped>
.a-help-message {
  display: inline-block;
  padding-bottom: 1px;
  font-size: 12px;
  color: var(--color-mono-3);
}
</style>
