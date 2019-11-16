<template lang='pug'>
.a-select
  select.a-select__select(v-model="value" ref="select" :class="[sizeClass, placeholderClass]" :required="required" :disabled="disabled" :autocomplete="autocomplete" @blur="onBlur" @change="onChange")
    option.a-select__option(value="") {{ placeholderText }}
    option.a-select__option(v-for='option in options' :value='optionValue(option)') {{ optionLabel(option) }}
  v-icon(icon='caret-down')

</template>

<script>
export default {
  name: 'Select',
  props: {
    options: {
      type: Array,
      required: true
    },
    optionLabelKey: {
      type: String,
      required: false,
      default: 'label'
    },
    optionValueKey: {
      type: String,
      required: false,
      default: 'value'
    },
    selected: {
      type: [String, Number],
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
    validationTiming: {
      type: [String, Boolean],
      required: false,
      default: 'change',
      validator: (value) => {
        return ['change', true, false].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    autocomplete: {
      type: String,
      required: false,
      default: "off"
    }
  },
  data() {
    return {
      value: this.selected ? this.selected : ""
    }
  },
  watch: {
    selected(newVal) {
      this.value = newVal;
    }
  },
  computed: {
    sizeClass(){
      return `a-select__select--${this.size}`
    },
    placeholderClass(){
      return this.value ? null : `a-select__select--placeholder`
    },
    placeholderText(){
      return this.placeholder ? this.placeholder : '選択してください'
    }
  },
  methods: {
    optionLabel(option) {
      return option instanceof Object ? option[this.optionLabelKey] : option;
    },
    optionValue(option) {
      return option instanceof Object ? option[this.optionValueKey] : option;
    },
    checkValidity(){
      this.$refs.select.removeAttribute("aria-invalid");

      if(!this.$refs.select.checkValidity()){
        this.$refs.select.setAttribute("aria-invalid", "true");
      }
    },
    onBlur(e) {
      this.$emit('blur', e);
      if(this.validationTiming){
        this.checkValidity();
      }
    },
    onChange(e) {
      this.value = this.$refs.select.value

      // わざと遅延させないと稀に validateState が書き換わらないので 0ms待たせる
      this.$nextTick()
      .then(() => {
        this.$emit('change', e);
        if(this.validationTiming){
          this.checkValidity();
        }
      })
    }
  }
};
</script>

<style lang='scss' scoped>
.a-select {
  position: relative;

  &__select {
    display: inline-flex;
    align-content: center;
    width: 100%;
    height: 100%;
    padding: 0 14px;
    font-size: 14px;
    color:  var(--color-mono-1);
    letter-spacing: .4px;
    cursor: pointer;
    background-color: var(--color-mono-c);
    border: 1px solid var(--color-mono-5);
    border-radius: 3px;
    outline: none;
    transition: .3s;
    appearance: none;

    @media (max-width: 480px) {
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
      + .a-select__caret{
        color: var(--color-mono-4);
      }
    }

    &[aria-invalid]{
      border-color: var(--color-red);
    }

    &::placeholder {
      color: var(--color-mono-4);
    }

    &--placeholder {
      color: var(--color-mono-5);
    }

    &::-ms-clear {
      height: 14px;
    }

    &::-ms-expand {
      display: none;
    }

    &:-moz-focusring {
      color: transparent;
      text-shadow: 0 0 0  var(--color-mono-1);
      transition: .3s border-color, .3s box-shadow;
    }

    &--s {
      min-height: 36px;
      font-size: 13px;
      line-height: 34px;
    }

    &--m {
      min-height: 40px;
      line-height: 38px;
    }

    &--l {
      min-height: 46px;
      line-height: 44px;
    }
  }

  &__option{
    color:  var(--color-mono-1);
  }

  &__caret {
    position: absolute;
    top: 0;
    right: 16px;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 8px;
    font-size: 10px;
    color: var(--color-mono-3);
    transform: scale(.8);
  }
}
</style>
