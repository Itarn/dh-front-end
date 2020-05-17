import * as types from './mutations-type'

const actions = {
  elementManager ({ commit }, payload) {
    commit(types.SET_ELEMENTS, payload)
  },
  updateStatus ({ commit }, payload) {
    commit(types.SET_STATUS, payload)
  }
}

export default actions
