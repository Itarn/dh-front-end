<template>
   <input
   :class="[bem()]"
   type="text"
   :value="data.val"
   @input="valChange($event)">
</template>

<script>
import { createNamespace } from '@/utils'

const [, bem] = createNamespace('e', 'input')

export default {
  name: 'e-input',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    bem (...args) { return bem(...args) },
    valChange ($event) {
      this.$emit('valChange', { $event, val: $event.target.value })
    }
  }
}
</script>

<style lang="scss" scoped>

.e-input {
  display: block; width: 100%;
  background: rgba(0,0,0,.45);
  border-color: #000 #333 #444;
  border-radius: 3px;
  border-style: solid;
  border-width: 1px 0;
  color: #eee;
  font-size: $font-size-sm; font-weight: $font-weight-bold;
  margin: 0 0 4px;
  outline: none;
  outline-width: 0;
  padding: 4px 5px;
}

</style>
