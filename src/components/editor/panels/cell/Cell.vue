<template>
  <div
  ref="editorCell"
  :class="[bem({ isOverLay: isOverLayWrapperShow })]"
  :style="{ '--border-color': borderColor }"
  >
    <div :class="[bem('mask')]" v-if="isOverLayWrapperShow"></div>

    <div :class="[bem('btn')]">
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
          <base-button
          v-if="druggle"
          type="editing"
          :custom="btnStyle"
          @mouseenter.native="btnMouseenterHandler"
          @mouseleave.native="btnMouseleaveHandler">
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
      default: () => ([]) // close, druggle, edit, custom
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
    fatherMouseenterHandler () {
      this.btnShow = true
      // this.isOverLayWrapperShow = true
    },
    fatherMouseleaveHandler () {
      this.btnShow = false
      // this.isOverLayWrapperShow = false
    },
    btnMouseenterHandler () {
      this.isOverLayWrapperShow = true
      this.$bus.emit('draggle', !this.isOverLayWrapperShow)
    },
    btnMouseleaveHandler () {
      this.isOverLayWrapperShow = false
      this.$bus.emit('draggle', !this.isOverLayWrapperShow)
    }
  },
  mounted () {
    this.$nextTick(() => {
      const parent = this.$refs.editorCell.parentElement
      parent.addEventListener('mouseenter', this.fatherMouseenterHandler)
      parent.addEventListener('mouseleave', this.fatherMouseleaveHandler)
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

  &--isOverLay {
    left: 0; bottom: 0;
  }

  & &__mask {
    border: $border solid var(--border-color);
    position: absolute; left: -$gap; top: -$gap; right: -$gap; bottom: -$gap;
    transform: translateX(-#{$border}) translateY(-#{$border});
    background-color: rgba($white, 0.8);
    transition: all 0.2s linear;
  }

  &__btn {
    position: absolute; top: 0; right: 0; z-index: 1;
    padding: $gap;
    display: flex; justify-content: flex-end;
  }

  &__btn-wrap {
    // top: $gap + 10px; right: $gap + 10px;

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
