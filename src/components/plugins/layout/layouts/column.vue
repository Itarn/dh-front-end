<template>
  <a
  :class="[bem('col', { [`${height}-height`]: height })]"
  :style="{ backgroundImage: `url(${data.img})` }"
  >
    <!-- 布局样式等 -->
    <div :class="[bem('text-wrapper')]">
      <e-div
      :class="[bem('title')]"
      :editing="status==='editing'"
      :data="data.title"
      @valChange="valChangeHandler($event, { key: `data[${index}].title` })"
      ></e-div>
      <e-div
      :class="[bem('subtitle')]"
      :editing="status==='editing'"
      :data="data.subTitle"
      @valChange="valChangeHandler($event, { key: `data[${index}].subTitle` })"
      ></e-div>
    </div>

    <!-- 编辑器部分 -->
    <editor-cell :button="editor.button" v-if="status==='editing'">
    <!-- <editor-cell> -->
      <!-- <base-button slot="center" class="plr5 h25 fs12" type="editing">编辑</base-button> -->
      <!-- <div slot="columns"></div> -->
      <div slot="row">
        <div v-for="editorProp in editorPropsPanels" :key="editorProp.id">
          <EditorControl
          :editorProp="editorProp"
          >
          </EditorControl>
        </div>
      </div>
    </editor-cell>
  </a>
</template>

<script>
import { createBemNamespace, cloneDeep } from '@/utils'

// import EditableDiv from 'e/panels/attr/EditableDiv'
// import EditorCell from 'e/panels/cell'
// import EditorControl from 'e/panels/control'

import { mapState } from 'vuex'

import { DataEditor } from 'p/layout/editor'
// import { dataShape } from 'p/layout/props'

// import { ChildrenMixin } from '@/mixins/relation'

const bem = createBemNamespace('p', 'layout')

export default {
  components: {
    EDiv: () => import('e/panels/attr/EditableDiv'),
    EditorCell: () => import('e/panels/cell'),
    EditorControl: () => import('e/panels/control')
  },

  // mixins: [
  //   ChildrenMixin('MLayout')
  // ],

  props: {
    index: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
    data: {
      type: Object
    },
    editor: {
      type: Object,
      default: () => ({
        button: []
      })
    }
  },

  inject: [
    'valChangeHandler'
  ],

  methods: {
    bem (...arg) { return bem(...arg) }
  },

  computed: {
    ...mapState(['status']),
    /**
     * {
     *   key: "height",
     *   info: { label: '高度', type: 'editor-selec', val: "middle", propArr: [{ label: "小", value: "min" }], relative: [] }
     * }
     */
    editorPropsPanels () {
      let editorInfo = cloneDeep(DataEditor)

      editorInfo.forEach((item, i) => {
        let arr = []

        Object.keys(item.propSortList).forEach((key, index) => {
          let obj = {}
          let info = cloneDeep(item.propSortList[key])
          this.$set(info, 'val', this.data[key])
          this.$set(obj, 'key', key)
          this.$set(obj, 'info', info)
          this.$set(arr, index, obj)
        })
        this.$set(item, 'attrProp', arr)
      })
      return editorInfo
    }
  },

  created () {
    // const { inputHandler } = this.parent
    // console.log(this.parent)
    // this.inputHandler = inputHandler

    // console.log(this.index)
  }
}
</script>

<style scoped lang="scss">

.p-layout {

  &__col {
    width: 100%; height: 100%;
    display: flex; justify-content: center; align-items: center;
    position: relative;

    background-size: cover;

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

  &__text-wrapper {
    color: #fff;
    width: 80%; margin: 0 auto;
    text-align: center;
  }

  &__title {
    color: #fff; font-size: 25px;
    margin-bottom: 20px;
  }

  &__subtitle {
    color: #fff;
  }

}

</style>
