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
      let { name, props = null } = value
      const vm = getVM(name)
      if (!props) props = vm.$options.props
      const element = new Element({ name, props })
      elements.push(element)
    } else if (type === 'update') {
      const { uuid, propKey, propVal } = value
      const ele = elements.find(ele => ele.uuid === uuid)

      if (!ele) console.warn('store 中未找到要编辑的组件')
      console.log(propKey, propVal)
      ele.setPropValue(propKey, propVal)
    } else if (type === 'delete') {
      const { uuid } = value
      const index = elements.findIndex(ele => ele.uuid === uuid)

      if (index !== -1) elements.splice(index, 1)
    }
  }
}

export default mutations
