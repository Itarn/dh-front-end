<script>
import { createNamespace } from '../../../../utils/create'

import BaseRow from '../../../base/row'
import BaseCol from '../../../base/col'
import BaseButton from '../../../base/button'

import EditorCell from '../../../editor/panels/cell'
import EditorControl from '../../../editor/panels/control'
import EditorAttr from '../../../editor/panels/attr'

const [, bem] = createNamespace('m', 'layout')

export default {
  components: {
    BaseRow,
    BaseCol,
    BaseButton,
    EditorCell,
    EditorControl,
    EditorAttr
  },
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
