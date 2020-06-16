<template>
  <MSection>
    <div :class="[{ 'layout-content': wideType === 'content' }]">
      <component :is="curLayout">
        <template #columnEditor="{ data, editor }">
          <slot name="columnEditor" :data="data" :editor="editor" />
        </template>
      </component>
    </div>

    <template slot="editor">
      <slot name="sectionEditor"></slot>
    </template>
  </MSection>
</template>

<script>
import { createCpnNamespace } from '@/utils'
import { mapActions } from 'vuex'

import BaseButton from 'b/button'
import MSection from 'p/dh-section'

import props from './props'
import { layouts } from './layouts'

import packageInfo from './package.json'

const createComponent = createCpnNamespace('dh', 'layout')

export default createComponent({
  packageInfo: {
    package: packageInfo.name,
    version: packageInfo.version
  },
  label: '网格',

  data () {
    return {}
  },

  components: {
    BaseButton,
    MSection
  },

  props,

  computed: {
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
          return h(layout,
            {
              props: { ...data },
              scopedSlots: {
                columnEditor: (props) => this.$scopedSlots.columnEditor(props)
              }
            }
          )
        }
      }
    }
  },

  methods: {
    ...mapActions(['elementManager']),
    getCurLayout (type) {
      return layouts.filter(l => l.name === type)[0]
    }
  },

  watch: {},

  created () {}
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
