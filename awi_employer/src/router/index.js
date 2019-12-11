/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 11:42:06
 * @LastEditTime: 2019-12-11 10:52:47
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';
import Router from 'vue-router';
//按需加载
const Index = () => import( /* webpackChunkName: "Index" */ 'pages/Index'); // 路由推崇这种写法按需加载 中间的webpackChunkName 为分包可要可不要 官方文档有
const Login = () => import('pages/Login');
const Prompt = () => import('pages/Prompt');
const ConfirmOrder = () => import('pages/ConfirmOrder');
const Payment = () => import('pages/Payment');
const Complete = () => import('pages/Complete');
const Policies = () => import('pages/Policies');
const Terms = () => import('pages/Terms');
const Insurance = () => import('pages/Insurance');
const Employer = () => import('pages/Employer');
const EmployerDetail = () => import('pages/EmployerDetail');
const HelperDetails = () => import('pages/HelperDetails');
const Question = () => import('pages/Question');
const Summary = () => import('pages/Summary');
//import Login from 'pages/Login';
//import TravelInfo from 'pages/TravelInfo';
//import Infoconfirm from 'pages/Infoconfirm';
//import Transtion from 'pages/Transtion';
//import Prompt from 'pages/Prompt';
//import MemberData from 'pages/MemberData';
//import ConfirmOrder from 'pages/ConfirmOrder';
//import Payment from 'pages/Payment';
//import Complete from 'pages/Complete';
//import Policyholder from 'pages/Policyholder';
//import Policies from 'pages/Policies';     
//import Terms from 'pages/Terms';     
//import Topayment from 'pages/topayment';     


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index/:merchantId/:productId/:language',
      name: 'index',
      component: Index,
      // meta: { 
      //   property:'og:title',
      //   content: 'this is content', 
      //   title: 'starr',
        
      // }
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Prompt',
      name: 'prompt',
      component: Prompt,
      meta: { needLogin: true }
    },
    {
      path: '/ConfirmOrder',
      name: 'confirmOrder',
      component: ConfirmOrder,
      meta: { needLogin: true }
    },
    {
      path: '/Payment',
      name: 'payment',
      component: Payment,
      meta: { needLogin: true }
    },

    {
      path: '/Complete',
      name: 'complete',
      component: Complete,
      meta: { needLogin: true }
    },
    {
      path: '/Policies',
      name: 'Policies',
      component: Policies
    },
    {
      path: '/Terms',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/Insurance',
      name: 'Insurance',
      component: Insurance,
      meta: { needLogin: true }
    },
    {
      path: '/Employer',
      name: 'Employer',
      component: Employer,
      meta: { needLogin: true }
    },
    {
      path: '/EmployerDetail',
      name: 'EmployerDetail',
      component: EmployerDetail,
      meta: { needLogin: true }
    },
    {
      path: '/HelperDetails',
      name: 'HelperDetails',
      component: HelperDetails,
      meta: { needLogin: true }
    },
    {
      path: '/Question',
      name: 'Question',
      component: Question,
      meta: { needLogin: true }
    },
    {
      path: '/Summary',
      name: 'Summary',
      component: Summary,
      meta: { needLogin: true }
    },
  ]
})
//定义全局导航守卫
// router.beforeEach((to, from, next) => {
//   //如果有路由元信息就进行判断
//   //       console.log(to);
//   //   if (to.meta.content) {
//   //     if (window.localStorage.getItem('token') != null) {
//   //       next()
//   //     } else {
//   //       // 给一个提示
//   //       // Vue.prototype.$message({
//   //       //   message: '请先登录！',
//   //       //   type: 'warning'
//   //       // });
//   //       // new Vue().$message.warning('请先登录')
//   //       //否则打回登录页
//   //       router.push('/login')
//   //     }
//   //   }else{
//   //   // 访问的不是index，那么就放行
//   //   //允许你继续访问
//   //   next();
//   // }
//   /* 路由发生变化修改页面meta */
//   // if (to.meta.content) {
//   //   let head = document.getElementsByTagName('head');
//   //   let meta = document.createElement('meta');
//   //   meta.setAttribute("property",to.meta.property);
//   //   meta.content = to.meta.content;
//   //   head[0].appendChild(meta)
//   // }
//   // /* 路由发生变化修改页面title */
//   // if (to.meta.title) {
//   //   document.title = to.meta.title;
//   // }
//   next()
// })

export default router