/*
 * @Author: your name
 * @Date: 2019-10-08 09:01:10
 * @LastEditTime: 2019-12-06 18:08:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \starrd:\project\whe\src\api\http.js
 */
import axios from 'axios'
import domain from './domainConfig';
// import {Toast} from 'cube-ui'
// let loading = null
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
