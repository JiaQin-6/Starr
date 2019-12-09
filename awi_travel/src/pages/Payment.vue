<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 10:34:42
 * @LastEditTime: 2019-12-06 17:26:31
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <div class="headTitle">
      <i @click="toPrePage" class="cubeic-arrow"></i>
      <p>{{$t('menu_payment')}}</p>
      <i @click="toIndex" class="cancal">×</i>
    </div>
    <div class="travelead">{{product_name}}</div>
    <div class="date">
      <span>
        <p class="date-title">{{$t('products_departure_data')}}</p>
        <p class="date-date">{{travelInfo.date.departureDate}}</p>
      </span>
      <span>
        <p class="date-title">{{$t('firm_order_end_date')}}</p>
        <p class="date-date">{{travelInfo.date.returnDate}}</p>
      </span>
    </div>
    <!-- 显示客户姓名和成年还是child -->
    <div class="customer">
      <span class="userName">
        <p class="days">{{travelInfo.days}}{{$t('days')}}</p>
        <!-- <p>andy</p>
        <p>Amy Kwok</p>
        <p>Adrian Cheng</p>
        <p>Wendy Lee</p>-->
        <!-- 如果保单人就要加一个保单人的而外信息 -->
        <!-- <p
          v-if="protectorShow"
        >{{protectorInfo.givename}} {{protectorInfo.surname}}</p>-->
        <p
          v-for="(item,index) in $store.state.userInfo"
          :key="index"
        >{{item.givename}} {{item.surname}}</p>
      </span>
      <span class="customer-type">
        <p>{{adultnum.adult}}{{$t('adult')}} {{adultnum.child}}{{$t('child')}}</p>
        <!-- <p>(me)</p>
        <p>(adult)</p>0000
        <p>(child)</p>
        <p>(adult)</p>-->
        <!-- {{$store.state.protectorInfo.title}} -->
        <!-- <p v-if="protectorShow">{{$t('policyholder')}}</p> -->
        <p v-for="(item,index) in $store.state.userInfo" :key="index">{{item.title}}</p>
      </span>
    </div>
    <!-- 优惠券 -->
    <div class="coupon">
      <p>优惠券</p>
      <div class="input">
        <input type="text" placeholder="兑换优惠码" />
        <span>兑换</span>
      </div>
      <div class="couponInfo">15%折扣(exprires on 2019-12-31)</div>
    </div>

    <div class="subtotalPrice">
      <span>
        <p class="subTotal">{{$t('travel_checkout_subtotal')}}</p>
        <p>
          {{$t('levy')}}
          <a target="_blank" :href="url.levy" class="collection">{{$t('moreLevy')}}</a>
        </p>
        <p>{{$t('coupon_title')}}</p>
      </span>
      <span class="price">
        <p>{{this.priceSymbol}}{{data.premium}}</p>
        <p>{{this.priceSymbol}}{{data.levy}}</p>
        <p>{{this.priceSymbol}}{{discount_price}}</p>
      </span>
    </div>

    <div class="total-item">
      <span class="total">{{$t('travel_checkout_total')}}</span>
      <span class="totalprice">{{this.priceSymbol}}{{totalPrice}}</span>
    </div>

    <!-- 单选 -->
    <div class="radio">
      <span @click="clickRadio" :class="{'checked':true, 'selected':checked}"></span>
      <p class="agreed">
        {{$t('agreed_confirm')}}
        <a
          target="_Blank"
          :href="url.declarations"
          class="declaration"
        >{{$t('we_travel_declarations')}}</a>
        {{$t('and')}}
        <a
          target="_Blank"
          :href="url.pics"
          class="declaration"
        >{{$t('FillInfo_Email_Desc2')}}.</a>
      </p>
    </div>

    <!-- <p @click="showPayMethod" class="payment-method">{{$t('confirm_payment')}}</p> -->

    <div class="button-bar">
      <button @click="checkOut" class="proceed">{{$t('Checkout')}}</button>
    </div>
    <!-- 原生 -->
    <!-- 黑色背景框 -->
    <!-- <div v-show="isShow" class="popover_back"></div> -->
    <!-- 弹出框 -->
    <!-- <div v-show="isShow" class="popover"> -->
    <!-- 标题 -->
    <!-- <p class="choose_card">Choose credit card</p> -->
    <!-- 支付银行卡图片部分 -->
    <!-- <div class="pay_img"> -->
    <!-- <cube-radio-group class="pay_radio">
          <cube-radio
            class="input_radio"
            v-for="(option, index) in options"
            :key="index"
            :option="option"
            @input="input1"
            v-model="selected"
          >
            <img class="bank_card" :src="option.src" />
          </cube-radio>
        </cube-radio-group>
    </div>-->
    <!-- 输入框部分 -->
    <!-- <div class="pay_inform">
        <div class="cardHolderName">
          <p class="cardName">Card holder name</p>
          <input v-model="userCardInfo.name" class="car_input" type="text" />
          <p class="cardName">Card number</p>
          <input v-model="userCardInfo.number" class="car_input" type="text" />
        </div>
        <div class="cardNumber">
          <div class="left">
            <div class="Expiration">
              <p class="cardName">Expiration</p>
              <input v-model="userCardInfo.expiration" class="car_input" type="text" />
            </div>
            <div class="data">
              <p class="cardName">data</p>
              <input v-model="userCardInfo.data" class="car_input" type="text" />
            </div>
          </div>
          <div class="right">
            <p class="cardName">CVV</p>
            <input v-model="userCardInfo.CVV" class="car_input" type="text" />
          </div>
        </div>
    </div>-->
    <!-- 下划线 -->
    <!-- <div class="line"></div> -->
    <!-- <div class="payButton">
        <button @click="clickCancel" class="buttonCancel">取消</button>
        <button @click="clickConfirm" class="buttonConfirm">确定</button>
    </div>-->
    <!-- </div> -->
  </div>
</template>
<script>
//导入vuex
import { mapState, mapMutations } from "vuex";
//导入图片
import img1 from "../assets/images/mastercard@3x.png";
import img2 from "../assets/images/visa@3x.png";
import img3 from "../assets/images/150px-American_Express_logo_(2018).svg@3x.png";
import img4 from "../assets/images/JCB_logo.svg@3x.png";
import img5 from "../assets/images/download@3x.png";
//RSA加密
import JSEncrypt from "jsencrypt/bin/jsencrypt";
import LoginVue from "./Login.vue";
export default {
  data() {
    return {
      count: {
        confirm: 0
      },
      data: "",
      //价格
      price: "",
      //控制阅读是否勾选
      checked: false,
      //控制支付框的显示
      isShow: false,
      //控制保单人信息的显示
      //protectorShow: false,
      //支付方式
      selected: "",
      // options: [
      //   {
      //     label: "1",
      //     value: "1",
      //     src: img1
      //   },
      //   {
      //     label: "2",
      //     value: "2",
      //     src: img2
      //   },
      //   {
      //     label: "3",
      //     value: "3",
      //     src: img3
      //   },
      //   {
      //     label: "4",
      //     value: "4",
      //     src: img4
      //   },
      //   {
      //     label: "5",
      //     value: "5",
      //     src: img5
      //   }
      // ],
      //保存银行卡信息
      // userCardInfo: {
      //   name: "",
      //   number: "",
      //   expiration: "",
      //   data: "",
      //   CVV: ""
      // },
      //聲明和收集個人資料聲明url
      url: {
        declarations: "",
        levy: "",
        pics: ""
      },
      //在vuex中取出被保人和自己的信息,保存
      userPeopleInfo: [],
      //保存重新組織后的受保人和自己的信息
      totalInfo: [],
      //保存投保人信息
      web_policy_holder: {},
      //保存随机生成的数字
      rendomNum: "",
      todayDate: "",
      //折扣价格
      discount_price: "",
      totalPrice: "",
      errorInfo: "" //请求错误提示
    };
  },
  created() {
    console.log(this.facility);
    //页面一进来就再随机生成application_id
    this.getRamNumber();
    const toast = this.$createToast({
      time: 1000,
      txt: this.$t("loading")
    });
    toast.show();
    console.log(this.$store.state);
    // if (this.$store.state.protectorInfo) {
    //   this.protectorShow = true;
    // }
    //(重要)將vuex中的用戶信息拿出來-----------------------------
    this.userPeopleInfo = this.userInfo;
    console.log(this.userPeopleInfo);
    console.log(this.userPeopleInfo.length);
    //循環vuex中的userInfo
    //定義一個空對象來保存userInfo數組中的每一個對象

    for (var i = 0; i < this.userPeopleInfo.length; i++) {
      var userObject = {};
      //res加密
      userObject.doc_firstname = this.toEncryption(
        this.userPeopleInfo[i].givename
      );
      userObject.doc_surname = this.toEncryption(
        this.userPeopleInfo[i].surname
      );
      //判斷是HKID還是passport
      if (this.userPeopleInfo[i].HKID_passport != "") {
        userObject.doc_type = "passport";
        userObject.doc_id = this.toEncryption(
          this.userPeopleInfo[i].HKID_passport
        );
      } else {
        userObject.doc_type = "idcard";
        userObject.doc_id = this.toEncryption(
          `${this.userPeopleInfo[i].HKID1}(${this.userPeopleInfo[i].HKID2})`
        );
      }
      //出生日期
      userObject.dob = this.userPeopleInfo[i].datebirth;
      //判斷關係
      switch (this.userPeopleInfo[i].title) {
        case this.$t("ship_myself"):
          userObject.relation = "2001";
          break;
        case this.$t("ship_my_spouse"):
          userObject.relation = "2002";
          break;
        case this.$t("ship_child"):
          userObject.relation = "2003";
          break;
        case this.$t("Family_friends"):
          userObject.relation = "2004";
          break;
        case this.$t("policyholder"):
          userObject.relation = "2001";
          break;
      }
      //判斷性別
      switch (this.userPeopleInfo[i].gender) {
        case "Male":
          userObject.title = "Mr.";
          break;
        case "Female":
          userObject.title = "Ms.";
          break;
        case "男":
          userObject.title = "Mr.";
          break;
        case "女":
          userObject.title = "Ms.";
          break;
      }
      this.totalInfo.push(userObject);
      console.log(this.totalInfo);
    }
    //判斷vuex中的policyholder是否存在
    console.log(this.protectorInfo);
    //定義一個空對象來保存userInfo數組中的每一個對象
    var policyObject = {};
    if (this.protectorInfo) {
      //加密
      policyObject.doc_firstname = this.toEncryption(
        this.protectorInfo.givename
      );
      policyObject.doc_surname = this.toEncryption(this.protectorInfo.surname);
      //判斷是HKID還是passport
      if (this.protectorInfo.HKID_passport != "") {
        policyObject.doc_type = "passport";
        policyObject.doc_id = this.toEncryption(
          this.protectorInfo.HKID_passport
        );
      } else {
        policyObject.doc_type = "idcard";
        policyObject.doc_id = this.toEncryption(
          `${this.protectorInfo.HKID1}(${this.protectorInfo.HKID2})`
        );
      }
      //出生日期
      policyObject.dob = this.protectorInfo.datebirth;
      //判斷性別
      switch (this.protectorInfo.gender) {
        case "Male":
          policyObject.title = "Mr.";
          break;
        case "Female":
          policyObject.title = "Ms.";
          break;
        case "男":
          policyObject.title = "Mr.";
          break;
        case "女":
          policyObject.title = "Ms.";
          break;
      }
      this.web_policy_holder = policyObject;
      console.log(this.web_policy_holder);
    } else {
      policyObject = Object.assign({}, this.totalInfo[0]);
      this.web_policy_holder.dob = policyObject.dob;
      this.web_policy_holder.doc_firstname = policyObject.doc_firstname;
      this.web_policy_holder.doc_id = policyObject.doc_id;
      this.web_policy_holder.doc_surname = policyObject.doc_surname;
      this.web_policy_holder.doc_type = policyObject.doc_type;
      this.web_policy_holder.title = policyObject.title;
      console.log(this.web_policy_holder);
    }
  },
  methods: {
    ...mapMutations(["setAPPID"]),
    //随机生成数值
    getRamNumber() {
      var result = "";
      for (var i = 0; i < 16; i++) {
        result += Math.floor(Math.random() * 16).toString(16); //获取0-15并通过toString转16进制
      }
      //默认字母小写，手动转大写
      console.log(result.toUpperCase()); //另toLowerCase()转小写
      this.rendomNum = result.toUpperCase();
      console.log("mw_" + this.rendomNum);
    },
    clickRadio() {
      this.checked = !this.checked;
    },
    //显示支付方式
    showPayMethod() {
      this.isShow = true;
    },
    //检验银行卡信息是否存在
    // hasCardInfo() {
    //   var hasInfo = true;
    //   console.log(this.selected);
    //   console.log(this.userCardInfo.name.trim());
    //   if (
    //     this.userCardInfo.name.trim() == "" ||
    //     this.userCardInfo.number.trim() == "" ||
    //     this.userCardInfo.expiration.trim() == "" ||
    //     this.userCardInfo.data.trim() == "" ||
    //     this.userCardInfo.CVV.trim() == ""
    //   ) {
    //     console.log("kong");
    //     hasInfo = false;
    //   }
    //   if (this.selected == null || this.selected == "") {
    //     console.log("空");
    //     hasInfo = false;
    //   }
    //   return hasInfo;
    // },
    //点击checkout按钮事件
    async checkOut() {
      //var hasInfo = this.hasCardInfo();
      //判断是否勾选了
      // if (this.checked != true) {
      //   this.$createToast({
      //     txt: this.$t("insurance_toast"),
      //     time: 3000,
      //     type: "txt"
      //   }).show();
      //   return false;
      // }else if(!this.data.premium){
      //    if (this.errorInfo) {
      //     //请求错误
      //     this.$createToast({
      //       txt: this.errorInfo,
      //       time: 3000,
      //       type: "txt"
      //     }).show();
      //     return false;
      //   } else {
      //     //请求超时
      //     this.$createToast({
      //       txt: this.$t('request_error_toast2'),
      //       time: 3000,
      //       type: "txt"
      //     }).show();
      //     return false;
      //   }
      // } else {
      //調用支付接口
      //转成真数组
      var totalInfo2 = JSON.parse(JSON.stringify(this.totalInfo));
      console.log(totalInfo2);
      // totalInfo2 = [
      //   {
      //     doc_firstname: "EDDDB024987EB49DF3A9187BEEF972CC",
      //     doc_surname: "D5410169F74E32BBE37A492038869795",
      //     doc_type: "idcard",
      //     doc_id: "2225D2FF9BAE2F46AC90972E32DBE802", //身份證號碼
      //     dob: "1980-05-20",
      //     relation: 2001, //2001自己;2002配偶;2003孩紙;2004朋友
      //     title: "Mr."
      //   },
      //   {
      //     doc_firstname: "934F5AAC427480D6FCC9A24D9FA12FE7",
      //     doc_surname: "92223D5649BCE5ABC41A414988B7943E",
      //     doc_type: "passport",
      //     doc_id: "F98E41B9888658B11C4298DAC80D23EB",
      //     dob: "1980-05-20",
      //     relation: 2003,
      //     title: "Mr."
      //   }
      // ];
      let paymentParams = {
        application_id: "mw_" + this.rendomNum,
        trx_id: this.session_id, //index的session-id(0123456789)
        others_insured_list: totalInfo2,
        id: this.userId, //用戶id(5aaf191c9a8cc93854f23efd)this.userId
        //insured_mem_id: this.userId, //和用戶id一樣(投保人id)
        payment_type: 12, //默認
        product_id: this.product_id, //產品id(5d15cda9971f320d262b810a)
        start_date: this.travelInfo.date.departureDate.replace(/\//g, "-"),
        end_date: this.travelInfo.date.returnDate.replace(/\//g, "-"),
        operation: this.productType, //首頁返回的product_type
        merchant_id: this.MerchantId,
        web_policy_holder: this.web_policy_holder, //投保人信息
        device_session_id: this.getCookie(this.beginProductId)
      };
      console.log(paymentParams);

      try {
        const res = await this.$http.post(
          "/wesupromo/web/checkout/purchasebytng",
          paymentParams
        );
        console.log(res);
        if ((res.status = 100)) {
          console.log(res);
          this.setAPPID("mw_" + this.rendomNum);
          window.location.href = res.data.checkout_url;
          //window.location.href=`https://dev-wesurance814.com/wesupromo/web/webview/starrPayForm?id=${this.userId}&application_id=${this.rendomNum}&language=${this.language}`
        }
      } catch (error) {
        if (error.msg) {
            //请求错误
            this.$createToast({
              txt: error.msg,
              time: 3000,
              type: "txt"
            }).show();
          } else {
            //请求超时
            this.$createToast({
              txt: this.$t("request_error_toast2"),
              time: 3000,
              type: "txt"
            }).show();
          }
      }
      // }
    },
    //cube-ui的radio组件的点击事件,获取到选中的第几个
    // input1(value) {
    //   console.log(value);
    //   this.selected = value;
    // },
    //点击支付取消按钮
    // clickCancel() {
    //   this.$createDialog({
    //     type: "confirm",
    //     zIndex: 999,
    //     icon: "cubeic-alert",
    //     //title: '我是标题',
    //     content: "是否退出?",
    //     confirmBtn: {
    //       text: "确定",
    //       active: true,
    //       disabled: false,
    //       href: "javascript:;"
    //     },
    //     cancelBtn: {
    //       text: "取消",
    //       active: false,
    //       disabled: false,
    //       href: "javascript:;"
    //     },
    //     //点击了取消按钮
    //     onConfirm: () => {
    //       this.isShow = false;
    //       // this.userCardInfo = {
    //       //   name: "",
    //       //   number: "",
    //       //   expiration: "",
    //       //   data: "",
    //       //   CVV: ""
    //       // };
    //       // this.selected = "";
    //       console.log(this.userCardInfo);
    //     }
    //   }).show();
    // },
    //点击支付确认按钮
    // clickConfirm() {
    //   //判断用户输入的信息正确
    //   if (
    //     this.userCardInfo.name == "" ||
    //     this.userCardInfo.number == "" ||
    //     this.userCardInfo.expiration == "" ||
    //     this.userCardInfo.data == "" ||
    //     this.userCardInfo.CVV == ""
    //   ) {
    //     this.$createToast({
    //       txt: "填写信息不能为空",
    //       time: 3500,
    //       zIndex: 999,
    //       type: "txt"
    //     }).show();
    //     return false;
    //   }
    //   if (this.selected == "") {
    //     this.$createToast({
    //       txt: "请选择支付方式",
    //       time: 3500,
    //       zIndex: 999,
    //       type: "txt"
    //     }).show();
    //     return false;
    //   }
    //   console.log(this.userCardInfo);
    //   this.isShow = false;
    // },
    //点击感叹号显示提示
    hint() {
      this.$createDialog({
        type: "alert",
        confirmBtn: {
          text: this.$t("confirm"),
          active: true,
          href: "javascript:;"
        },
        content: this.$t("checkout_no_levy")

        // '如有查询，请联络Starr:<a href="mailto:(852)37655566/cs.hk@starrcompanies.com">(852)37655566/cs.hk@starrcompanies.com</a>(办公时间：星期一至星期五，上午9:00至12:30；下午1:30至下午5:00)',
      }).show();
    },
    //跳转到上一页
    toPrePage() {
      this.$router.push("/confirmOrder");
    },
    //跳转到首页
    toIndex() {
      this.$router.push(
        `/index/${this.MerchantId}/${this.beginProductId}/${this.language}`
      );
    },
    //封裝一個加密方法
    toEncryption(value) {
      let encryptor = new JSEncrypt(); // 新建JSEncrypt对象
      let publicKey = this.commonKey; //把之前生成的贴进来，实际开发过程中，可以是后台传过来的
      encryptor.setPublicKey(publicKey); // 设置公钥
      let rsaPassWord = encryptor.encrypt(value); // 对需要加密的数据进行加密
      console.log(rsaPassWord); //得到加密后的数据
      return rsaPassWord;
    },
    // 函数中的参数为 要获取的cookie键的名称。
    getCookie(c_name) {
      let c_start = "";
      let c_end = "";
      console.log(document.cookie);
      if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1;
          c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) {
            c_end = document.cookie.length;
          }
          return unescape(document.cookie.substring(c_start, c_end));
          // return c_name;
        }
      }
      return "";
    },
     // 金额显示.00格式
    NumFormat(value) {
      if (!value) return "0.00";
      value = value.toFixed(2);
      var intPart = Math.trunc(value); // 获取整数部分
      var intPartFormat = intPart
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
      var floatPart = ".00"; // 预定义小数部分
      var value2Array = value.split(".");
      // =2表示数据有小数位
      if (value2Array.length === 2) {
        floatPart = value2Array[1].toString(); // 拿到小数部分
        if (floatPart.length === 1) {
          // 补0,实际上用不着
          return intPartFormat + "." + floatPart + "0";
        } else {
          return intPartFormat + "." + floatPart;
        }
      } else {
        return intPartFormat + floatPart;
      }
    }
  },
  //使用计算属性实现成员是adult还是child
  computed: {
    ...mapState([
      "travelInfo",
      "product_name",
      "product_id",
      "language",
      "plan",
      "userInfo",
      "protectorInfo",
      "userId",
      "productType",
      "session_id",
      "commonKey",
      "priceSymbol",
      "MerchantId",
      "beginProductId",
      "pricedata",
      "facility",
      "adultnum"
    ]),

    identity() {
      return function(value) {
        switch (value) {
          case this.$t("ship_myself"):
            return this.$t("AddFamilyMember_SelfFlag");
            break;
          case this.$t("ship_my_spouse"):
            return this.$t("adult");
            break;
          case this.$t("ship_child"):
            return this.$t("child");
            break;
          case this.$t("Family_friends"):
            return this.$t("adult");
            break;
        }
      };
    }
  },
  mounted() {
    //获取价格
    // 报价
    console.log(this.travelInfo);
    let others_insured_list = [];
    const { count } = this.travelInfo;
    if (count.myself) {
      for (var i = 0; i < count.myself; i++) {
        others_insured_list.push({ relation: "2001" });
      }
    }
    if (count.spouse) {
      for (var i = 0; i < count.spouse; i++) {
        others_insured_list.push({ relation: "2002" });
      }
    }
    if (count.child) {
      for (var i = 0; i < count.child; i++) {
        others_insured_list.push({ relation: "2003" });
      }
    }
    if (count.friends) {
      for (var i = 0; i < count.friends; i++) {
        others_insured_list.push({ relation: "2004" });
      }
    }

    var priceParams = {
      product_id: this.plan.product_id,
      //"03dfd96d875d43ba8ced522f3bbc0179"
      language: this.language,
      start_date: this.travelInfo.date.departureDate.replace(/\//g, "-"),
      end_date: this.travelInfo.date.returnDate.replace(/\//g, "-"),
      others_insured_list
    };
    // 日计划  月计划   年计划
    console.log(this.travelInfo.date.departureDate);
    console.log(this.travelInfo.date.returnDate);

    //调用接口获取价格
    this.$http
      .post("/wesupromo/web/awiTravelQuote", priceParams)
      .then(res => {
        this.data = res.data;
        this.discount_price = res.data.discount ? res.data.discount : 0;
        this.totalPrice =
          this.data.levy + this.data.premium - this.discount_price;
        this.data.levy = this.NumFormat(this.data.levy);
        this.data.premium = this.NumFormat(this.data.premium);
        this.discount_price = this.NumFormat(Number(this.discount_price));
        this.totalPrice = this.NumFormat(this.totalPrice);
      })
      .catch(error => {
        if (error.msg) {
          this.errorInfo = error.msg;
            //请求错误
            this.$createToast({
              txt: error.msg,
              time: 3000,
              type: "txt"
            }).show();
          } else {
            //请求超时
            this.$createToast({
              txt: this.$t("request_error_toast2"),
              time: 3000,
              type: "txt"
            }).show();
          }
      });
    //获取产品详情
    var params = {
      language: this.language,
      product_id: this.product_id,
      phone_country_code: this.areacode,
      merchant_id: this.MerchantId
    };
    this.$http
      .post("/wesupromo/web/tpc/getProductDetails", params)
      .then(res => {
        console.log(res);
        if (res.status == 100) {
          this.url.declarations = res.data.declarations_url;
          this.url.levy = res.data.levy_url;
          this.url.pics = res.data.pics_url;
          //循环遍历获取银行卡图标
          // for (var i = 0; i < this.options.length; i++) {
          //   this.options[i].value = res.data.pay_icons[i].card_scheme;
          //   this.options[i].src = res.data.pay_icons[i].card_scheme_icon_url;
          //   console.log(this.options);
          // }
        }
      })
      .catch(error => {
         if (error.msg) {
            //请求错误
            this.$createToast({
              txt: error.msg,
              time: 3000,
              type: "txt"
            }).show();
          } else {
            //请求超时
            this.$createToast({
              txt: this.$t("request_error_toast2"),
              time: 3000,
              type: "txt"
            }).show();
          }
      });
  }
};
</script>

<style lang="less" scoped>
@import "~style/mixin.less";

.page-wrap {
  padding: 34px;
  background: @background;
  padding-top: 180px;

  .imgs {
    width: 100%;
  }
  .img {
    width: 100%;
    height: 100%;
  }

  .travelead {
    text-align: center;
    color: @blue;
    font-size: 35px;
  }
  .date {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgb(209, 208, 208);
    border-bottom: 1px solid rgb(209, 208, 208);
    line-height: 60px;
    padding-left: 100px;
    padding-right: 100px;
    margin-top: 50px;
    span {
      .date-title {
        color: rgb(74, 74, 74);
        font-size: 24px;
      }
      .date-date {
        font-size: 30px;
        color: rgb(155, 155, 155);
      }
    }
  }
  .customer {
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    padding-left: 100px;
    padding-right: 100px;
    padding-bottom: 30px;
    text-align: center;
    font-size: 26px;
    .userName {
      p {
        color: rgb(74, 74, 74);
      }
    }
    .customer-type {
      color: rgb(155, 155, 155);
    }
  }
  .coupon {
    p {
      font-size: 28px;
      color: #ccc;
    }
    .input {
      font-size: 0;
      width: 100%;
      position: relative;
      margin-top: 20px;
      line-height: 80px;
      input {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 80px;
        border: 2px solid #ccc;
        box-sizing: border-box;
        font-size: 28px;
        padding-left: 20px;
        border-radius: 10px;
        &::-webkit-input-placeholder {
          color: #ccc;
        }
      }
      span {
        display: inline-block;
        position: absolute;
        right: 0;
        width: 130px;
        height: 80px;
        background-color: @blue;
        color: #fff;
        vertical-align: top;
        border-radius: 10px;
        font-size: 28px;
        text-align: center;
        cursor: pointer;
      }
    }
    .couponInfo {
      height: 80px;
      width: 100%;
      font-size: 28px;
      box-sizing: border-box;
      padding-left: 10px;
      border: 2px solid #ccc;
      line-height: 80px;
      color: @blue;
      margin-top: 20px;
      margin-bottom: 20px;
      border-radius: 10px;
    }
  }
  .subtotalPrice {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #9fbcd1;
    border-bottom: 1px solid #9fbcd1;
    padding-top: 50px;
    padding-bottom: 15px;
    span {
      .subTotal {
        color: rgb(74, 74, 74);
        font-size: 29px;
        font-family: HelveticaNeue-Medium;
        letter-spacing: 0.05px;
      }
      p {
        font-size: 24px;
        margin-top: 20px;
        color: rgb(74, 74, 74);
        .collection {
          color: @blue;
        }
      }
    }
    .price {
      text-align: right;
      p {
        color: rgb(24, 95, 146);
        font-size: 29px;
      }
    }
  }
  .total-item {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 30px;

    .total {
      color: rgb(74, 74, 74);
      font-size: 29px;
      font-family: HelveticaNeue-Medium;
      letter-spacing: 0.05px;
    }
    .totalprice {
      color: rgb(24, 95, 146);
      font-size: 29px;
    }
  }

  .radio {
    display: flex;
    padding-bottom: 150px;
    height: 60px;
    span {
      &.checked {
        display: inline-block;
        width: 50px;
        box-sizing: border-box;
        height: 50px;
        border: 1px solid #888;
        background: none;
        border-radius: 50%;
        background: url("../assets/images/TickOff@3x.png") no-repeat center
          center/44px 44px;
          cursor: pointer;
      }
      &.selected {
        border: none;
        border-radius: 0;
        background: url("../assets/images/Tick@3x.png") no-repeat center
          center/50px 50px;
      }
    }
    .agreed {
      flex: 1;
      margin-left: 40px;
      color: @gray;
      line-height: 30px;
      font-size: 27px;
      // text-align: justify;
      .declaration {
        text-decoration: underline;
        color: @blue;
      }
    }
  }
  .payment-method {
    font-size: 30px;
    color: rgb(74, 74, 74);
    font-family: HelveticaNeue-Medium;
    margin-top: 25px;
  }
  .button-bar {
    text-align: center;
    // position: fixed;
    width: 100%;
    height: 200px;
    //bottom: 0;
    //left: 50%;
    //transform: translateX(-50%);
    margin-top: 50px;
    //border-top: 3px solid rgba(211, 209, 209, 0.25);
    //background-color: rgba(250, 250, 250);
  }
  .proceed {
    background: rgb(2, 164, 71);
    width: 500px;
    height: 100px;
    margin-top: 60px;
    border-radius: 15px;
    color: white;
    font-weight: 550;
    font-size: 30px;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .headTitle {
    position: fixed;
    height: 100px;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 99;
    background-color: rgba(250, 250, 250);
    border-bottom: 2px solid rgba(211, 209, 209, 0.25);
    .cubeic-arrow {
      color: rgb(0, 122, 255);
      display: inline-block;
      transform: rotateZ(180deg);
      font-size: 32px;
      font-weight: bold;
      position: absolute;
      left: 0px;
      line-height: 100px;
      width: 50px;
      text-align: center;
      height: 100%;
      cursor: pointer;
    }
    p {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: inline-block;
      font-size: 30px;
      font-weight: 600;
      margin-top: 30px;
    }
    .cancal {
      position: absolute;
      right: 0;
      height: 100%;
      line-height: 100px;
      width: 50px;
      font-size: 52px;
      color: rgb(0, 122, 255);
      cursor: pointer;
    }
  }
}
//弹出框
.popover_back {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.4;
}
.popover {
  width: 630px;
  height: 830px;
  position: fixed;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(calc(-50% - 1px), calc(-50% - 1px));
  background-color: #fff;
  border-radius: 25px;
  padding: 30px;
  .choose_card {
    width: 100%;
    height: 35px;
    font-size: 30px;
    line-height: 35px;
    color: rgb(74, 74, 74);
    font-weight: bold;
  }
  .pay_img {
    width: 100%;
    padding: 5px;
    overflow: hidden;
    margin-bottom: 10px;
    .pay_radio {
      width: 100%;
      margin-top: 20px;
      .input_radio {
        float: left;
        width: 33.33%;
        padding: 0;
      }
      .bank_card {
        width: 100px;
        height: 100px;
        margin-left: 15px;
      }
    }
  }
  .pay_inform {
    padding: 0 15px;
    .cardHolderName {
      .cardName {
        height: 20px;
        width: 100%;
        margin: 10px 0 8px 0;
        line-height: 20px;
      }
      .car_input {
        height: 60px;
        width: 100%;
        border: 2px solid rgba(151, 151, 151, 1);
        margin: 0;
      }
    }
    .cardNumber {
      .left {
        float: left;
        .Expiration {
          display: inline-block;
          .cardName {
            height: 20px;
            width: 100%;
            margin: 10px 0 8px 0;
            line-height: 20px;
          }
          .car_input {
            height: 60px;
            width: 100px;
            border: 2px solid rgba(151, 151, 151, 1);
            margin: 0;
          }
        }
        .data {
          display: inline-block;
          .cardName {
            height: 20px;
            width: 100%;
            margin: 10px 0 8px 0;
            line-height: 20px;
          }
          .car_input {
            height: 60px;
            width: 100px;
            border: 2px solid rgba(151, 151, 151, 1);
            margin: 0;
          }
        }
      }
      .right {
        float: right;
        .cardName {
          height: 20px;
          width: 100%;
          margin: 10px 0 8px 0;
          line-height: 20px;
        }
        .car_input {
          height: 60px;
          width: 200px;
          border: 2px solid rgba(151, 151, 151, 1);
          margin: 0;
        }
      }
    }
  }
  .line {
    height: 3px;
    width: 100%;
    background-color: rgba(151, 151, 151, 1);
    position: absolute;
    bottom: 150px;
    left: 0;
  }
  .payButton {
    position: absolute;
    bottom: 33px;
    left: 0;
    width: 100%;
    height: 80px;
    .buttonCancel {
      display: inline-block;
      width: 40%;
      height: 80px;
      border: 0;
      font-size: 33px;
      color: #fff;
      background-color: rgb(74, 74, 74);
      border-radius: 15px 15px;
      margin-left: 50px;
    }
    .buttonConfirm {
      display: inline-block;
      width: 40%;
      border: 0;
      height: 80px;
      font-size: 33px;
      color: #fff;
      margin-left: 30px;
      background-color: #02a447;
      border-radius: 15px 15px;
    }
  }
}
//媒体查询
@media screen and (min-width: 1050px) {
  .page-wrap {
    width: 900px;
    margin: 0 auto;
    box-sizing: border-box;
    .headTitle {
      width: 900px;
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .button-bar {
      width: 900px;
    }
  }
}
</style>