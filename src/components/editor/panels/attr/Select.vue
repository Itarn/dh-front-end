<template>
   <select
   :class="[bem()]"
   @change="valChange($event)"
   >
    <option
    :class="[bem('option')]"
    :value="each.value"
    :selected="each.value === data.val"
    v-for="each in data.propArr"
    :key="each.label">
      {{ each.label }}
    </option>
  </select>
</template>

<script>
import { createNamespace } from '@/utils'

const [, bem] = createNamespace('e', 'select')

export default {
  name: 'e-select',
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

.e-select {
  width: 100%; height: 23px;
  background: rgba(0,0,0,.6);
  border: 1px solid #444;
  border-radius: 3px;
  color: $white;
  font-size: $font-size-sm; font-weight: 500;
  padding: 0px 10px 1px;
  -webkit-appearance: menulist;

  &__option {
    border: 0;
    display: block;
    white-space: pre;
    min-height: 1.2em;
    padding: 0px 2px 1px;
  }
}

</style>
