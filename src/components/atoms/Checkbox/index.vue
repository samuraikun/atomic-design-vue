<template lang='pug'>
label.a-checkbox(:class='stateClass')
  input.a-checkbox__input(
    type='checkbox'
    :value='value'
    :checked="checked"
    :name='name'
    :required='required'
    :disabled='disabled'
    :readonly='readonly'
    @change='onChange')
  span.a-checkbox__title
    slot {{ title }}
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    title: {
      type: [String, Number],
      required: false,
      default: ''
    },

    value: {
      type: [String, Number],
      required: false,
      default: null
    },

    checked: {
      type: Boolean,
      required: false,
      default: false
    },

    name: {
      type: String,
      required: false,
      default: null
    },

    required: {
      type: Boolean,
      required: false,
      default: false
    },

    disabled: {
      type: Boolean,
      required: false,
      default: null
    },

    readonly: {
      type: Boolean,
      required: false,
      default: null
    }
  },
  computed: {
    stateClass(){
      const { readonly, disabled } = this
      return [readonly ? `a-checkbox--readonly`: null, disabled ? `a-checkbox--disabled`: null]
    }
  },
  methods: {
    onChange(e) {
      this.$emit('change', e);
    }
  }
};
</script>

<style lang='scss' scoped>
.a-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;

  &--readonly,
  &--disabled{
    pointer-events: none;
    cursor: default;
  }

  &--disabled{
    pointer-events: none;
    opacity: .6;
  }

  &__input{
    display: none;
  }

  &__title{
    margin-left: 5px;
    font-size: 14px;
    color: black;
    user-select: none;
  }
}
</style>
