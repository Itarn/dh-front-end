<template>
  <div>
    <span>{{ data.label }}</span>
    <component :is="curAttr" :data="data" @input="inputHandler"></component>
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
  provide () {
    return {
      inputHandler: this.inputHandler
    }
  },
  methods: {
    inputHandler ($event) {
      console.log(this.data)
      this.$emit('input', $event)
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
