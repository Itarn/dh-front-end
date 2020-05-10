<template>
  <BaseRow :gutter="gutterVal" align="stretch">
    <BaseCol blockNum="4">
      <BaseRow :gutter="gutterVal">
        <BaseCol blockNum="12" v-for="(val, index) in firstTwoofData" :key="index">
          <Column
          :height="height"
          :img="val.img"
          ></Column>
        </BaseCol>
      </BaseRow>
    </BaseCol>
    <BaseCol blockNum="8">
      <Column
      :height="data[data.length-1].height"
      :img="data[data.length-1].img"
      ></Column>
    </BaseCol>
  </BaseRow>
</template>

<script>
import mixin from './mixin'
export default {
  name: 'magazine-1',
  needDataLength: 3,
  props: ['data', 'gutterVal', 'height'],
  mixins: [mixin],
  computed: {
    firstTwoofData () {
      return this.data.slice(0, 2)
    }
  }
}
</script>
