import defaultProps from 'p/dh-grid/props'
import { cloneDeep } from '@/utils'

// default info
const col = 2 // 列
const row = 2 // 行

export const dataShape = {
  img: 'https://static001.geekbang.org/resource/image/c7/44/c73fde602f6d716407c47ca265351944.jpg',
  link: 'https://www.geekbang.org',
  target: '_blank',
  title: '直面游戏三大难题，OPPO首次全方位解析高性能应用加速引擎架构',
  info: '随着 5G 大门的开启，视频技术也即将迎来 8K 超高清时代。软件升级，用户需求也在升级，唯独不能频繁升级的是硬件系统，那么如何通过软硬件结合充分将设备的性能最大化呢？OPPO 对此颇有心得。随着 5G 大门的开启，视频技术也即将迎来 8K 超高清时代。软件升级，用户需求也在升级，唯独不能频繁升级的是硬件系统，那么如何通过软硬件结合充分将设备的性能最大化呢？OPPO 对此颇有心得。',
  type: 'default'
}

export const props = {
  ...defaultProps,
  col: {
    ...defaultProps.col,
    default: col
  },
  row: {
    ...defaultProps.row,
    default: row
  },
  data: {
    type: Array,
    default: () => {
      let arr = Array.from({ length: col * row }, (v, i) => {
        return cloneDeep(dataShape)
      })
      return arr
    }
  },
  dataShape: {
    type: Object,
    default: () => {
      return dataShape
    }
  }
}
