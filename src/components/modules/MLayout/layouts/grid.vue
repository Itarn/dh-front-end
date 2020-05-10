<template>
  <RowSort :gutter="gutterVal" :value="data" @input="inputHandler" axis="xy">
    <!-- <draggable> -->
      <!-- <transition-group> -->
        <ColSort :ratioNum="col" v-for="(val, index) in data" :key="index" :index="index">
          <Column
          :height="height"
          :img="val.img"
          >
            <editor-cell :button="['druggle']">
            <!-- <editor-cell> -->
              <!-- <base-button slot="center" class="plr5 h25 fs12" type="editing">编辑</base-button> -->
              <!-- <div slot="columns"></div> -->
              <div slot="row">
                <editor-control>
                </editor-control>
              </div>
            </editor-cell>
          </Column>
        </ColSort>
      <!-- </transition-group> -->
    <!-- </draggable> -->
  </RowSort>
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
  methods: {
    inputHandler ($event) {
      console.log($event)
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>

.rowWrapper {
  display: flex;
  flex-wrap: wrap;

}
</style>
