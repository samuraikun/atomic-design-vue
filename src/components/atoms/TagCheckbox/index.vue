<template lang="pug">
  label(:class='tagStyle' v-model='active') {{ tag.name }}
    input(type='checkbox' ref="check" :value='tag.id' :name='name' :checked='checked' :required="required" class='a-tag-checkbox' @change="onChange")
</template>

<script>
export default {
  name: 'TagCheckbox',
  props: {
    tag: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      required: false
    },
    validationMessage: {
      type: String,
      required: false,
      default: ''
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      active: false
    }
  },
  watch: {
    validationMessage(val){
      this.$refs.check.setCustomValidity(val)
      this.$emit('change')
    }
  },
  computed: {
    tagStyle() {
      return this.active ? 'a-tag-label a-tag-label--active' : 'a-tag-label';
    }
  },
  methods: {
    onChange(e) {
      this.active = !this.active;
      this.$emit('change', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.a-tag-label {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  font-size: 13px;
  color: var(--color-mono-1);
  user-select: none;
  background-color: var(--color-mono-c);
  border: 1px solid var(--color-mono-6);
  border-radius: 3px;
  transition: .5s var(--transition-timing);

  &:hover {
    cursor: pointer;
  }

  &--active {
    color: var(--color-mono-c);
    background-color: var(--color-dark-blue);
    border-color: var(--color-dark-blue);
  }

  .a-tag-checkbox {
    display: none;
  }
}
</style>
