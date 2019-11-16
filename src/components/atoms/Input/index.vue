<template lang="pug">
input.a-input(
  :type='type'
  :value='value'
  :name='name'
  :placeholder='placeholder'
  :required='required'
  :min='min'
  :max='max'
  :minlength='minlength'
  :maxlength='maxlength'
  :autocomplete='autocomplete'
  :disabled='disabled'
  :readonly='readonly'
  :pattern='pattern'
  @input='onInput'
  @change='onChange'
)
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      required: false,
      default: 'text',

      validator: (value) => {
        return ['text', 'number', 'url', 'email', 'password'].includes(value);
      }
    },

    value: {
      type: [String, Number],
      required: false,
      default: null
    },

    name: {
      type: String,
      required: false,
      default: null
    },

    placeholder: {
      type: String,
      required: false,
      default: ''
    },

    required: {
      type: Boolean,
      required: false,
      default: false
    },

    min: {
      type: [String, Number],
      required: false,
      default: null
    },

    max: {
      type: [String, Number],
      required: false,
      default: null
    },

    minlength: {
      type: [String, Number],
      required: false,
      default: 0
    },

    maxlength: {
      type: [String, Number],
      required: false,
      default: 255
    },

    autocomplete: {
      type: String,
      required: false,
      default: "off"
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
    },

    pattern: {
      type: String,
      required: false,
      default: null
    }
  },

  methods: {
    onInput(e) {
      this.$emit('input', e);
    },
    onChange(e) {
      this.$emit('change', e);
    }
  }
}
</script>

<style lang="scss" scoped>
.a-input {
  box-sizing: border-box;
  width: 100%;
  min-height: 40px;
  padding: 0 10px;
  font-size: 14px;
  color: var(--color-mono-1);
  letter-spacing: .4px;
  background-color: var(--color-mono-c);
  border: solid 1px var(--color-mono-5);
  border-radius: 3px;
  outline: none;
  transition: .3s;

  &:focus {
    border-color: var(--color-mono-2);
    box-shadow: 0 2px 5px 0 rgba(48, 45, 30, .1);
  }

  &:disabled {
    color: var(--color-mono-4);
    cursor: not-allowed;
    background-color: var(--color-mono-b);
    border-color: var(--color-mono-8);
  }

  &::placeholder {
    color: var(--color-mono-4);
  }

  &::-ms-clear {
    height: 14px;
  }

  &--s {
    min-height: 36px;
  }
}
</style>
