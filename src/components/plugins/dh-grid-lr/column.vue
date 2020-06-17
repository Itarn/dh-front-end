<template>
  <a
  :class="[bem('col')]"
  :href="status !== 'editing' ? data.link : 'javascript:void(0)'"
  :target="status !== 'editing' ? data.target : '_self'"
  >
    <!-- 布局样式等 -->
    <div :class="[bem('image')]" :style="{ background: `url(${data.img}) center / cover no-repeat`  }"></div>
    <div :class="[bem('content')]">
      <e-div :class="[bem('title')]" :keyChain="keyRecorder && keyRecorder(index, 'title')">{{data.title}}</e-div>
      <e-div :class="[bem('info')]" :keyChain="keyRecorder && keyRecorder(index, 'info')">{{data.info}}</e-div>
    </div>

    <!-- 编辑器部分 -->
    <slot name="columnEditor" />
  </a>
</template>

<script>
import { createBemNamespace } from '@/utils'
import { mapState } from 'vuex'

import EditableDiv from 'e/panels/attr/EditableDiv'

const bem = createBemNamespace('p', 'grid-lr')

export default {
  components: {
    EDiv: EditableDiv
  },

  props: {
    index: {
      type: [String, Number]
    },
    data: {
      type: Object
    }
  },

  inject: {
    keyRecorder: {
      default: () => {}
    }
  },

  methods: {
    bem (...arg) { return bem(...arg) }
  },

  computed: {
    ...mapState([
      'status'
    ])
  },

  created () {}
}
</script>

<style scoped lang="scss">

.p-grid-lr {

  &__col {
    width: 100%; height: 100px;
    display: flex;
    position: relative;
  }

  &__image {
    width: 35%; height: 100%;
    border-radius: 4px;
  }
  &__content {
    padding-left: 15px;
    flex: 1;
    background-color: #fff;
  }
  &__title {
    font-size: 24px;
    color: #2a2a2a;
    line-height: 1.2;
    @include row(2);
  }
  &__info {
    margin-top: 5px;
    font-size: 14px;
    line-height: 1.5;
    color: #888;
    @include row(2);
  }

}

</style>
