import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// 三个模块
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    cart,
    category
  },
  // 配置插件
  plugins: [
    // 默认存储在localStorage
    createPersistedState({
      // 本地存储名字
      key: 'erabbit-vue3-pc-store',
      paths: ['user', 'cart']
    })
  ]
})
