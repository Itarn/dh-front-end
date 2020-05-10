<template>
  <MSection>
    <div :class="[{ 'layout-content': wideType === 'content' }]">
      <component :is="curLayout"></component>
    </div>

    <template slot="editor">
      <div v-for="editorProp in editorPropsPanels" :key="editorProp.id">
        <EditorControl>
          <template v-slot:button="{ editorCustomBtnStyle }">
            <BaseButton :type="editorCustomBtnStyle.type" :custom="editorCustomBtnStyle.custom">{{ editorProp.label }}</BaseButton>
          </template>

          <template slot="attr">
            <div v-for="prop in editorProp.attrProp" :key="prop.key">
              <editor-attr :data="prop.info" @input="inputHandler($event, { key: prop.key, relative: prop.info.relative })"></editor-attr>
            </div>
          </template>
        </EditorControl>
      </div>
    </template>
  </MSection>
</template>

<script>
import { getVM } from '@/utils/element'
import { mapState, mapActions } from 'vuex'

import BaseButton from 'b/button'
import MSection from 'm/MSection'

import EditorControl from 'e/panels/control'
import EditorAttr from 'e/panels/attr'

import props from './props'
import { MEditor } from './editor'
import { layouts } from './layouts'

export default {
  name: 'm-layout',
  label: '网格',

  components: {
    BaseButton,
    MSection,
    EditorControl,
    EditorAttr
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
     *   info: { label: '高度', type: 'editor-selec', val: "middle", propArr: [{ label: "小", value: "min" }] }
     * }
     */
    editorPropsPanels () {
      const vm = getVM(this.element.name)
      const props = vm.$options.props

      // return Object.keys(props)
      //   .filter(key => Object.prototype.hasOwnProperty.call(props[key], 'editor'))
      //   .map(key => ({ key, val: this[key], info: props[key].editor }))

      MEditor.forEach(item => {
        this.$set(item, 'attrProp', item.propSortList.map(key => ({ key, info: { ...props[key].editor, val: this[key] } })))
      })

      return MEditor
    },
    curLayout () {
      const layout = layouts.filter(l => l.name === this.layoutType)[0]
      const data = {}
      let props = layout.props
      if (!Array.isArray(props) && typeof props === 'object') props = Object.keys(props)
      props.forEach(key => { data[key] = this[key] })

      return {
        name: layout.name,
        needDataLength: layout.needDataLength || null,
        render (h) {
          return h(layout, { props: { ...data } })
        }
      }
    },
    gutterVal () {
      let map = {
        none: 0,
        min: 10,
        max: 30
      }
      return map[this.gutter]
    }
  },

  methods: {
    ...mapActions(['elementManager']),
    updateElement (value) {
      this.elementManager({
        type: 'update',
        value: {
          ...value,
          uuid: this.uuid
        }
      })
    },
    inputHandler (e, { key, relative = null }) {
      const propVal = e.target.value
      this.updateElement({ propKey: key, propVal })

      console.log(e, key, relative)
      if (relative) {
        this.$nextTick(() => {
          relative.forEach(r => {
            const { key: rkey, cb = null } = r
            if (key && cb) this.updateElement({ propKey: rkey, propVal: cb({ key, val: propVal, ctx: this }) })
          })
        })
      }
    }
  }
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

}

</style>
