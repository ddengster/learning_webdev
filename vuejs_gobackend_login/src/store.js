import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    status: {
      loggedIn: false,
      loggingIn: false
    },
    secureUrl: 'http://localhost:7500'
  },
  mutations: {
    loginRequest (state, user) {
      state.status = { loggingIn: true }
      state.user = user
    }
  },
  actions: {
    login ({ dispatch, commit }, { username, password }) {
      console.log(username, password)
    }
  }/*,
  getters: {
    secureUrl: state => state.secureUrl
  }*/

})

export default store
