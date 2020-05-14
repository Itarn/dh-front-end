<template>
  <div
  ref="editorCell"
  :class="[bem()]"
  :style="{ '--border-color': borderColor }"
  @mouseenter="mouseenterHandler"
  @mouseleave="mouseleaveHandler"
  >
    <div :class="[bem('mask')]" v-if="isOverLayWrapperShow"></div>

    <!-- row -->
    <transition name="dh-fade">
      <div :class="[bem('btn-wrap', ['row'])]" v-show="btnShow">
        <slot name="row" />
      </div>
    </transition>

    <!-- column -->
    <transition name="dh-fade">
      <div :class="[bem('btn-wrap', ['column'])]" v-show="btnShow">
        <base-button type="editing" :custom="btnStyle" v-if="close">
          <base-icon type="close"/>
        </base-button>
        <base-button type="editing" :custom="btnStyle" v-if="druggle" @mouseover.native="isHoverOverLay = true" @mouseout.native="isHoverOverLay = false">
          <base-icon type="druggle"/>
        </base-button>
      </div>
    </transition>

    <!-- center -->
    <transition name="dh-fade">
      <div :class="[bem('btn-wrap', ['center'])]" v-show="btnShow">
        <slot name="center" />
      </div>
    </transition>
  </div>
</template>

<script>
/**
 * 可编辑 样式提示 组件
 */
import { createNamespace } from '@/utils/create'

import BaseButton from '@/components/base/button'
import BaseIcon from '@/components/base/icon'

const [createComponent, bem] = createNamespace('e', 'cell')

export default createComponent({
  data () {
    return {
      btnShow: false,
      isOverLayWrapperShow: false,
      btnStyle: {
        fontSize: '14px',
        height: '25px',
        paddingLeft: '5px',
        paddingRight: '5px',
        cursor: 'move'
      }
      // isHoverOverLay: true
    }
  },
  components: {
    BaseButton,
    BaseIcon
  },
  props: {
    // isHoverOverLay: {
    //   type: Boolean,
    //   default: false
    // },
    button: {
      type: Array,
      default: () => { return [] } // close, druggle, edit, custom
    },
    borderColor: {
      type: String,
      default: '#969799'
    }
  },
  computed: {
    close () {
      return this.button.find(el => el === 'close')
    },
    druggle () {
      return this.button.find(el => el === 'druggle')
    }
  },
  methods: {
    bem (...args) { return bem(...args) },
    mouseenterHandler () {
      this.btnShow = true
      this.isOverLayWrapperShow = true
    },
    mouseleaveHandler () {
      this.btnShow = false
      this.isOverLayWrapperShow = false
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.dir(this.$refs.editorCell.parentElement)
      const parent = this.$refs.editorCell.parentElement
      parent.addEventListener('mouseenter', this.mouseenterHandler)
      parent.addEventListener('mouseleave', this.mouseleaveHandler)
    })
  }
})
</script>

<style lang="scss" scoped>

$gap: 10px; // 距离实际元素的安全距离
$border: 1px;

.e-cell {
  position: absolute; top: 0; right: 0;
  padding: $gap;
  border-radius: 2px;
  border: $border solid transparent;
  display: flex; justify-content: flex-end;

  &--is-hover-overlay {
    &:hover {
      border: $border solid var(--border-color);
      & .e-cell__mask {
        background-color: rgba($white, 0.8);
        transition: all 0.1s linear;
      }
    }
  }

  & &__mask {
    position: absolute; left: -$gap; top: -$gap; right: -$gap; bottom: -$gap;
    width: calc(100% + #{$border} * 2); height: calc(100% + #{$border} * 2);
    transform: translateX(-#{$border}) translateY(-#{$border});
    padding: $gap;
  }

  &__btn-wrap {
    // position: absolute; top: $gap + 10px; right: $gap + 10px;

    &--row {
      display: flex;
      margin-right: 6px;
    }

    &--column {
      display: flex; flex-direction: column;
    }

    &--center {
      position: absolute; top: 50%; left: 50%; right: auto;
      transform: translateX(-50%) translateY(-50%);
    }
  }
}
</style>
