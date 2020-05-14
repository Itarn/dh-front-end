<template>
  <!-- <base-row
  :gutter="gutterVal"
  lockOffset="0%"
  :pressThreshold="0"
  :hideSortableGhost="true"
  :value="data"
  @input="inputHandler"
  axis="xy"> -->
  <base-row
  :gutter="props.gutter.mapVal[gutter]">
    <!-- <draggable> -->
      <!-- <transition-group> -->
        <base-col :ratioNum="col" v-for="(val, index) in data" :key="index">
          <Column
          :index="index"
          :height="height"
          :data="val"
          >
          </Column>
        </base-col>
      <!-- </transition-group> -->
    <!-- </draggable> -->
  </base-row>
</template>

<script>
// import { cloneDeep, isObject } from '@/utils'
// import draggable from 'b/draggable'
import mixin from './mixin'

// import { DataEditor } from 'm/MLayout/editor'
// import { dataShape } from 'm/MLayout/props'

export default {
  name: 'grid',
  type: 'grid',
  data () {
    return {
      drag: true
    }
  },
  components: {
    // draggables
  },
  props: ['data', 'gutter', 'col', 'row', 'height'],
  mixins: [mixin],
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>

.rowWrapper {
  display: flex;
  flex-wrap: wrap;

}
</style>
