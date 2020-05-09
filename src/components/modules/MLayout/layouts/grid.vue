<template>
  <BaseRow :gutter="gutterVal">
    <BaseCol :ratioNum="col" v-for="(val, index) in data" :key="index">
      <div
      :class="[bem('col', { [`${height}-height`]: height })]"
      :style="{ backgroundImage: `url(${val.img})` }"
      >
        <editor-cell :button="['druggle']">
        <!-- <editor-cell> -->
          <!-- <base-button slot="center" class="plr5 h25 fs12" type="editing">编辑</base-button> -->
          <!-- <div slot="columns"></div> -->
          <div slot="row">
            <editor-control>
            </editor-control>
          </div>
        </editor-cell>
      </div>
    </BaseCol>
  </BaseRow>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'grid',
  props: ['data', 'gutterVal', 'col', 'row', 'height'],
  mixins: [mixin],
  computed: {},
  methods: {},
  watch: {}
}
</script>
