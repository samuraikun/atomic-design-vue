import { storiesOf } from '@storybook/vue';

import Button from "../../atoms/Button"
import Modal from "./index.vue"

const componentInfo = `
  モーダルを「出したい」「消す」場所にイベントを仕込んで呼ぶ。
  <br>
  nameを渡すとモーダルを一意にすることができる。
`

storiesOf('molecules/Modal', module).add('default', () => {
  return {
    components: { Button, Modal },
    data() {
      return {
        showingModal: false,
      }
    },
    template: `
      <div>
        <Button color="black" @click="openModal">
          モーダルを開く
        </Button>
        <Modal>
          <template slot="body">
            Body
          </template>
          <template slot="footer">
            <Button color="black" @click="closeModal">
              モーダルを閉じる
            </Button>
          </template>
        </Modal>
      </div>
    `,
    methods: {
      openModal() {
        this.$modal.push("modal");
      },
      closeModal() {
        this.$modal.pop();
      }
    }
  }
}, { info: { summary: componentInfo } })
