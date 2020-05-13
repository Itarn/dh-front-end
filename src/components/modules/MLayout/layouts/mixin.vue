<script>
// import Vue from 'vue'

import BaseRow from 'b/row'
import BaseCol from 'b/col'
import BaseButton from 'b/button'

import Column from './column'

import EditorCell from 'e/panels/cell'
import EditorControl from 'e/panels/control'
import EditorAttr from 'e/panels/attr'

// import { ContainerMixin, ElementMixin } from 'vue-slicksort'

// const RowSort = Vue.extend({ mixins: [BaseRow, ContainerMixin] })
// const ColSort = Vue.extend({ mixins: [BaseCol, ElementMixin] })

export default {
  components: {
    BaseRow,
    BaseCol,
    // RowSort,
    // ColSort,
    BaseButton,
    Column,
    EditorCell,
    EditorControl,
    EditorAttr
  }
}
</script>
