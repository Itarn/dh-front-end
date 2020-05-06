<template>
  <DhSection>
    <div :class="[{ 'layout-content': wideType === 'content' }]">
      <component :is="curLayout"></component>
    </div>

    <div class="editor-dot">
      <BaseButton color="#000">网格布局</BaseButton>
      <div v-for="prop in editorProps" :key="prop.key">
        <span>{{ prop.info.label }}</span>
        <select @change="changeFN($event, prop.key)">
          <option :value="each.value" :selected="each.value === prop.val" v-for="each in prop.info.propArr" :key="each.label">{{ each.label }}</option>
        </select>
      </div>
    </div>
  </DhSection>
</template>

<script>
import { getVM } from '../../../utils/element'
import { mapState, mapActions } from 'vuex'

import BaseButton from '../../base/button'
import DhSection from '../DhSection'

import props from './props'
import { layouts } from './layouts'

export default {
  name: 'dh-layout',
  title: '网格',
  components: {
    BaseButton,
    DhSection
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
     *   val: "middle",
     *   info: { label: '高度', type: 'editor-selec', propArr: [{ label: "小", value: "min" }] }
     * }
     */
    editorProps () {
      const vm = getVM(this.element.name)
      const props = vm.$options.props

      return Object.keys(props).filter(key => Object.prototype.hasOwnProperty.call(props[key], 'editor')).map(key => ({ key, info: props[key].editor, val: this[key] }))
    },
    curLayout () {
      const layout = layouts.filter(l => l.name === this.layoutType)[0]
      const data = {}
      let props = layout.props
      if (!Array.isArray(props) && typeof props === 'object') props = Object.keys(props)
      props.forEach(key => { data[key] = this[key] })

      return {
        name: layout.name,
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
    changeFN (e, propKey) {
      this.updateElement({ propKey, propVal: e.target.value })
    }
  }
}
</script>

<style scoped lang="scss">

.#{$PREFIX}-layout {

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

.editor-dot {
  position: absolute; right: 40px; top: 40px;
}

</style>
