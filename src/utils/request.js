import axios from 'axios'
import store from '@/store'
import router from '@/router'

export const baseURL = 'http://pcapi-xiaotuxian-front.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 拦截业务逻辑
  // 进行请求配置的修改
  // 如果本地有token就在头部携带

  // 1、获取用户信息对象
  const { profile } = store.state.user
  // 2、判断是否有token
  if (profile.token) {
    // 3、设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 添加响应拦截器
// res=>res.data  取出data数据，将来调用接口的时候直接拿到的就是后台的数据
instance.interceptors.response.use(res => res.data, err => {
  // 401  状态码，进入该函数
  if (err.response && err.response.status === 401) {
    // 1、清空本地无效用户信息
    // 2、跳转到登录页码
    // 3、跳转需要传参(当前路由地址)给登录页码
    store.commit('user/setUser', {})
    // 当前路由地址
    router.push('./login?redirectUrl=' + '当前路由地址')
  }
  return Promise.reject(err)
})

// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求：请求地址，请求方式，提交的数据
  return instance({
    url,
    method,
    // 1、如果是get请求，需要用params来传递submitData
    // 2、如果不是get请求，需要用data来传递submitData

    // []设置一个动态的key，写js表达式，js表达式的执行结果当作key
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
