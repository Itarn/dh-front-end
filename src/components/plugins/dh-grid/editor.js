import { RelativeFn } from '@/utils/modules'
import { cloneDeep } from '@/utils'
import { dataShape } from './props'

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

  return data
}

// arguments name should be MLayout data
let rowColActedData = {
  key: 'data',
  cb (row, col, data) {
    return actedUponData(Number(row) * Number(col), data)
  }
}

export const DataEditor = [
  {
    id: 1,
    label: '背景与链接',
    propSortList: {
      // img: ['upload', 'edit', 'remove'],
      link: {
        type: 'e-input',
        label: '链接地址'
      },
      target: {
        type: 'e-checkbox',
        propArr: [
          { label: '是否在新标签页中打开' }
        ]
      }
    }
  }
]

export const MEditor = [
  {
    id: 1,
    label: '网格布局',
    propSortList: {
      row: {
        type: 'e-input',
        label: '行数',
        relative: [
          new RelativeFn(rowColActedData)
        ]
      },
      col: {
        type: 'e-input',
        label: '列数',
        relative: [
          new RelativeFn(rowColActedData)
        ]
      },
      height: {
        type: 'e-select',
        label: '高度',
        propArr: [
          { label: '小', value: 'min' },
          { label: '中等', value: 'middle' },
          { label: '大', value: 'max' }
        ]
      },
      gutter: {
        type: 'e-select',
        label: '间距',
        propArr: [
          { label: '小', value: '10' },
          { label: '大', value: '30' }
        ]
      },
      wideType: {
        type: 'e-select',
        label: '内容宽度',
        propArr: [
          { label: '正常', value: 'content' },
          { label: '全幅', value: 'screen' }
        ]
      }
    }
  }
]
