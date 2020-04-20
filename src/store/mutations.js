import * as types from './mutations-type'

import { getVM } from '../utils/element'

import Element from '../components/editor/models/element'

const mutations = {
  /**
   * 设置是否是移动端
   */
  [types.CHECK_MOBILE] (state, mobile) {
    state.isMobile = mobile
  },
  [types.SET_ELEMENTS] (state, { type, value }) {
    const { elements } = state
    if (type === 'add') {
      const vm = getVM(value)
      const props = vm.$options.props
      const element = new Element({ name: value, props })
      elements.push(element)
    }
  }
}

export default mutations
