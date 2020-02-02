import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text, select } from '@storybook/addon-knobs';
import DateSelects from './index.vue';

storiesOf('molecules/DateSelects', module)
.add('Default', () => {
  return {
    components: { DateSelects },
    data() {
      return {
        size: select('size', ['s', 'm', 'l'], 'm')
      }
    },
    template: `<DateSelects :size='size' @change="onChange"/>`,
    methods: {
      onChange: action('changed')
    }
  }
}, { info: { summary: '生年月日など年/月/日を別々に入力するためのコンポーネント' } })
.add('初期値を指定（1990/12/24）', () => {
  return {
    components: { DateSelects },
    data() {
      return {
        selected : new Date(1990,11,24),
        size: select('size', ['s', 'm', 'l'], 'm')
      }
    },
    template: `<DateSelects :selected="selected" :size='size' @change="onChange"/>`,
    methods: {
      onChange: action('changed')
    }
  }
}, { info: { summary: '初期値をselectedプロパティでDateで指定することが出来ます' } })
.add('初期値をStringで指定（1990/12/24）', () => {
  return {
    components: { DateSelects },
    data() {
      return {
        selected : '1990-12-24',
        size: select('size', ['s', 'm', 'l'], 'm')
      }
    },
    template: `<DateSelects :selected="selected" :size='size' @change="onChange"/>`,
    methods: {
      onChange: action('changed')
    }
  }
}, { info: { summary: '初期値をselectedプロパティでStringで指定することが出来ます' } })
.add('年/月の2項目にする', () => {
  return {
    components: { DateSelects },
    data() {
      return {
        selected : new Date(1990,11,24),
        format : ['year','month'],
        size: select('size', ['s', 'm', 'l'], 'm')
      }
    },
    template: `<DateSelects :format="format" :selected="selected" :size='size' @change="onChange"/>`,
    methods: {
      onChange: action('changed')
    }
  }
}, { info: { summary: '表示させたい項目をarrayで渡すことで、項目数を絞ることができます' } })
.add('min maxで日時を制限', () => {
  return {
    components: { DateSelects },
    data() {
      return {
        selected : '1990-12-24',
        max: text('max', '1991-01-01'),
        min: text('min', '1990-06-01'),
        size: select('size', ['s', 'm', 'l'], 'm')
      }
    },
    template: `<DateSelects :selected="selected" :min="min" :max="max" :size='size' @change="onChange"/>`,
    methods: {
      onChange: action('changed')
    }
  }
}, { info: { summary: 'minとmaxで日時を制限できます' } })
