/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 18:36:42
 * @LastEditTime: 2019-11-09 09:41:01
 * @LastEditors: Please set LastEditors
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import * as http from '@/api/http'
import store from '@/store'
import progressive from 'progressive-image/dist/vue'; // 渐进式
import VueI18n from 'vue-i18n'
import { en, zh} from './lang'
Vue.config.devtools = true;
// 移动端适配
import 'lib-flexible/flexible.js'
import 'normalize.css/normalize.css' // 去除默认样式
//滚动插件
import VueBetterScroll from 'vue2-better-scroll'
Vue.use(VueBetterScroll)
//字体图标
import './lib/font/iconfont.css';
//引入AES加密

import Cube from 'cube-ui'
Vue.use(Cube)
Vue.use(VueI18n)

Vue.use(progressive, {
  removePreview: true,
  scale: true
})
// 解决移动端click事件300毫秒延迟方法
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body)
    },
    false
  )
}
console.log(zh)
const i18n = new VueI18n({
  // 从本地存储中取，如果没有默认为中文
  // 这样可以解决切换语言后，没记住选择的语言，刷新页面后还是默认的语言
  locale: localStorage.getItem('lang') || 'tc',
  messages: {
    'tc': zh, // 中文繁体
    'eng': en, // 英文
  }
})

Vue.prototype.$http = http.default

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
