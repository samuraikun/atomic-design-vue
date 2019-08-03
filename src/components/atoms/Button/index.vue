<template lang="pug">
  button(:type='type' :class='buttonStyle' :disabled='disabled' @click='onClick')
    slot {{ title }}
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: "button",
      required: false
    },
    title: {
      type: String,
      required: false,
      default: null
    },
    size: {
      type: String,
      required: false,
      default: 'm'
    },
    color: {
      type: String,
      required: false,
      default: 'normal'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    buttonStyle() {
      return `a-button ${this.buttonColor} ${this.buttonSize} ${this.buttonDisabled}`;
    },
    buttonSize() {
      const sizes = ['m', 'l'];

      return sizes.includes(this.size) ? `a-button--${this.size}` : '';
    },
    buttonColor() {
      const colors = ['primary', 'normal'];

      return colors.includes(this.color) ? `a-button--${this.color}` : '';
    },
    buttonDisabled() {
      return this.disabled ? `a-button--disabled` : '';
    }
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
    }
  }
}
</script>

<style lang="scss" scoped>
.a-button {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 30px;
  padding: 0 20px;
  font-size: 13px;
  font-weight: bold;
  line-height: 1;
  text-decoration: none;
  letter-spacing: .5px;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  border-radius: 3px;
  outline: none;
  transition: .3s background, .5s transform cubic-bezier(0, .94, .06, 1);;
  appearance: none;
  transform:  perspective(1000px) translateZ(0px);

  &:active{
    transform:  perspective(1000px) translateZ(-15px);
  }

  &--m {
    min-width: 120px;
    height: 30px;
    font-size: 13px;
  }

  &--l {
    min-width: 180px;
    height: 48px;
    font-size: 16px;
  }

  &--no-min-width {
    min-width: auto;
  }

  &--primary {
    color: #ffffff;
    background-color: #111111;

    &:hover,
    &:active{
      background-color: #166eb6;
    }
  }

  &--normal {
    color: #333333;
    background-color: #f2f2f2;

    &:hover,
    &:active{
      color: #111111;
      background-color: #e8e8e8;
    }
  }

  &--disabled,
  &:disabled {
    pointer-events: none;
    cursor: normal;
    opacity: .3;
  }
}
</style>


