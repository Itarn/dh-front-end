<script>
import { createNamespace } from '../../utils/create'

import BaseRow from '../base/row'
import BaseCol from '../base/col'

const [createComponent, bem] = createNamespace('layout')

export default createComponent({
  components: {
    BaseRow,
    BaseCol
  },
  props: {
    layoutType: {
      type: String,
      default: 'grid' // magazine-1, magazine-2, magazine-3, magazine-4
    },
    row: {
      type: [String, Number],
      default: 1
    },
    col: {
      type: [String, Number],
      default: 3
    },
    height: {
      type: String,
      default: 'min' // middle max
    },
    gutter: {
      type: String,
      default: 'max' // min max
    }
  },

  computed: {
    gutterVal () {
      let map = {
        none: 0,
        min: 10,
        max: 30
      }

      return map[this.gutter]
    }
  },

  methods: {
    getGridLayout () {
      return [
        <BaseRow gutter={this.gutterVal}>
          {
            Array(Number(this.row) * Number(this.col)).fill({}).map(() =>
              <BaseCol num={this.col}>
                <div class={bem('col', { [`${this.height}-height`]: this.height })}></div>
              </BaseCol>
            )
          }
        </BaseRow>
      ]
    },
    getMagazineLayout (layoutType) {
      if (layoutType === 'magazine-1') {
        return [
          <BaseRow gutter={this.gutterVal} align="stretch">
            <BaseCol num="4">
              <BaseRow gutter={this.gutterVal}>
                {
                  Array(2).fill({}).map(() =>
                    <BaseCol num={this.col} num="12">
                      <div class={bem('col', { [`${this.height}-height`]: this.height })}></div>
                    </BaseCol>
                  )
                }
              </BaseRow>
            </BaseCol>
            <BaseCol num="4">
              <BaseCol num={this.col} num="12">
                <div class={bem('col', { [`${this.height}-height`]: this.height })}></div>
              </BaseCol>
            </BaseCol>
          </BaseRow>
        ]
      }
    }
  },

  render () {
    const { layoutType } = this
    let layout

    if (layoutType === 'grid') {
      layout = this.getGridLayout()
    } else if (layoutType.indexOf('magazine') > -1) {
      layout = this.getMagazineLayout(layoutType)
    }

    return (layout)
  }
})
</script>

<style scoped lang="scss">

.#{$prefix}-layout {

  &__col {
    width: 100%;
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
