<template lang='pug'>
textarea.a-textarea(
  v-model='text'
  :name='name'
  :placeholder='placeholderText'
  :required='required'
  :minlength='minlength'
  :maxlength='maxlength'
  :autocomplete='autocomplete'
  :disabled='disabled'
  :readonly='readonly'
  :pattern='pattern'
  :spellcheck='spellcheck'
  :rows='rows'
  :cols='cols'
  :wrap='wrap'
  :style="style"
  @blur="onBlur"
  @input='onInput'
  @change='onChange')
</template>

<script>
export default {
  name: 'Textarea',
  props: {
    value: {
      type: String,
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
      default: null
    },

    required: {
      type: Boolean,
      required: false,
      default: false
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

    resize: {
      type: String,
      required: false,
      default: 'vertical',
      validator: (resize) => {
        return ['vertical', 'horizontal', 'both', 'none'].includes(resize);
      }
    },

    spellcheck: {
      type: Boolean,
      required: false,
      default: true
    },

    rows: {
      type: Number,
      required: false,
      default: 1
    },

    cols: {
      type: Number,
      required: false,
      default: 20
    },

    wrap: {
      type: String,
      required: false,
      default: 'soft'
    },

    validationTiming: {
      type: [String, Boolean],
      required: false,
      default: 'input',
      validator: (value) => {
        return ['change', 'input', true, false].includes(value);
      }
    }
  },

  data(){
    return {
      text: this.value
    }
  },

  computed: {
    style(){
      return {
        resize: this.resize
      }
    },
    placeholderText(){
      return this.placeholder ? this.placeholder : this.required ? this.$t('atoms.textarea.placeholder') : ''
    }
  },

  methods: {
    checkValidity(){
      this.$el.removeAttribute("aria-invalid");
      if(!this.$el.checkValidity()){
        this.$el.setAttribute("aria-invalid", "true");
      }
    },
    onBlur(e) {
      this.$emit('blur', e);
      if(this.validationTiming){
        this.checkValidity();
      }
    },
    onInput(e) {
      this.$emit('input', e);
      if(this.validationTiming === 'input'){
        this.checkValidity();
      }
    },
    onChange(e) {
      this.$emit('change', e);
      if(this.validationTiming === 'change' || this.validationTiming === true){
        this.checkValidity();
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.a-textarea {
  box-sizing: border-box;
  width: 100%;
  min-height: 40px;
  padding: 14px;
  font-size: 14px;
  color: var(--color-mono-1);
  letter-spacing: .4px;
  background-color: var(--color-mono-c);
  border: 1px solid var(--color-mono-5);
  border-radius: 3px;
  outline: none;
  appearance: none;
  transition: .3s color, .3s border-color, .3s background-color, .3s box-shadow;

  @media (max-width: $break-point--sp) {
    font-size: 16px;
  }

  &:focus {
    border-color: var(--color-mono-2);
    box-shadow: 0 2px 5px 0 rgba(48, 45, 30, .1);
  }

  &:disabled {
    color: var(--color-mono-4);
    cursor: not-allowed;
    background-color: var(--color-mono-7);
    border-color: var(--color-mono-5);
  }

  &::placeholder {
    color: var(--color-placeholder);
  }

  &::-ms-clear {
    height: 14px;
  }

  &--s {
    min-height: 36px;
  }
}
</style>
