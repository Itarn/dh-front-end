<script>
import { createCpnNamespace } from '@/utils'

import DHGrid from 'p/dh-grid'
import Column from './column'

import { props } from './props'

import packageInfo from './package.json'

const createComponent = createCpnNamespace('dh', 'grid-lr')

export default createComponent({
  packageInfo: {
    package: packageInfo.name,
    version: packageInfo.version
  },

  label: packageInfo.label,

  props,

  render () {
    const scopedSlots = {
      column: ({ val, index, height }) => (
        <Column
          index={index}
          height={height}
          data={val}
          scopedSlots={
            { columnEditor: () => this.$scopedSlots.columnEditor({ data: val, editor: { button: ['druggle'] } }) }
          }
        >
        </Column>
      ),
      sectionEditor: () => this.$scopedSlots.sectionEditor()
    }

    const data = {}
    let propKeys = []
    if (!Array.isArray(props) && typeof props === 'object') propKeys = Object.keys(props)
    propKeys.forEach(key => { data[key] = this[key] })

    return (
      <DHGrid
        { ...{ props: data } }
        scopedSlots={scopedSlots}
      />
    )
  }
})
</script>
