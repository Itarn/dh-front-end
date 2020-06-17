import { RelativeFn } from '@/utils/modules'
import { rowColActedData } from 'p/dh-grid/common'

export const PEditor = [
  {
    id: 1,
    label: '布局',
    type: 'main',
    propSortList: {
      row: {
        type: 'e-input',
        label: '行数',
        relative: [
          new RelativeFn(rowColActedData)
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
