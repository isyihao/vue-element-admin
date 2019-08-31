import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    console.info('http url:' + config.url)
    console.info('http method:' + config.method)
    console.info(config.params)

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log('interceptors request:' + error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.info(res.code)
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 401 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // const token = res.data.token
      // if (token !== null && token !== undefined) {
      //   service.defaults.headers.common['Authorization'] = token
      // }
      return res
    }
  },
  error => {
    console.info('interceptors response:' + error) // for debug
    if (error.response) {
      switch (error.response.status) {
        case 400:
          MessageBox.confirm('Http请求参数异常,请联系管理员解决!错误代码:400', '系统异常', {
            confirmButtonText: '我已知晓',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return Promise.reject(error)
          })
          break
        case 401:
          MessageBox.confirm('您的登录身份已过期,请重新登录,错误代码:401', '提示', {
            confirmButtonText: '去登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
          break
        case 403:
          MessageBox.confirm('对不起,您的权限不够,无权操作!错误代码:403', '警告', {
            confirmButtonText: '我已知晓',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return Promise.reject(error)
          })
          break
      }
    }

    // 网络超时异常捕获
    if (error.message.includes('timeout')) {
      Message({
        message: '网络连接超时!' || error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
