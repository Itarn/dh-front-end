<script>
import { createNamespace } from '../../../../utils/create'

import BaseRow from '../../../base/row'
import BaseCol from '../../../base/col'

const [, bem] = createNamespace('layout')

export default {
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

</style>
