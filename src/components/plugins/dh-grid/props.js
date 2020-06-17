const dataShape = {
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
    default: () => []
  },
  dataShape: {
    type: Object,
    default: () => {
      return dataShape
    }
  },
  row: {
    type: [String, Number],
    default: 2
  },
  col: {
    type: [String, Number],
    default: 3
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
