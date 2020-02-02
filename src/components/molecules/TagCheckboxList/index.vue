<template lang="pug">
  ul.m-tagcheckbox-list
    li.m-tagcheckbox-list__item(v-for="tag in tags" :key="tag.id")
      TagCheckbox(:ref="tag.id" :tag='tag' :name="name" :required="customRequired" :validationMessage="validationMessage" @change="onChange")
</template>

<script>
import TagCheckbox from '../../atoms/TagCheckbox';

export default {
  name: 'TagCheckboxList',
  components: {
    TagCheckbox
  },
  props: {
    tags: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: false,
      default: ''
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
      default: null
    }
  },

  data() {
    return {
      activeIds: [],
      validationMessage: '',
      customRequired: this.required
    }
  },

  methods: {
    checkValidity(){
      const requireInvalid = this.required && this.activeIds.length == 0
      const minlengthInvalid = this.minlength && this.minlength > this.activeIds.length
      const maxlengthInvalid = this.maxlength && this.maxlength < this.activeIds.length

      this.validationMessage = ''

      if(requireInvalid){
        this.customRequired = true
        this.validationMessage = this.$t('molecules.tagCheckboxList.require')
      }else{
        this.customRequired = false
      }

      if(minlengthInvalid){
        this.validationMessage = this.$t('molecules.tagCheckboxList.minlength', { minlength: this.minlength, remaining: this.minlength - this.activeIds.length })
      }
      if(maxlengthInvalid){
        this.validationMessage = this.$t('molecules.tagCheckboxList.maxlengh', { maxlength: this.activeIds.length - this.maxlength })
      }
    },
    onChange(e) {
      const {tags, $refs} = this
      this.activeIds = tags.map(tag => {
        if($refs[tag.id][0].active) return tag.id
      }).filter(tag => tag !== undefined)

      this.checkValidity()
      this.$emit('change', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.m-tagcheckbox-list {
  display: flex;
  flex-wrap: wrap;

  &__item {
    display: inline-flex;
    margin-top: 5px;

    &:not(:last-child) {
      margin-right: 5px;
    }
  }
}
</style>
