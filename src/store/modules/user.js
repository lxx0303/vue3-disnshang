// 用户模块

export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      profile: {
        id: '',
        // 头像
        avatar: '',
        // 昵称
        nickname: '',
        // 账号
        account: '',
        // 手机号
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    // 修改用户信息，payload就是用户信息对象
    setUser (state, payload) {
      state.profile = payload
    }
  }
}
