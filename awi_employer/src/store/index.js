/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 17:24:02
 * @LastEditTime: 2019-11-23 12:19:18
 * @LastEditors: Please set LastEditors
 */
/**
 * @des: 全局状态机制作用页面传参及保存返回态
 * 
 * 
 */

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate" //引入vuex状态持久化（页面刷新状态依然保存）


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        product_info: {},
        plan: {},
        product_name: '',
        //5d15cdc2971f320d262b8266
        product_id: '',
        beginProductId:'',
        userId: '',
        language: "",
        areacode: '852',
        protectorInfo: [],//雇主信息
        userPhone: {},
        session_id: '',
        productType: '',
        MerchantId: '',
        commonKey: '',
        priceSymbol: '',
        maleData: [],
        policyDate: '',
        userAddress: {},//雇主用户地址
        helperInfo: {},//雇佣者的信息
        logo_icon: '',//logo
        ageInfo: {},
        facility: '',//设备
        category_name: '',
        productExplain: '',
        appid:'',
    },

    mutations: {
        setProduct(state, payload) {
            state.product_info = payload
        },
        setPlan(state, payload) {
            state.plan = payload
        },
        setUser(state, payload) {
            state.userId = payload
        },
        //保存区号
        setAreacode(state, payload) {
            state.areacode = payload
        },
        //保存保单人信息的方法
        setProtectorInfo(state, payload) {
            state.protectorInfo = payload
        },
        //保存用户的手机号和email
        setUserPhone(state, payload) {
            state.userPhone = payload
        },
        //保存产品id
        setProductId(state, payload) {
            state.product_id = payload
        },
        //保存语言
        setLanguage(state, payload) {
            state.language = payload
        },
        //保存产品计划
        setName(state, payload) {
            state.product_name = payload
        },
        //保存session-id
        setSession(state, payload) {
            state.session_id = payload
        },
        //保存最初产品id
        setBeginProductId(state, payload) {
            state.beginProductId = payload
        },
        //保存productType
        setProductType(state, payload) {
            state.productType = payload
        },
        //保存MerchantId
        setMerchantId(state, payload) {
            state.MerchantId = payload
        },
        //保存公鑰
        setCommonKey(state, payload) {
            state.commonKey = payload
        },
        //保存价格符合
        setPriceSymbol(state, payload) {
            state.priceSymbol = payload
        },
        //保存问题
        setMale(state, payload) {
            state.maleData = payload
        },
        //保存日期
        setPolicyDate(state, payload) {
            state.policyDate = payload
        },
        //保存地址
        setUserAddress(state, payload) {
            state.userAddress = payload
        },
        //保存雇佣者的信息
        setHelperInfo(state, payload) {
            state.helperInfo = payload
        },
        //保存详情数据中的logo
        setLogo(state, payload) {
            state.logo_icon = payload
        },
        //保存年龄限制
        setages(state, payload) {
            state.ageInfo = payload
        },
        //保存设备
        setfacility(state, payload) {
            state.facility = payload
        },
        //保存产品category_name
        setcategoryName(state, payload) {
            state.category_name = payload
        },
        //保存产品说明
        setproductExplain(state, payload) {
            state.productExplain = payload
        },
        setAPPID( state , payload) {
            state.appid = payload 
        },
        /**
         *  重置方法
         * @param { Any } state 
         * @param { Array } payload  表示要重置的字段必须为数组字符串类型 eg: ['plan', 'userId']
         */
        reset(state, payload) { //  payload
            if (Array.isArray(payload) && payload.length > 0) {
                payload.forEach(item => { state[item] = null })
            }
        }
    },

    getters: {

    },

    actions: { //此项目用不到


    },
    plugins: [createPersistedState({  //注册持久化插件
        key: 'vuex',
        storage: window.sessionStorage, //使用会话缓存机制
        reducer(val) {
            return { //需要持久化的某些全局状态
                product_info: val.product_info,
                userId: val.userId,
                product_id: val.product_id,
                language: val.language,
                plan: val.plan,
                areacode: val.areacode,
                protectorInfo: val.protectorInfo,
                userPhone: val.userPhone,
                product_name: val.product_name,
                session_id: val.session_id,
                productType: val.productType,
                MerchantId: val.MerchantId,
                commonKey: val.commonKey,
                priceSymbol: val.priceSymbol,
                maleData: val.maleData,
                policyDate: val.policyDate,
                userAddress: val.userAddress,
                helperInfo: val.helperInfo,
                logo_icon: val.logo_icon,
                ageInfo: val.ageInfo,
                facility: val.facility,
                category_name: val.category_name,
                beginProductId: val.beginProductId,
                productExplain: val.productExplain,
                appid: val.appid,
            }
        }
    })]
})