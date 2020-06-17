<template>
  <MSection>
    <div :class="[{ 'layout-content': wideType === 'content' }]">
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
          <slot name="column" :val="val" :index="index" :height="height" />
        </base-col>
      </RowSort>
    </div>

    <template slot="editor">
      <slot name="sectionEditor"></slot>
    </template>
  </MSection>
</template>

<script>
import Vue from 'vue'

import { createCpnNamespace } from '@/utils'
import { mapState, mapActions } from 'vuex'

import BaseRow from 'b/row'
import BaseCol from 'b/col'
// import BaseButton from 'b/button'
import draggable from 'b/draggable'

import MSection from 'p/dh-section'

import props from './props'

const RowSort = Vue.extend({ mixins: [draggable, BaseRow] })
const createComponent = createCpnNamespace('dh', 'grid')

export default createComponent({
  data () {
    return {
      notDraggle: true
    }
  },

  components: {
    RowSort,
    BaseCol,
    // BaseButton,
    MSection
  },

  inject: {
    valChangeHandler: {
      default: () => {}
    }
  },

  props,

  computed: {
    ...mapState([
      'status'
    ]),
    draggableData: {
      get () {
        return this.data
      },
      set (val) {
        this.valChangeHandler({ val }, { key: 'data' })
      }
    }
  },

  methods: {
    ...mapActions(['elementManager']),
    draggleHandler (draggle) {
      this.notDraggle = draggle
    }
  },

  watch: {},

  created () {
    this.status === 'editing' && this.$bus.on('draggle', this.draggleHandler)
  },

  beforeDestroy () {
    this.status === 'editing' && this.$bus.$off('draggle', this.draggleHandler)
  }
})
</script>
