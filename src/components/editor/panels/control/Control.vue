<template>
  <div
  :class="[bem()]"
  >
    <BaseButton
    :type="editorCustomBtnStyle.type"
    :custom="editorCustomBtnStyle.custom"
    :block="true"
    @click="btnClickHandler"
    >
      <base-icon type="arrow" :custom="{ fontSize: '12px', transform: `rotateZ(${open ? '90' : '0'}deg)` }"/>
      {{ editorProp.label }}
    </BaseButton>

    <base-vertical-toggle>
      <div
      :class="[bem('attr')]"
      v-if="open">
        <div v-for="prop in editorProp.attrProp" :key="prop.key">
          <editor-attr :data="prop.info" @valChange="valChangeHandler($event, prop)"></editor-attr>
        </div>
      </div>
    </base-vertical-toggle>
  </div>
</template>

<script>
import { createNamespace } from '@/utils/create'

import BaseButton from 'b/button'
import BaseIcon from 'b/icon'
import BaseVerticalToggle from 'b/vertical-toggle'

import EditorAttr from 'e/panels/attr'

const [, bem] = createNamespace('e', 'control')

// import { mapActions } from vuex

export default {
  data () {
    return {
      open: false,
      editorCustomBtnStyle: {
        type: 'editing',
        custom: {
          fontSize: '12px',
          height: '25px'
          // paddingLeft: '35px',
          // paddingRight: '35px'
        }
      }
    }
  },
  inject: [
    'valChangeHandler'
  ],
  props: {
    editorProp: {
      type: Object,
      default: () => (
        { label: '', attrProp: [] }
      )
    }
  },
  components: {
    BaseButton,
    BaseIcon,
    BaseVerticalToggle,
    EditorAttr
  },
  methods: {
    bem (...args) { return bem(...args) },
    btnClickHandler () {
      this.open = !this.open
    }
  },
  created () {
    // console.log(this.editorProp.label)
  }
}
</script>

<style scoped lang="scss">

.e-control {
  width: 120px;
  background-color: $gray-9;

  &__attr {
    padding: 0 10px 10px;
  }
}

</style>
