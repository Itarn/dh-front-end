<template>
  <div>
    <!-- <base-button type="editing" :custom="btnStyle">
      <BaseIcon type="arrow" :custom="{ fontSize: '12px' }" />  背景与链接
    </base-button> -->

    <slot name="button" :editorCustomBtnStyle="editorCustomBtnStyle" />

    <slot name="attr" />
  </div>
</template>

<script>
// import BaseButton from 'b/button'
// import BaseIcon from 'b/icon'
// import EditorAttr from 'e/panels/attr'

export default {
  data () {
    return {
      editorCustomBtnStyle: {
        type: 'editing',
        custom: {
          fontSize: '12px',
          height: '25px',
          paddingLeft: '15px',
          paddingRight: '15px'
        }
      }
    }
  },
  props: {},
  components: {
    // BaseButton,
    // BaseIcon,
    // EditorAttr
  }
}
</script>

<style>

</style>
