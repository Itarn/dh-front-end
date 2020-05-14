<template>
  <div
  :class="[bem({ editing })]"
  :contenteditable="editing"
  @blur="valChangeHandler"
  >
  <!-- @input="inputHandler" -->
  {{ data }}
  </div>
</template>

<script>
import { createNamespace } from '@/utils'

const [, bem] = createNamespace('e', 'div')

export default {
  props: {
    editing: {
      type: Boolean,
      default: false
    },
    data: {
      type: [String],
      default: ''
    }
  },
  methods: {
    bem (...arg) { return bem(...arg) },
    valChangeHandler ($event) {
      console.log($event.target.innerText)
      this.$emit('valChange', { $event, val: $event.target.innerText })
    }
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
