import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    db: null
  },
  mutations: {
    setDb (state, db) {
      state.db = db
    }
  },
  actions: {
  },
  modules: {
  }
})
