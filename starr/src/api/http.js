/*
 * @Author: your name
 * @Date: 2019-08-29 17:34:32
 * @LastEditTime: 2019-11-06 12:00:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hospitald:\project\starr\src\api\http.js
 */
import axios from 'axios'
import domain from './domainConfig';

// create an axios instance
const service = axios.create({
  baseURL: domain[process.env.ENV_CONFIG], // url = base url + request url
  timeout: 10000 // request timeout
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(res)
    if (res.status && res.status !== 100) {
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
