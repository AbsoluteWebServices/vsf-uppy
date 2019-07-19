import UppyState from '../types/UppyState'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'

const actions: ActionTree<UppyState, any> = {
  setState ({ state, commit, dispatch }, patch) {
    const prevState = Object.assign({}, state.state)
    const nextState = Object.assign({}, state.state, patch)

    commit(types.SET_STATE, nextState)

    dispatch('_publish', { prevState, nextState, patch })
  },

  subscribe ({ commit }, listener) {
    commit(types.ADD_LISTENER, listener)
    return () => commit(types.REMOVE_LISTENER, listener)
  },

  _publish ({ state }, { prevState, nextState, patch }) {
    state.callbacks.forEach((listener) => {
      listener(prevState, nextState, patch)
    })
  }
}

export default actions
