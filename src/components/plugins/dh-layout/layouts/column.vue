<template>
  <a
  :class="[bem('col', { [`${height}-height`]: height })]"
  :style="{ backgroundImage: `url(${data.img})` }"
  >
    <!-- 布局样式等 -->
    <div :class="[bem('text-wrapper')]">
      <e-div
      :class="[bem('title')]"
      :keyChain="keyRecorder(index, 'title')"
      >{{ data.title }}</e-div>
      <e-div
      :class="[bem('subtitle')]"
      :keyChain="keyRecorder(index, 'subtitle')"
      >{{ data.subTitle }}</e-div>
    </div>

    <!-- 编辑器部分 -->
    <slot name="columnEditor" />
  </a>
</template>

<script>
import { createBemNamespace } from '@/utils'

import EditableDiv from 'e/panels/attr/EditableDiv'

const bem = createBemNamespace('p', 'layout')

export default {
  components: {
    EDiv: EditableDiv
    // EditorCell: () => import('e/panels/cell')
  },

  props: {
    index: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
    data: {
      type: Object
    },
    editor: {
      type: Object,
      default: () => ({
        button: []
      })
    }
  },

  inject: [
    'keyRecorder'
  ],

  methods: {
    bem (...arg) { return bem(...arg) }
  },

  created () {
  }
}
</script>

<style scoped lang="scss">

.p-layout {

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
    width: 80%; margin: 0 auto;
    text-align: center;
  }

  &__title {
    color: #fff; font-size: 25px;
    margin-bottom: 20px;
  }

  &__subtitle {
    color: #fff;
  }

}

</style>
