<template>
  <div class="dhm-grid-layout module-wrap" :class="[moduleWideType]">
    <div class="dhm-grid-layout-each-wrap" :class="[numberMapClassName[eachLineNumber]]" v-for="(item, index) in propData" :key="index">
      <div class="dhm-grid-layout-each">{{ index + 1 }}</div>
    </div>
  </div>
</template>

<script>
import { createNamespace } from '../../utils/create'

const [createComponent] = createNamespace('gridLayout')

export default createComponent({
  props: {
    propData: {
      type: Array,
      default: () => {
        return [0, 1, 2, 3]
      }
    },
    eachLineNumber: {
      type: Number,
      default: () => 2
    },
    moduleWideType: {
      type: String,
      default: () => 'content-wide' // content-wide, screen-wide
    }
  },
  data () {
    const numberMapClassName = {
      1: 'one-one',
      2: 'one-half',
      3: 'one-third',
      4: 'one-quarter'
    }
    return {
      numberMapClassName
    }
  }
})
</script>

<style lang="scss" scoped>

.dhm-grid-layout {
  display: flex; flex-wrap: wrap;
  margin: -10px;
}
.dhm-grid-layout-each-wrap {
  box-sizing: border-box;
  padding: 10px;
  &.one-one {
    width: 100%;
  }
  &.one-half {
    width: 50%;
  }
  &.one-third {
    width: 33.333%;
  }
  &.one-quarter {
    width: 25%;
  }

  & .dhm-grid-layout-each {
    height: 120px;
    line-height: 120px;
    border: 1px solid #ff5a05;
  }
}
</style>
