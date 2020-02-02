<template lang='pug'>
component.m-input-set(:is="element")
  LabelText.m-input-set__title(:text='title')
  RequiredIcon.m-input-set__required(v-if="required" :valid="validity && validity.valid")
  HelpText.m-input-set__help(:message='helpMessage' v-if='helpMessage')
  .m-input-set__inputs(:class="columnsClass")
    slot
  transition(name="m-input-set__validation-message")
    p.m-input-set__validation-message(v-if="validationMessage")
      i.crevo-icon.crevo-exclamation_fill
      | {{validationMessage}}
</template>

<script>
import LabelText from '../../atoms/LabelText';
import HelpText from '../../atoms/HelpText';
import RequiredIcon from '../../atoms/RequiredIcon';

export default {
  name: 'InputSet',
  components: { LabelText, HelpText, RequiredIcon },

  props: {
    title: {
      type: String,
      required: true
    },

    helpMessage: {
      type: String,
      required: false,
      default: null
    },

    disablePointerEvents: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data(){
    return {
      validity: null,
      validationMessage: null,
      required: false
    }
  },
  computed: {
    element(){
      return this.disablePointerEvents ? 'span' : 'label'
    },
    columnsClass(){
      return this.$slots.default && this.$slots.default.length > 1 ? `m-input-set__inputs--${this.$slots.default.length}-columns` : ''
    }
  },
  mounted(){
    const addEventListener = elm => {

      if(!elm.validity){
        elm.childNodes.forEach(node => {
          addEventListener(node)
        })
        return false
      }

      elm.addEventListener('blur', e => {
        this.checkValidity()
      })
      elm.addEventListener('input', e => {
        this.checkValidity()
      })
      elm.addEventListener('change', e => {
        this.$nextTick()
        .then(() => {
          this.checkValidity()
        })
      })
    }

    this.$slots.default.forEach(slot => {
      //マウント時にslot内にrequiredな子孫がいないか判定する
      this.checkRequired(slot.elm)
      addEventListener(slot.elm)
    })
  },
  methods: {
    //elmentがrequiredか判定する関数
    checkRequired(elm){

      //渡された要素の子要素がrequiredの可能性があるので再帰的に処理する
      if(!elm.validity){
        elm.childNodes.forEach(node => {
          this.checkRequired(node)
        })
        return false
      }

      //要素がrequired属性を持っていれば、このInputSetを必須表現にする
      if(elm.required){
        this.required = true
        this.$el.setAttribute("aria-required", "true");
      }
    },
    //現在InputSet内のコンポーネントがvalidか判定する関数
    checkValidity(){

      //子孫要素にinvalidな要素があったか判定結果を関数内で共有するための変数
      //invalidな要素が1つでもあればtrueに書き換えられる
      let invalid = false

      const check = elm => {

        //既に子孫にinvalidな要素があると判定されているので、falseを返して判定処理を止める
        if(invalid){
          return false
        }

        //要素がvalidityプロパティを持っていない = input系要素ではないが、elmの子要素がinput系要素の可能性があるので再帰処理する
        if(!elm.validity){
          elm.childNodes.forEach(node => {
            check(node)
          })

          //このelm自体はinvalidか判定する必要がないので、falseを返して判定処理を止める
          return false
        }

        //elmが判定対象（input系）の場合のみ処理が続行される
        this.validity = elm.validity
        this.validationMessage = elm.validationMessage
        this.$el.removeAttribute("aria-invalid");

        if(!this.validity.valid){
          //elmがinvalidの時、変数をtrueに書き換えてその後の処理を止め、DOMの状態をaria-invalid = trueにする
          invalid = true
          this.$el.setAttribute("aria-invalid", "true");
        }
      }

      this.$slots.default.forEach(slot => {
        check(slot.elm)
      })
    }
  }
};
</script>

<style lang='scss' scoped>
.m-input-set {
  display: grid;
  grid-template:
    " title required  .    help    help " 13px
    "  .       .      .      .       .  " 10px
    "inputs  inputs inputs inputs inputs" auto
    " vm      vm      vm     vm     vm  " auto
    / auto    auto   5px    auto    1fr;

  @media(max-width: $break-point--sp){
    grid-template:
      " title required " 13px
      "  .       .     " 10px
      "inputs  inputs  " auto
      " help    help   " auto
      "  vm     vm     " auto
      / auto    1fr;
  }

  &[aria-invalid]{
    .m-input-set__title{
      color: var(--color-red);
    }
  }

  &--disable-pointer-events{
    pointer-events: none;
  }

  &__title {
    grid-area: title;
    align-self: center;
    transition: .3s var(--transition-timing);
  }

  &__required{
    grid-area: required;
    justify-self: flex-start;
  }

  &__help {
    grid-area: help;
    align-self: center;

    @media(max-width: $break-point--sp){
      margin-top: 6px;
      line-height: 1.4;
    }
  }

  &__inputs {
    grid-area: inputs;

    &--2-columns,
    &--3-columns {
      display: flex;
      > * + * {
        margin-left: 10px;
      }
    }

    &--2-columns{
      > * {
        width: calc((100% - 10px) / 2);
      }
    }

    &--3-columns{
      > * {
        width: calc((100% - (10px * 2)) / 3);
      }
    }
  }

  &__validation-message{
    display: flex;
    grid-area: vm;
    align-items: center;
    margin-top: 8px;
    font-size: 12px;
    line-height: 1.2;
    color: var(--color-red);
    transition: .3s var(--transition-timing);
    transform: translateY(0%);

    &-enter{
      opacity: 0;
      transform: translateY(-100%);
    }
    &-leave-to{
      opacity: 0;
    }

    .crevo-icon{
      margin-right: 2px;
    }
  }
}
</style>
