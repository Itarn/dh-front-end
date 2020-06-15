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
  :gutter="gutter"
  >
    <base-col :ratioNum="col" v-for="(val, index) in data" :key="index">
      <Column
      :index="index"
      :height="height"
      :data="val"
      >

      <template slot="columnEditor">
        <slot name="columnEditor" :data="val" :editor="{ button: ['druggle'] }" />
      </template>
      </Column>
    </base-col>
  </RowSort>
</template>

<script>
import mixin from './mixin'

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

    // console.log(this.props)
  },
  components: {
    // vueDraggable,
  },
  props: ['data', 'gutter', 'col', 'row', 'height'],
  methods: {
    draggleHandler (draggle) {
      this.notDraggle = draggle
    },
    changeHandler (e) {
      console.log(e)
    }
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
