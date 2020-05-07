export default {
  uuid: {
    type: String,
    default: ''
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
    default: 2,
    editor: {
      type: 'e-input',
      label: '行数'
    }
  },
  col: {
    type: [String, Number],
    default: 3,
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
