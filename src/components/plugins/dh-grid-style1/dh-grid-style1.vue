<template>
  <DHGrid>
    <template #column="{ val, index, height }">
      <Column
      :index="index"
      :height="height"
      :data="val"
      >

        <template slot="columnEditor">
          <slot name="columnEditor" :data="val" :editor="{ button: ['druggle'] }" />
        </template>
      </Column>
    </template>

    <template slot="editor">
      <slot name="sectionEditor" />
    </template>
  </DHGrid>
</template>

<script>
import { createCpnNamespace } from '@/utils'

import DHGrid from 'p/dh-grid'
import Column from './column'

const createComponent = createCpnNamespace('dh', 'grid-style1')

export default createComponent({
  label: '网格布局1',
  components: {
    DHGrid,
    Column
  }
})
</script>
