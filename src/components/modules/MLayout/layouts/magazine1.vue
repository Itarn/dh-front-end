<template>
  <BaseRow :gutter="gutterVal" align="stretch">
    <BaseCol blockNum="4">
      <BaseRow :gutter="gutterVal">
        <BaseCol blockNum="12" v-for="val in [1, 2]" :key="val">
          <div :class="bem('col', { [`${height}-height`]: height })"></div>
        </BaseCol>
      </BaseRow>
    </BaseCol>
    <BaseCol blockNum="8">
      <div :class="bem('col')"></div>
    </BaseCol>
  </BaseRow>
</template>

<script>
import mixin from './mixin'
export default {
  name: 'magazine-1',
  props: ['gutterVal', 'height'],
  mixins: [mixin]
}
</script>
