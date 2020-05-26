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
    console.log(row, col, data)
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

export const MEditor = [
  {
    id: 1,
    label: '网格布局',
    propSortList: {
      layoutType: {
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
      },
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
