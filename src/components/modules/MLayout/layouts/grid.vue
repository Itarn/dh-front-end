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
  :gutter="gutterVal">
    <!-- <draggable> -->
      <!-- <transition-group> -->
        <base-col :ratioNum="col" v-for="(val, index) in data" :key="index">
          <Column
          :index="index"
          :height="height"
          :data="val"
          >
            <editor-cell :button="['druggle']">
            <!-- <editor-cell> -->
              <!-- <base-button slot="center" class="plr5 h25 fs12" type="editing">编辑</base-button> -->
              <!-- <div slot="columns"></div> -->
              <div slot="row">
                <editor-control></editor-control>
              </div>
            </editor-cell>
          </Column>
        </base-col>
      <!-- </transition-group> -->
    <!-- </draggable> -->
  </base-row>
</template>

<script>
// import draggable from 'b/draggable'
import mixin from './mixin'

export default {
  data () {
    return {
      drag: true
    }
  },
  name: 'grid',
  components: {
    // draggables
  },
  props: ['data', 'gutterVal', 'col', 'row', 'height'],
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
