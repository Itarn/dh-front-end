<script>
import icons from './icons'

import { createNamespace } from '@/utils/create'

const [createComponents, bem] = createNamespace('base', 'icon')

export default createComponents({
  props: {
    type: {
      type: String,
      default: ''
    },
    custom: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  render () {
    const { type, custom } = this
    return (<span class={['iconfont', bem()]} style={custom} domPropsInnerHTML={icons[type]}></span>)
  }
})
</script>

<style lang="scss" scoped>

.base-icon {
  font-size: 14px;
  color: $white;
}
</style>
