import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'
import UppyState from '../types/UppyState'

export const uppyModule: Module<UppyState, any> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
