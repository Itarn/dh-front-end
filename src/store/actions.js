import * as types from './mutations-type'

const actions = {
  elementManager ({ commit }, payload) {
    commit(types.SET_ELEMENTS, payload)
  }
}

export default actions
