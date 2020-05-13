import { RelativeFn } from '@/utils/modules'
import { cloneDeep } from '@/utils'

// default info
const row = 2
const col = 3
const dataShape = {
  img: 'https://static001-test.geekbang.org/resource/image/50/b5/505458a8ba12dd2a2d9410e68627a2b5.jpg',
  link: {
    default: 'https://www.geekbang.org',
    editor: {
      type: 'e-input',
      label: '链接地址'
    }
  },
  target: {
    default: '_blank',
    editor: {
      type: 'e-checkbox',
      propArr: [
        { label: '是否在新标签页中打开' }
      ]
    }
  },
  title: '我是标题',
  subTitle: '我是副标题',
  type: 'default'
}

// relative logic
// common fn
function actedUponData (newLength, data) {
  data = cloneDeep(data)

  if (newLength > data.length) {
    data = [].concat(data, Array.from({ length: newLength - data.length }, (v, i) => {
      // dataShape.sid = data.length + i
      return cloneDeep(dataShape)
    }))
  } else if (newLength < data.length) {
    let confirm = window.confirm('您确定要减少网格数量吗？某些网格项目将被删除。')

    if (confirm) {
      data.splice(newLength, data.length - newLength)
    }
  }

  console.log('data', data)
  return data
}
// arguments name should be MLayout data
let rowColActedData = {
  key: 'data',
  cb (row, col, data) {
    return actedUponData(Number(row) * Number(col), data)
  }
}

let layoutTypeActedData = {
  key: 'data',
  cb (layoutType, data) {
    const curLayout = this.getCurLayout(layoutType)

    console.log('curLayout', curLayout)
    if (curLayout.type === 'magazine' && curLayout.needDataLength) {
      return actedUponData(curLayout.needDataLength, data)
    } else if (curLayout.type === 'grid') {
      return actedUponData(Number(this.row) * Number(this.col), data)
    } else {
      return data
    }
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
      let arr = Array.from({ length: col * row }, (v, i) => {
        return cloneDeep(dataShape)
      })
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
        { type: 'grid', label: '网格', value: 'grid', level: 1 },
        { type: 'magizine', label: '杂志', value: 'magazine-1', level: 1 },
        { type: 'magizine', label: '杂志1', value: 'magazine-1', level: 2 },
        { type: 'magizine', label: '杂志2', value: 'magazine-2', level: 2 },
        { type: 'magizine', label: '杂志3', value: 'magazine-3', level: 2 },
        { type: 'magizine', label: '杂志4', value: 'magazine-4', level: 2 }
      ],
      relative: [
        new RelativeFn(layoutTypeActedData)
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
      label: '列数',
      relative: [
        new RelativeFn(rowColActedData)
      ]
    }
  },
  height: {
    type: String,
    default: 'max', // middle max
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
    mapVal: {
      none: 0,
      min: 10,
      max: 30
    },
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
