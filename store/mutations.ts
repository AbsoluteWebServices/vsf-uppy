import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import UppyState from '../types/UppyState'

const mutations: MutationTree<UppyState> = {
  [types.SET_STATE] (state, nextState) {
    state.state = nextState
    // Vue.set(state, 'state', nextState)
  },
  [types.ADD_LISTENER] (state, listener) {
    state.callbacks.push(listener)
  },
  [types.REMOVE_LISTENER] (state, listener) {
    state.callbacks.splice(
      state.callbacks.indexOf(listener),
      1
    )
  }
}

export default mutations
