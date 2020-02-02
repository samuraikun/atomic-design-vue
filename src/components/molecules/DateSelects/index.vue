<template lang="pug">
.m-date-selects(:class="selectCountsClass")
  Select.m-date-selects__select.m-date-selects--year(ref="year" v-if="!isMobile && format.includes('year') || isMobile && !inputDateType" :options="years" :selected="value.year" :required="required" :placeholder="placeholderString.year" :size="size" :disabled="disabled" @change="onChange")
  Select.m-date-selects__select.m-date-selects--month(ref="month" v-if="!isMobile && format.includes('month') || isMobile && !inputDateType" :options="months" :selected="monthForDisplay" :required="required" :placeholder="placeholderString.month" :size="size" :disabled="disabled" @change="onChange")
  Select.m-date-selects__select.m-date-selects--date(ref="date" v-if="!isMobile && format.includes('date') || isMobile && !inputDateType" :options="dates" :selected="value.date" :required="required" :placeholder="placeholderString.date" :size="size" :disabled="disabled" @change="onChange")
  Input.m-date-selects__select.m-date-selects--first(ref="input" v-if="isMobile && inputDateType" :type="inputDateType" :value="inputInitialValue" :min="inputMin" :max="inputMax" :required="required" :size="size" :disabled="disabled" @change="onChange")
</template>

<script>
import { UAParser } from 'ua-parser-js';
import moment from 'moment';
import Select from '../../atoms/Select';
import Input from '../../atoms/Input';

const deviceType = new UAParser().getDevice().type
export default {
  name: 'DateSelects',
  components: {
    Select,
    Input
  },
  props: {
    selected: {
      type: [Date, String],
      required: false,
      default: null,
      validator: (value) => {
        return value instanceof Date || moment(value).isValid();
      }
    },
    min: {
      type: [Date, String],
      required: false,
      default: null,
      validator: (value) => {
        return value instanceof Date || moment(value).isValid();
      }
    },
    max: {
      type: [Date, String],
      required: false,
      default: null,
      validator: (value) => {
        return value instanceof Date || moment(value).isValid();
      }
    },
    format: {
      type: Array,
      required: false,
      default: () => { return ['year', 'month', 'date'] }
    },
    size: {
      type: String,
      required: false,
      default: 'm',
      validator: (value) => {
        return ['s', 'm', 'l'].includes(value);
      }
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: Object,
      required: false,
      default() {
        return { year: 'Year', month: 'Month', date: 'Date' }
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function(){
    return {
      isMobile: deviceType === 'mobile' || deviceType === 'tablet',
      value: (() => {
        const selectedMoment = this.selected && moment(this.selected).isValid() ? moment(this.selected) : null
        return {
          year: selectedMoment ? selectedMoment.year() : null,
          month: selectedMoment ? selectedMoment.month() : null,
          date: selectedMoment ? selectedMoment.date() : null,
          dateString: selectedMoment ? selectedMoment.format('YYYY-MM-DD') : null,
        }
      })(),
      placeholderString: (()=>{
        let placeholder = { year: 'Year', month: 'Month', date: 'Date' }
        if(this.placeholder){
          for (const key in placeholder) {
            if (this.placeholder.hasOwnProperty(key)) {
              placeholder[key] = this.placeholder[key];
            }
          }
        }
        return placeholder
      })()
    }
  },
  computed: {
    years: function(){
      let arr = []
      let min = this.min ? moment(this.min).year() : null
      let max = this.max ? moment(this.max).year() : null
      min = min ? parseInt(min) : 1900
      max = max ? parseInt(max) : new Date().getFullYear()

      for (let i= max; i >= min; i--) {
        arr[max - i] = {
          label: i,
          value: i
        };
      }
      return arr
    },
    months: function(){
      const { year } = this.value
      let arr = []
      let min = this.min && year && year === moment(this.min).year() ? `${moment(this.min).month()}` : null
      let max = this.max && year && year === moment(this.max).year() ? `${moment(this.max).month()}` : null
      min = min ? parseInt(min) + 1 : 1
      max = max ? parseInt(max) + 1 : 12

      for (let i= min; i <= max; i++) {
        arr[i - min] = {
          label: i,
          value: i
        }
      }
      return arr
    },
    dates: function(){
      const { year, month } = this.value
      const endOfMonth = parseInt(moment({ year, month }).endOf('month').format('DD'))
      let arr = []
      let min = this.min && year && month !== null && year === moment(this.min).year() && month === moment(this.min).month() ? `${moment(this.min).date()}` : null
      let max = this.max && year && month !== null && year === moment(this.max).year() && month === moment(this.max).month() ? `${moment(this.max).date()}` : null
      min = min ? parseInt(min) : 1
      max = max ? parseInt(max) : endOfMonth

      for (let i= min; i <= max; i++) {
        arr[i - min] = {
          label: i,
          value: i
        }
      }
      return arr
    },
    monthForDisplay(){
      return this.value.month && !isNaN(this.value.month) ? this.value.month + 1 : null
    },
    selectCountsClass: function(){
      return this.isMobile ? `m-date-selects--1` : `m-date-selects--${this.format.length}`
    },
    inputDateFormat(){
      return this.inputDateType === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM'
    },
    inputInitialValue(){
      return moment(this.selected).format(this.inputDateFormat)
    },
    inputDateType(){
      if(this.format.includes('year') && this.format.includes('month') && this.format.includes('date')) return 'date'
      if(this.format.includes('year') && this.format.includes('month') && !this.format.includes('date')) return 'month'
      return false
    },
    inputMin(){
      // iOS Safariはtype = dateのmin maxに対応していないのでスルーされる
      // https://caniuse.com/#search=date
      return this.min ? moment(this.min).format(this.inputDateFormat) : null
    },
    inputMax(){
      // iOS Safariはtype = dateのmin maxに対応していないのでスルーされる
      // https://caniuse.com/#search=date
      return this.max ? moment(this.max).format(this.inputDateFormat) : null
    }
  },
  methods: {
    onChange: function(){
      const {year, month, date, input} = this.$refs
      const yearValue = year && year.value ? year.value : null
      const monthValue = month && month.value ? month.value : null
      const dateValue = date && date.value ? date.value : null
      const inputValue = input ? input.$el.value : null
      const selectedMoment = inputValue ? moment(inputValue) : yearValue && monthValue ? moment().set({'year': yearValue, 'month': monthValue - 1, 'date': dateValue ? dateValue : 1}) : null

      this.value = {
        year: yearValue ? parseInt(yearValue) : null,
        month: monthValue ? parseInt(monthValue) - 1 : null,
        date: date ? parseInt(dateValue) : null,
        dateString: selectedMoment ? selectedMoment.format('YYYY-MM-DD') : null
      }

      this.$emit("change", this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.m-date-selects {
  display: grid;
  align-items: center;

  &--3 {
    grid-template:
      "first .  second . third" auto
      / 1fr 10px  1fr 10px 1fr;
  }

  &--2 {
    grid-template:
      "first .  second" auto
      / 1fr 10px  1fr;
  }

  &--1 {
    grid-template:
      "first" auto
      / 1fr;
  }

  &--year {
    grid-area: first;
  }

  &--month {
    grid-area: second;
  }

  &--date {
    grid-area: third;
  }
}
</style>
