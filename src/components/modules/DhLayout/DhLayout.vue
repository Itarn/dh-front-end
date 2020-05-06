<script>
import { createNamespace } from '../../../utils/create'
import { getVM } from '../../../utils/element'

import { mapState, mapActions } from 'vuex'

import BaseRow from '../../base/row'
import BaseCol from '../../base/col'
import BaseButton from '../../base/button'

import DhSection from '../DhSection'

const [createComponent, bem] = createNamespace('layout')

export default createComponent({
  title: '网格',
  props: {
    uuid: {
      type: String,
      default: ''
    },
    layoutType: {
      type: String,
      default: 'grid', // grid, magazine-1, magazine-2, magazine-3, magazine-4
      editor: {
        type: '',
        label: ''
      }
    },
    row: {
      type: [String, Number],
      default: 2,
      editor: {
        type: '',
        label: ''
      }
    },
    col: {
      type: [String, Number],
      default: 3,
      editor: {
        type: '',
        label: ''
      }
    },
    height: {
      type: String,
      default: 'min', // middle max
      editor: {
        type: 'editor-select',
        label: '高度',
        prop: [
          { label: '小', value: 'min' },
          { label: '中等', value: 'middle' },
          { label: '大', value: 'max' }
        ]
      }
    },
    gutter: {
      type: String,
      default: 'max', // min max
      editor: {
        type: 'editor-select',
        label: '间距',
        prop: [
          { label: '小', value: 'min' },
          { label: '大', value: 'max' }
        ]
      }
    },
    wideType: {
      type: String,
      default: 'content', // screen
      editor: {
        type: 'editor-select',
        label: '内容宽度',
        prop: [
          { label: '正常', value: 'content' },
          { label: '全幅', value: 'screen' }
        ]
      }
    }
  },

  computed: {
    ...mapState({
      element: function ({ elements }) {
        return elements.find(ele => ele.uuid === this.uuid)
      }
    }),
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
    ...mapActions(['elementManager']),
    updateElement (value) {
      this.elementManager({
        type: 'update',
        value: {
          ...value,
          uuid: this.uuid
        }
      })
    },
    getGridLayout () {
      return [
        <BaseRow gutter={this.gutterVal}>
          {
            Array(Number(this.row) * Number(this.col)).fill({}).map(() =>
              <BaseCol ratioNum={this.col}>
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
            <BaseCol blockNum="4">
              <BaseRow gutter={this.gutterVal}>
                {
                  Array(2).fill({}).map(() =>
                    <BaseCol blockNum="12">
                      <div class={bem('col', { [`${this.height}-height`]: this.height })}></div>
                    </BaseCol>
                  )
                }
              </BaseRow>
            </BaseCol>
            <BaseCol blockNum="8">
              <div class={bem('col')}></div>
            </BaseCol>
          </BaseRow>
        ]
      }
    }
  },

  render () {
    const { layoutType, wideType } = this
    let layout

    if (layoutType === 'grid') {
      layout = this.getGridLayout()
    } else if (layoutType.indexOf('magazine') > -1) {
      layout = this.getMagazineLayout(layoutType)
    }

    const vm = getVM(this.element.name)
    const props = vm.$options.props

    // const changeFN = (e) => {
    //   this.updateElement({ propKey: 'height', propVal: e.target.value })
    // }

    return (
      <DhSection>
        <div class={[
          { 'layout-content': wideType === 'content' }
        ]}>
          {layout}
        </div>

        <div class="editor-dot">
          <BaseButton color="#000">网格布局</BaseButton>
          {
            Object.keys(props).forEach(key => {
              const prop = props[key]
              if (prop.editor) {
                return (<span>{prop.label}</span>
                  prop.editor.prop.map(item => (
                    <select onChange={() => changeFN()}>
                      <option value={item.value} selected={item.value === this.height}>{item.label}</option>
                    </select>
                  ))
                )
              }
            })
          }
        </div>
      </DhSection>
    )
  }
})
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

.editor-dot {
  position: absolute; right: 40px; top: 40px;
}

</style>
