<template lang='pug'>
  .a-card
    slot
</template>
<script>
export default {
  name: 'Card',
}
</script>
<style lang='scss' scoped>
.a-card {
  padding: 60px;
  background: var(--color-mono-c);
  border-radius: 5px;
  box-shadow: var(--decoration-card-shadow);
}
</style>