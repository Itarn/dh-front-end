import { cloneDeep } from '@/utils'

// default info
const row = 2
const col = 3
export const dataShape = {
  img: 'https://static001-test.geekbang.org/resource/image/50/b5/505458a8ba12dd2a2d9410e68627a2b5.jpg',
  link: 'https://www.geekbang.org',
  target: '_blank',
  title: '我是标题',
  subTitle: '我是副标题',
  type: 'default'
}

export default {
  uuid: {
    type: String,
    default: ''
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
  layoutType: {
    type: String,
    default: 'grid' // grid, magazine-1, magazine-2, magazine-3, magazine-4
  },
  row: {
    type: [String, Number],
    default: row
  },
  col: {
    type: [String, Number],
    default: col
  },
  height: {
    type: String,
    default: 'max' // middle max
  },
  gutter: {
    type: String,
    default: '30' // min max
  },
  wideType: {
    type: String,
    default: 'content' // screen
  }
}
