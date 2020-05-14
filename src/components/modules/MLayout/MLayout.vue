<template>
  <MSection>
    <div :class="[{ 'layout-content': wideType === 'content' }]">
      <component :is="curLayout"></component>
    </div>

    <template slot="editor">
      <div v-for="editorProp in editorPropsPanels" :key="editorProp.id">
        <EditorControl
         :editorProp="editorProp"
         @valChange="valChangeHandler"
        >
        </EditorControl>
      </div>
    </template>
  </MSection>
</template>

<script>
// import { getVM } from '@/utils/element'
import { mapState, mapActions } from 'vuex'

import BaseButton from 'b/button'
import MSection from 'm/MSection'

import EditorControl from 'e/panels/control'
import EditorAttr from 'e/panels/attr'

import props from './props'
import { MEditor } from './editor'
import { layouts } from './layouts'

import { cloneDeep } from '@/utils'

// import { ParentMixin } from '@/mixins/relation.js'

export default {
  name: 'm-layout',
  label: '网格',

  data () {
    return {
      // curLayout: null
    }
  },

  components: {
    BaseButton,
    MSection,
    EditorControl,
    EditorAttr
  },

  // mixins: [
  //   ParentMixin('MLayout')
  // ],
  provide () {
    return {
      valChangeHandler: this.valChangeHandler,
      props
    }
  },

  props,

  computed: {
    ...mapState({
      element: function ({ elements }) {
        return elements.find(ele => ele.uuid === this.uuid)
      }
    }),
    /**
     * {
     *   key: "height",
     *   info: { label: '高度', type: 'editor-selec', val: "middle", propArr: [{ label: "小", value: "min" }], relative: [] }
     * }
     */
    editorPropsPanels () {
      let editorInfo = cloneDeep(MEditor)

      editorInfo.forEach((item, i) => {
        let arr = []

        Object.keys(item.propSortList).forEach((key, index) => {
          let obj = {}
          let info = cloneDeep(item.propSortList[key])
          this.$set(info, 'val', this[key])
          this.$set(obj, 'key', key)
          this.$set(obj, 'info', info)
          this.$set(arr, index, obj)
        })
        this.$set(item, 'attrProp', arr)
      })
      return editorInfo
    },
    curLayout () {
      const layout = this.getCurLayout(this.layoutType)
      const data = {}
      let props = layout.props
      if (!Array.isArray(props) && typeof props === 'object') props = Object.keys(props)
      props.forEach(key => { data[key] = this[key] })

      return {
        name: layout.name,
        type: layout.type,
        needDataLength: layout.needDataLength || null,
        render (h) {
          return h(layout, { props: { ...data } })
        }
      }
    }
  },

  methods: {
    ...mapActions(['elementManager']),
    getCurLayout (type) {
      return layouts.filter(l => l.name === type)[0]
    },
    updateElement (value) {
      this.elementManager({
        type: 'update',
        value: {
          ...value,
          uuid: this.uuid
        }
      })
    },
    valChangeHandler ({ val: propVal }, { key, info = null }) {
      if (info && info.relative) {
        info.relative.forEach(r => {
          const { key: rkey, cb = null } = r
          if (key && cb) {
            this.updateElement({ propKey: rkey, propVal: cb({ key, val: propVal, ctx: this }) })
          }
        })
      }

      this.updateElement({ propKey: key, propVal })
    }
  },

  watch: {}
}
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
