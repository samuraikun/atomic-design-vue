<template lang="pug">
modal(:name="name")
  transition(name="fade")
    .m-modal__background
      .m-modal(v-on-clickaway="closeModal")
        .m-modal__body
          slot(name="body")
        .m-modal__footer
          slot(name="footer")
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  name: "MoleculesModal",
  mixins: [clickaway],
  props: {
    name: {
      type: String,
      default: "modal"
    }
  },
  methods: {
    closeModal() {
      this.$modal.pop();
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.m-modal {
  z-index: 10001;
  display: grid;
  grid-template:
    ". . ."      40px
    ". body ."   auto
    ". . ."      16px
    ". footer ." auto
    ". . ."      40px
    /20px auto 20px;
  width: 480px;
  background-color: var(--color-mono-c);
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

  &__background {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
  }

  &__body {
    grid-area: body;
    text-align: center;
  }

  &__footer {
    grid-area: footer;
    text-align: center;
  }
}
</style>
