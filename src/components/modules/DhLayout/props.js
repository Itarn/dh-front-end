export default {
  uuid: {
    type: String,
    default: ''
  },
  layoutType: {
    type: String,
    default: 'grid', // grid, magazine-1, magazine-2, magazine-3, magazine-4
    editor: {
      type: '',
      label: ''
    }
  },
  row: {
    type: [String, Number],
    default: 2,
    editor: {
      type: '',
      label: ''
    }
  },
  col: {
    type: [String, Number],
    default: 3,
    editor: {
      type: '',
      label: ''
    }
  },
  height: {
    type: String,
    default: 'min', // middle max
    editor: {
      type: 'editor-select',
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
      type: 'editor-select',
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
      type: 'editor-select',
      label: '内容宽度',
      propArr: [
        { label: '正常', value: 'content' },
        { label: '全幅', value: 'screen' }
      ]
    }
  }
}
