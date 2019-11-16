<template lang='pug'>
.a-password-input
  Input.a-password-input__input(ref="input"
                                :type='inputType'
                                :value='inputValue'
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
                                :size='size'
                                @input='onInput'
                                @change='onChange')
  label.a-password-input__toggle
    input.a-password-input__toggle-checkbox(type='checkbox', @change='onCheck')
    v-icon.a-password-input__toggle-icon(:icon='toggleIcon')
</template>

<script>
import Input from '../Input';

export default {
  name: 'PasswordInput',
  components: { Input },
  props: {
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
    },
    size: {
      type: String,
      required: false,
      default: 'm',
      validator: (value) => {
        return ['s', 'm', 'l'].includes(value);
      }
    }
  },
  data() {
    return {
      inputValue: this.value,
      inputType: 'password',
      toggleIcon: 'eye',
    }
  },
  methods: {
    setCustomValidity(message) {
      this.$refs.input.$el.setCustomValidity(message)
    },
    onInput(e) {
      this.inputValue = e.target.value;
      this.$emit('input', e);
    },
    onChange(e) {
      this.inputValue = e.target.value;
      this.$emit('change', e);
    },
    onCheck(e) {
      if (e.target.checked) {
        this.inputType = 'text';
        this.toggleIcon = 'eye-slash';
      } else {
        this.inputType = 'password';
        this.toggleIcon = 'eye';
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.a-password-input {
  position: relative;
  &__input{
    padding-right: 50px;
  }
  &__toggle {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    font-size: 20px;
    color: var(--color-mono-3);
    cursor: pointer;
    &-checkbox {
      display: none;
    }
    &-icon{
      &:before{
        vertical-align: bottom;
      } 
    }
  }
}
</style>
