import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curRoute: '', // 页面当前路由
    ani: false, // 是否显示转场效果

  },
  mutations: {
    setCurRoute(state, payload) {
      state.curRoute = payload
    },
    setAni(state, payload) {
      state.ani = payload
    },

  },
  actions: {

  },
  modules: {

  }

})
