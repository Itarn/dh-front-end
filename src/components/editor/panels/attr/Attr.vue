<template>
  <div>
    <span>{{ data.label }}</span>
    <component :is="curAttr" :data="data" @valChange="valChange"></component>
  </div>
</template>

<script>
import { Attrs } from './all'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  // provide () {
  //   return {
  //     valChange: this.valChange
  //   }
  // },
  methods: {
    valChange (data) {
      // console.log(data)
      this.$emit('valChange', data)
    }
  },
  computed: {
    curAttr () {
      let curAttr = Attrs.filter((attr) => this.data.type === attr.name)[0]

      console.log(this.data.type)
      return curAttr
      // return {
      //   name: curAttr.name,
      //   render (h) {
      //     return h(curAttr.name, {
      //       props: { data },
      //       on: {
      //         input: inputHandler
      //       }
      //     })
      //   }
      // }
    }
  }
}
</script>

<style>

</style>
