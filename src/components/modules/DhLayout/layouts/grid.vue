<template>
  <BaseRow :gutter="gutterVal">
    <BaseCol :ratioNum="col" v-for="val in col * row" :key="val">
      <div :class="[bem('col', { [`${height}-height`]: height })]"></div>
    </BaseCol>
  </BaseRow>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'grid',
  props: ['gutterVal', 'col', 'row', 'height'],
  mixins: [mixin]
}
</script>
