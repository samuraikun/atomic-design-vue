<template lang="pug">
label.m-user-icon-input
  img.m-user-icon-input__image.u-user-avatar(ref="image" :src="avatarSrc" :class="sizeClass")
  v-icon.m-user-icon-input__icon(icon='camera')
  input.m-user-icon-input__input(ref="input" type="file" accept="image/jpeg,image/png" @change="onChange")
  transition(name="m-user-icon-input__validation-message")
    p.m-user-icon-input__validation-message(v-if="validationMessage")
      i.crevo-icon.crevo-exclamation_fill
      | {{ validationMessage }}
</template>

<script>
import sampleImage from '../../../images/sample-photo.png';
import objectFitImages from 'object-fit-images';

export default {
  name: 'UserIconInput',
  props: {
    src: {
      type: String,
      required: true,
      default: sampleImage
    },
    size: {
      type: String,
      required: false,
      default: 's'
    }
  },
  data() {
    return {
      sizeClass: `u-user-avatar--${this.size}`,
      avatarSrc: this.src,
      validity: null,
      validationMessage: null,
    }
  },
  methods: {
    onChange(e) {
      this.checkValidity();

      const file = e.target.files[0] || e.dataTransfer.files[0];

      if (file) {
        this.createThumbnail(file).then((event) => {
          // アップロードした場合に、object-fit-imageを適用するために初期化する
          const img = this.$refs.image
          img.removeAttribute('src')
          img.removeAttribute('data-ofi-src')
          objectFitImages(img)

          this.avatarSrc = event.target.result;
        });
        this.$emit("change", file);
      } else {
        this.$emit("change", null);
      }
    },
    createThumbnail(file) {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = resolve;
        reader.readAsDataURL(file);
      });
    },
    checkValidity() {
      const elm = this.$refs.input;
      elm.setAttribute('required', 'required');

      this.validity = elm.validity
      this.validationMessage = elm.validationMessage
      this.$el.removeAttribute("aria-invalid");

      const isValid = this.validity.valid;
      if (!isValid) {
        this.$el.setAttribute("aria-invalid", "true");
      }
      elm.removeAttribute('required');
      return isValid;
    }
  }
};
</script>

<style lang="scss" scoped>

.m-user-icon-input{
  position: relative;
  display: inline-block;
  cursor: pointer;
  transition: .3s, .5s transform var(--transition-timing);
  transform:  perspective(1000px) translateZ(0px);

  &:hover{
    opacity: .8;
  }

  &:active{
    transform:  perspective(1000px) translateZ(-15px);
  }

  &__input {
    display: none;
  }

  &__image {
    pointer-events: none;
  }

  &__icon{
    position: absolute;
    top: -4px;
    right: -4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    width: 20px;
    height: 20px;
    color: var(--color-mono-c);
    background-color: var(--color-mono-4);
    border: 2px solid var(--color-mono-c);
    border-radius: 50%;

    &:before{
      margin-bottom: 1px;
    }
  }

  &__validation-message{
    position: absolute;
    bottom: -20px;
    left: -30px;
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 1.2;
    color: var(--color-red);
    white-space: nowrap;
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

@mixin baseFactory($size) {
  display: inline-block;
  width: $size;
  min-width: $size;
  height: $size;
  overflow: hidden;
  font-family: 'object-fit: cover;';
  font-size: $size/2;
  line-height: $size;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  object-fit: cover;
}

.u-user-avatar {
  @include baseFactory(24px);

  &-initial {
    display: flex;
    display: inline-block;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: bold;
    color: var(--color-mono-c);
    text-transform: uppercase;
    vertical-align: middle;
    user-select: none;
    background: var(--color-mono-3);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  &--20,
  &--s {
    @include baseFactory(20px);
  }

  &--24,
  &--m {
    @include baseFactory(24px);
  }

  &--28,
  &--l {
    @include baseFactory(28px);
  }

  &--32,
  &--xl {
    @include baseFactory(32px);
  }

  &--36,
  &--xxl {
    @include baseFactory(36px);
  }

  &--40,
  &--xxxl {
    @include baseFactory(40px);
  }

  &--60,
  &--xxxxl {
    @include baseFactory(60px);
  }

  &--90,
  &--xxxxxl {
    @include baseFactory(90px);
  }

  &--100,
  &--xxxxxxl {
    @include baseFactory(100px);
  }
}
</style>
