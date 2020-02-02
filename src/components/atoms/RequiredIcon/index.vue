<template lang='pug'>
  v-icon.a-required-icon(:icon="valid? 'check' : 'asterisk'" :class="valid ? 'a-required-icon--valid' : 'a-required-icon--invalid'")
</template>

<script>
export default {
  name: 'RequiredIcon',
  props: {
    valid: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style lang='scss' scoped>
.a-required-icon {
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  font-size: 10px;
  transition: .5s background var(--transition-timing), .5s color var(--transition-timing);

  &--valid{
    color: var(--color-mono-c);
    background: var(--color-sushi);
    border-radius: 50%;
    transform: perspective(1000px) translate3d(1px, -1px, -360px);
  }

  &--invalid{
    color: var(--color-red);
    transform: perspective(1000px) translate3d(-2px, -6px, -300px);
  }
}
</style>
