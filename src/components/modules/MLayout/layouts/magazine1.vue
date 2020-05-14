<template>
  <BaseRow :gutter="props.gutter.mapVal[gutter]" align="stretch">
    <BaseCol blockNum="4">
      <BaseRow :gutter="props.gutter.mapVal[gutter]">
        <BaseCol blockNum="12" v-for="(val, index) in firstTwoofData" :key="index">
          <Column
          :index="index"
          :height="height"
          :data="val"
          >
          </Column>
        </BaseCol>
      </BaseRow>
    </BaseCol>
    <BaseCol blockNum="8">
      <Column
      :index="data.length-1"
      :data="data[data.length-1]"
      >
      </Column>
    </BaseCol>
  </BaseRow>
</template>

<script>
import mixin from './mixin'
export default {
  name: 'magazine-1',
  type: 'magazine',
  needDataLength: 3,
  props: ['data', 'gutter', 'height'],
  mixins: [mixin],
  computed: {
    firstTwoofData () {
      return this.data && this.data.slice(0, 2)
    }
  }
}
</script>
