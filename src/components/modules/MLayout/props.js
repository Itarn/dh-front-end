import { RelativeFn } from '@/utils/modules'

// default info
const row = 2
const col = 3
const dataShape = {
  img: 'https://static001-test.geekbang.org/resource/image/50/b5/505458a8ba12dd2a2d9410e68627a2b5.jpg',
  link: 'https://www.geekbang.org',
  title: '我是标题',
  subTitle: '我是副标题'
}

// relative logic
// arguments name should be prop name
let rowColActedData = {
  key: 'data',
  cb (row, col, data) {
    let newLength = Number(row) * Number(col)
    if (newLength > data.length) {
      data = [].concat(data, Array.from({ length: newLength - data.length }, v => (dataShape)))
    } else if (newLength < data.length) {
      let confirm = window.confirm('您确定要减少网格数量吗？某些网格项目将被删除。')

      if (confirm) {
        data = data.splice(newLength, data.length - newLength)
      }
    }

    return data
  }
}

export default {
  uuid: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => {
      let arr = Array.from({ length: col * row }, v => (dataShape))
      return arr
    }
  },
  layoutType: {
    type: String,
    default: 'grid', // grid, magazine-1, magazine-2, magazine-3, magazine-4
    editor: {
      type: 'e-select',
      label: '排版类型',
      propArr: [
        { label: '网格', value: 'grid' },
        { label: '杂志1', value: 'magazine-1' }
      ]
    }
  },
  row: {
    type: [String, Number],
    default: row,
    editor: {
      type: 'e-input',
      label: '行数',
      relative: [
        new RelativeFn(rowColActedData)
      ]
    }
  },
  col: {
    type: [String, Number],
    default: col,
    editor: {
      type: 'e-input',
      label: '列数'
    }
  },
  height: {
    type: String,
    default: 'min', // middle max
    editor: {
      type: 'e-select',
      label: '高度',
      propArr: [
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
      type: 'e-select',
      label: '间距',
      propArr: [
        { label: '小', value: 'min' },
        { label: '大', value: 'max' }
      ]
    }
  },
  wideType: {
    type: String,
    default: 'content', // screen
    editor: {
      type: 'e-select',
      label: '内容宽度',
      propArr: [
        { label: '正常', value: 'content' },
        { label: '全幅', value: 'screen' }
      ]
    }
  }
}
