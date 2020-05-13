<template>
  <div
  :class="[bem('col', { [`${height}-height`]: height })]"
  :style="{ backgroundImage: `url(${data.img})` }"
  >
    <div :class="[bem('text-wrapper')]">
      <e-div
      :editing="status==='editing'"
      :data="data.title"
      @valChange="valChangeHandler($event, { key: `data[${index}].title` })"
      ></e-div>
      <!-- <e-div :editing="status==='editing'" :data="data.subTitle"></e-div> -->
    </div>

    <slot />
  </div>
</template>

<script>
import { createNamespace } from '@/utils'
import EditableDiv from 'e/panels/attr/EditableDiv'
import { mapState } from 'vuex'

// import { ChildrenMixin } from '@/mixins/relation'

const [, bem] = createNamespace('m', 'layout')

export default {
  components: {
    EDiv: EditableDiv
  },

  // mixins: [
  //   ChildrenMixin('MLayout')
  // ],

  props: [
    'index',
    'height',
    'data'
  ],

  inject: [
    'valChangeHandler'
  ],

  methods: {
    bem (...arg) { return bem(...arg) }
  },

  computed: {
    ...mapState(['status'])
  },

  created () {
    // const { inputHandler } = this.parent
    // console.log(this.parent)
    // this.inputHandler = inputHandler

    // console.log(this.index)
  }
}
</script>

<style scoped lang="scss">

.m-layout {

  &__col {
    width: 100%; height: 100%;
    display: flex; justify-content: center; align-items: center;
    position: relative;

    background-size: cover;

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

  &__text-wrapper {
    color: #fff;
  }

}

</style>
