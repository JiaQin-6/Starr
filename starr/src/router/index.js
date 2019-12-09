/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 11:42:06
 * @LastEditTime: 2019-11-22 15:36:50
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
//按需加载
const Index = () => import ( /* webpackChunkName: "Index" */ 'pages/Index'); // 路由推崇这种写法按需加载 中间的webpackChunkName 为分包可要可不要 官方文档有
//const IndexTwo = () => import ('pages/IndexTwo');
const Login = () => import ('pages/Login');
const TravelInfo = () => import ('pages/TravelInfo');
const Infoconfirm = () => import ('pages/Infoconfirm');
const Prompt = () => import ('pages/Prompt');
const MemberData = () => import ('pages/MemberData');
const ConfirmOrder = () => import ('pages/ConfirmOrder');
const Payment = () => import ('pages/Payment');
const Complete = () => import ('pages/Complete');
const CoverageDetails = () => import ('pages/CoverageDetails');
const Policyholder = () => import ('pages/Policyholder');
const Policies = () => import ('pages/Policies');
const Terms = () => import ('pages/Terms');
const Topayment = () => import ('pages/topayment');
const Failed = () => import ('pages/Failed');
const Coverage= () => import ('pages/Coverage');
const Declarations= () => import ('pages/Declarations');
const PersonalInformation= () => import ('pages/PersonalInformation');
//import Login from 'pages/Login';
//import TravelInfo from 'pages/TravelInfo';
//import Infoconfirm from 'pages/Infoconfirm';
//import Transtion from 'pages/Transtion';
//import Prompt from 'pages/Prompt';
//import MemberData from 'pages/MemberData';
//import ConfirmOrder from 'pages/ConfirmOrder';
//import Payment from 'pages/Payment';
//import Complete from 'pages/Complete';
//import CoverageDetails from 'pages/CoverageDetails';
//import Policyholder from 'pages/Policyholder';
//import Policies from 'pages/Policies';     
//import Terms from 'pages/Terms';     
//import Topayment from 'pages/topayment';     


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // {
    //   path: '/',
    //   name: 'IndexTwo',
    //   component: IndexTwo
    // },
    {
      path: '/index/:merchantId/:productId/:language',
      name: 'index',
      component: Index
    },
    {
      path: '/TravelInfo',
      name: 'travelInfo',
      component: TravelInfo
    },
    {
      path: '/Infoconfirm',
      name: 'infoconfirm',
      component: Infoconfirm
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
      path: '/MemberData',
      name: 'memberData',
      component: MemberData,
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
      path: '/CoverageDetails',
      name: 'coverageDetails',
      component: CoverageDetails
    },
    {
      path: '/Policyholder',
      name: 'Policyholder',
      component: Policyholder
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
      path: '/Topayment',
      name: 'Topayment',
      component: Topayment,
      meta: { needLogin: true }
    },
    {
      path: '/Failed',
      name: 'Failed',
      component: Failed,
      meta: { needLogin: true }
    },
    {
      path: '/Coverage',
      name: 'Coverage',
      component: Coverage,
      meta: { needLogin: true }
    },
    {
      path: '/Declarations',
      name: 'Declarations',
      component: Declarations,
      meta: { needLogin: true }
    },
    {
      path: '/PersonalInformation',
      name: 'PersonalInformation',
      component: PersonalInformation,
      meta: { needLogin: true }
    },
  ]
})
//定义全局导航守卫
//   router.beforeEach((to, from, next) => {
//         //如果有路由元信息就进行判断
//         console.log(to);
//     if (to.meta.needLogin) {
//       if (window.localStorage.getItem('token') != null) {
//         next()
//       } else {
//         // 给一个提示
//         // Vue.prototype.$message({
//         //   message: '请先登录！',
//         //   type: 'warning'
//         // });
//         // new Vue().$message.warning('请先登录')
//         //否则打回登录页
//         router.push('/login')
//       }
//     }else{
//     // 访问的不是index，那么就放行
//     //允许你继续访问
//     next();
//   }
// })  

export default router