<template>
  <div
  :class="[bem({ editing: status === 'editing' })]"
  :contenteditable="status === 'editing'"
  @blur="blurHandler"
  >
    <slot />
  </div>
</template>

<script>
import { createNamespace } from '@/utils'
import { mapState } from 'vuex'

const [, bem] = createNamespace('e', 'div')

export default {
  props: {
    keyChain: {
      type: [String],
      default: ''
    }
  },
  inject: [
    'valChangeHandler'
  ],
  methods: {
    bem (...arg) { return bem(...arg) },
    blurHandler ($event) {
      console.log($event.target.innerText)
      if (this.status === 'editing') {
        this.valChangeHandler({ $event, val: $event.target.innerText }, { key: this.keyChain })
      }
    }
  },
  computed: {
    ...mapState({
      status: ({ status = 'prod' }) => status
    })
  }
}
</script>

<style scoped lang="scss">

$gap: 10px;

.e-div {
  display: block;
  color: #fff;
  outline: none;
  position: relative;

  &--editing {
    cursor: text;
    &::after {
      display: none;
      content: '';
      position: absolute; top: -$gap; bottom: -$gap; left: -$gap; right: -$gap;
      border: 1px solid #fff;
      border-radius: 5px;
    }
    &:hover {
      &::after{
        display: block;
      }
    }
  }

}

</style>
