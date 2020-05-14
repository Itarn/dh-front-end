<template>
  <div
  :class="[bem()]"
  >
    <span
    :class="[bem('label', { block })]"
    :style="customStyle"
    >{{ data.label }}</span>
    <component :is="curAttr" :data="data" @valChange="valChange"></component>
  </div>
</template>

<script>
import { createNamespace } from '@/utils'
import { Attrs } from './all'

const [, bem] = createNamespace('e', 'attr')

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    block: {
      type: Boolean,
      default: true
    },
    customStyle: {
      type: Object,
      default: () => {}
    }
  },
  // provide () {
  //   return {
  //     valChange: this.valChange
  //   }
  // },
  methods: {
    bem (...args) { return bem(...args) },
    valChange (data) {
      // console.log(data)
      this.$emit('valChange', data)
    }
  },
  computed: {
    curAttr () {
      let curAttr = Attrs.filter((attr) => this.data.type === attr.name)[0]

      // console.log(this.data.type)
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

<style lang="scss" scoped>

.e-attr {
  margin-top: $padding-sm;
  margin-bottom: $padding-sm;

  &__label {
    width: 100%;
    color: $gray-5;
    font-size: $font-size-sm;
    margin-bottom: 4px;

    &--block {
      display: block;
    }
  }
}

</style>
