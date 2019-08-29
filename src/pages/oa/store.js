import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        collapse: false // 菜单栏是否收缩
    },
    mutations: {
        SET_COLLAPSE(state, flag) {
            state.collapse = flag
        }
    },
    actions: {}
})
