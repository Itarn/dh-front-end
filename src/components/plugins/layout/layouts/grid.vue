<template>
  <!-- @onChange="changeHandler" -->
  <!-- @start="draggleStartHandler" -->
  <!-- easing="cubic-bezier(1, 0, 0, 1)" -->
  <RowSort
  v-model="draggableData"
  :disabled="notDraggle"
  ghostClass="ghost"
  chosenClass="chosen"
  dragClass="drag"
  :animation="400"
  :gutter="props.gutter.mapVal[gutter]"
  >
    <!-- <transition-group> -->
      <base-col :ratioNum="col" v-for="(val, index) in data" :key="index">
        <Column
        :index="index"
        :height="height"
        :data="val"
        :editor="{ button: ['druggle'] }"
        >
        </Column>
      </base-col>
    <!-- </transition-group> -->
  </RowSort>
</template>

<script>
// import { cloneDeep, isObject } from '@/utils'
// import vueDraggable from 'vuedraggable'
import mixin from './mixin'

// import { DataEditor } from 'p/layout/editor'
// import { dataShape } from 'p/layout/props'

export default {
  name: 'grid',
  type: 'grid',
  data () {
    return {
      notDraggle: true
    }
  },
  created () {
    this.$bus.on('draggle', this.draggleHandler)
  },
  components: {
    // vueDraggable,
  },
  props: ['data', 'gutter', 'col', 'row', 'height'],
  methods: {
    getBaseRowData () {
      return {
        props: {
          gutter: this.props.gutter.mapVal[this.gutter]
        }
      }
    },
    draggleHandler (draggle) {
      this.notDraggle = draggle
    },
    changeHandler (e) {
      console.log(e)
    }
    // draggleStartHandler (e) {
    //   console.log(e, 'start')
    // }
  },
  mixins: [mixin],
  computed: {
    draggableData: {
      get () {
        return this.data
      },
      set (val) {
        this.valChangeHandler({ val }, { key: 'data' })
      }
    }
  },
  watch: {},
  beforeDestroy () {
    this.$bus.$off('draggle', this.draggleHandler)
  }
}
</script>

<style lang="scss" scoped>

.rowWrapper {
  display: flex;
  flex-wrap: wrap;
}

.ghost {
  opacity: 0;
}
// .chosen {
//   opacity: 0;
// }
.drag {
  opacity: 0.4;
}
</style>
