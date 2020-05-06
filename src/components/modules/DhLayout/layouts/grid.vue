<template>
  <BaseRow :gutter="gutterVal">
    <BaseCol :ratioNum="col" v-for="val in col * row" :key="val">
      <div :class="[bem('col', { [`${height}-height`]: height })]"></div>
    </BaseCol>
  </BaseRow>
</template>

<script>
import { createBEM } from '../../../../utils/create/bem'

import BaseRow from '../../../base/row'
import BaseCol from '../../../base/col'

const bem = createBEM('dh-layout')

export default {
  name: 'grid',
  props: ['gutterVal', 'col', 'row', 'height'],
  components: {
    BaseRow,
    BaseCol
  },
  methods: {
    bem (...arg) { return bem(...arg) }
  }
}
</script>

<style scoped lang="scss">

.#{$PREFIX}-layout {

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

}

.editor-dot {
  position: absolute; right: 40px; top: 40px;
}

</style>
