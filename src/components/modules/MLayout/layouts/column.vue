<template>
  <div
  :class="[bem('col', { [`${height}-height`]: height })]"
  :style="{ backgroundImage: `url(${img})` }"
  >
    <slot />
  </div>
</template>

<script>
import { createNamespace } from '@/utils'

const [, bem] = createNamespace('m', 'layout')

export default {
  props: [
    'height',
    'img'
  ],
  methods: {
    bem (...arg) { return bem(...arg) }
  }
}
</script>

<style scoped lang="scss">

.m-layout {

  &__col {
    width: 100%; height: 100%;
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

}

</style>
