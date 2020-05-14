<template>
  <div>
    <BaseButton :type="editorCustomBtnStyle.type" :custom="editorCustomBtnStyle.custom">{{ editorProp.label }}</BaseButton>

    <div v-for="prop in editorProp.attrProp" :key="prop.key">
      <editor-attr :data="prop.info" @valChange="valChangeHandler($event, prop)"></editor-attr>
    </div>
  </div>
</template>

<script>
import BaseButton from 'b/button'
// import BaseIcon from 'b/icon'
import EditorAttr from 'e/panels/attr'

// import { mapActions } from vuex

export default {
  data () {
    return {
      editorCustomBtnStyle: {
        type: 'editing',
        custom: {
          fontSize: '12px',
          height: '25px',
          paddingLeft: '35px',
          paddingRight: '35px'
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
    // BaseIcon,
    EditorAttr
  },
  methods: {
  }
}
</script>

<style>

</style>
