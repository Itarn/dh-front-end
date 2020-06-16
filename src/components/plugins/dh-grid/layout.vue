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
      <slot name="editor"></slot>
    </template>
  </MSection>
</template>

<script>
import Vue from 'vue'

import { createCpnNamespace } from '@/utils'
import { mapState, mapActions } from 'vuex'

import BaseRow from 'b/row'
import BaseCol from 'b/col'
import BaseButton from 'b/button'
import draggable from 'b/draggable'

import MSection from 'p/dh-section'

import props from './props'

import packageInfo from './package.json'

const RowSort = Vue.extend({ mixins: [draggable, BaseRow] })
const createComponent = createCpnNamespace('dh', 'layout')

export default createComponent({
  packageInfo: {
    package: packageInfo.name,
    version: packageInfo.version
  },
  label: '网格-图文左右结构',

  data () {
    return {
      notDraggle: true
    }
  },

  components: {
    RowSort,
    BaseCol,
    BaseButton,
    MSection
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

<style scoped lang="scss">

.dh-layout {

  &__col {
    width: 100%; height: 100%;
    border: 1px solid #ccc;

    &--min-height {
      height: 165px;
    }
    &--middle-height {
      height: 240px;
    }
    &--max-height {
      height: 340px;
    }
  }

  &:hover {
    border: 1px solid #fff;
    border-radius: 5px;
  }

}

</style>
